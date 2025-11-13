import { userModel } from "../models/models.js";
import bcrypt from 'bcryptjs'
import { generateAccessToken } from "../utils/generateJWToken.js";
import sendEmail from "./emailServices.js";
import { apiResponse } from "../utils/apiResponse.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, subRole, address, backGround } = req.body;

    // 🔍 Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new apiResponse("", "Name, email, and password are required."));
    }

    // 🔍 Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json(
          new apiResponse(
            "",
            `Editor already exists with this email: ${email}`
          )
        );
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🧱 Create new user document
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "editor",
      subRole: subRole || "",
      address: address || "",
      backGround: backGround || "",
    });

    // 💾 Save to DB
    const savedUser = await newUser.save();

    // 🧹 Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res
      .status(201)
      .json(new apiResponse(userResponse, "Editor added successfully."));
  } catch (error) {
    console.error("Error in register:", error);
    return res
      .status(500)
      .json(new apiResponse("", "Internal server error. Please try again."));
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(new apiResponse("", `all fields are required.`));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(
          new apiResponse(
            "",
            `user doesn't exists with this email : ${email}`
          )
        );
    }
    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res
        .status(401)
        .json(new apiResponse( "", `please enter valid password.`));
    }

    const { accessToken, options } = await generateAccessToken(user);
    const userData = {
      email,
      name: user.name,
      role: user.role,
    };
    
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new apiResponse( userData, `successful login`));
  } catch (error) {
    console.error("error in login : ", error);
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(new apiResponse("", "Email is required"));
    }

    const genOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes later

    // Update OTP and expiry in DB
    await userModel.findOneAndUpdate(
      { email },
      { $set: { otp: genOTP, otpExpiresAt } },
      { new: true }
    );

    // Send email
    await sendEmail({
      to: email,
      subject: `${genOTP} is your OTP to reset your password`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>OTP To Reset Password</title>
        </head>
        <body>
            <p><b>${genOTP}</b> is your OTP to reset your password. It is valid for 5 minutes.</p>
            <p>If you didn’t request a password reset, you can ignore this message.</p>
        </body>
        </html>
      `,
    });

    return res
      .status(200)
      .json(new apiResponse( "", "OTP sent successfully"));
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return res
      .status(500)
      .json(new apiResponse( "", "Error sending OTP"));
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res
        .status(400)
        .json(new apiResponse('', 'All fields are required.'));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(new apiResponse( '', 'User not found.'));
    }

    // Check expiry
    if (!user.otpExpiresAt || Date.now() > user.otpExpiresAt) {
      return res
        .status(400)
        .json(new apiResponse('', 'OTP expired.'));
    }

    // Check OTP
    if (parseInt(otp) !== user.otp) {
      return res
        .status(400)
        .json(new apiResponse('', 'Invalid OTP.'));
    }


    const hashedPassword = await bcrypt.hash(password, 10);

  
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;

   
    await user.save();

    return res
      .status(200)
      .json(new apiResponse('', 'Password reset successfully.'));
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    return res
      .status(500)
      .json(new apiResponse ('', 'Internal server error.'));
  }
};

