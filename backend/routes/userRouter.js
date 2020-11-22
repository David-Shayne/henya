import express from 'express';
import {
  authUser,
  getUserProfile,
  getUserProfiles,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUserProfileById
} from '../controllers/userControllers.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/login').post(authUser);

router.route('/').post(registerUser).get(protect, adminAuth, getUserProfiles);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, adminAuth, deleteUser)
  .get(protect, adminAuth, getUserById)
  .put(protect, adminAuth, updateUserProfileById);

export default router;
