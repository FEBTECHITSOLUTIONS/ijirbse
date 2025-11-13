import jwt from 'jsonwebtoken';
import { userModel } from '../models/models.js';
import { apiResponse } from '../utils/apiResponse.js'; // adjust path if needed

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
      console.log('token',token);
      
    if (!token) {
      return res
        .status(401)
        .json(new apiResponse('', 'Unauthorized access'));
    }

    // Verify token
    const verifyToken = jwt.verify(token, process.env.JWT);
    const { _id } = verifyToken;

    // Fetch user without password
    const user = await userModel.findById(_id).select('-password');
    if (!user) {
      return res
        .status(401)
        .json(new apiResponse('', 'User not found.'));
    }

    req.user = user; // attach user to request
    next(); // allow access
  } catch (error) {
    console.error('authMiddleware Error:', error);
    return res
      .status(401)
      .json( new apiResponse('', 'Invalid token or session expired.'));
  }
};

export default authMiddleware;
