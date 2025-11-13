import jwt from 'jsonwebtoken';
import { userModel } from '../models/models.js'; // adjust path if needed

 const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    
    if (!token) {
      return res.status(401).json({
        status: false,
        data: '',
        message: 'Access denied. Please login',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT);

    // Find user in DB
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        status: false,
        data: '',
        message: 'Invalid token. User not found.',
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        status: false,
        data: '',
        message: 'Access denied. Admins only.',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    return res.status(500).json({
      status: false,
      data: '',
      message: 'Internal server error.',
    });
  }
};

export  default adminMiddleware