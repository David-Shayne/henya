import express from 'express';
import {
  fetchProducts,
  fetchSingleProduct,
  deleteProduct,
  updateProductById,
  createProduct,
  deleteProductById
} from '../controllers/productControllers.js';
import { protect, adminAuth } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(fetchProducts);

router
  .route('/:id')
  .get(fetchSingleProduct)
  .delete(protect, adminAuth, deleteProductById)
  .put(protect, adminAuth, updateProductById)
  .post(protect, adminAuth, createProduct);

export default router;
