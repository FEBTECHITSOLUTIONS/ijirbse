import { UploadedFile, userModel } from '../models/models.js';
import { apiResponse } from '../utils/apiResponse.js';
import bcrypt from 'bcryptjs';

// Update user info
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      role,
      subRole,
      address,
      backGround,
    } = req.body;

    // Build the update object dynamically (ignore undefined or empty)
    const updateData = {};

    if (name?.trim()) updateData.name = name.trim();
    if (email?.trim()) updateData.email = email.trim().toLowerCase();
    if (role?.trim()) updateData.role = role;
    if (subRole?.trim()) updateData.subRole = subRole.trim();
    if (address?.trim()) updateData.address = address.trim();
    if (backGround?.trim()) updateData.backGround = backGround.trim();

    if (password?.trim()) {
      const hashedPassword = await bcrypt.hash(password.trim(), 12);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password -otp -otpExpiresAt");

    if (!updatedUser) {
      return res.status(404).json(
        new apiResponse("", "User not found.")
      );
    }

    return res
      .status(200)
      .json(
        new apiResponse(updatedUser, "User updated successfully.")
      );
  } catch (error) {
    console.error("updateUser Error:", error);
    return res
      .status(500)
      .json(
        new apiResponse("", "Internal server error while updating user.")
      );
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json(new apiResponse('', 'User not found.'));
    }

    return res.status(200).json(new apiResponse('', 'User deleted successfully.'));
  } catch (error) {
    console.error('deleteUser Error:', error);
    return res.status(500).json(new apiResponse('', 'Internal server error.'));
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password');
    return res.status(200).json(new apiResponse(users, 'Users fetched successfully.'));
  } catch (error) {
    console.error('getAllUsers Error:', error);
    return res.status(500).json(new apiResponse('', 'Internal server error.'));
  }
};


export const getAllUploadedArticles = async (req, res) => {
  try {
    const articles = await UploadedFile.find().sort({ createdAt: -1 });
    return res.status(200).json(new apiResponse(articles, "Uploaded articles fetched successfully."));
  } catch (error) {
    console.error("getAllUploadedArticles Error:", error);
    return res.status(500).json(new apiResponse("", "Internal server error."));
  }
};