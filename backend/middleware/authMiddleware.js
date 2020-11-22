import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    //Token is saved as string after Bearer
    token = req.headers.authorization.split('Bearer ')[1];
    try {
      //Decodes and send user to req.user
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      req.user = decoded;
    } catch (error) {
      //Returns error
      console.error(error.message);
      res.status(401).json({ error: 'Not authorized - invalid token' });
    }
    next();
  } else {
    //Returns error
    res.status(401).json({ error: 'Not authorized - no token' });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: 'Not Authorized - not an admin' });
    }
  } catch (error) {
    throw new Error(error);
  }
};
