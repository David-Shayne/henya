import express from 'express';
import {
  addOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../controllers/orderControllers.js';
import { adminAuth, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, addOrder).get(protect, adminAuth, getAllOrders);
router.route('/myOrders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrder);

router.route('/:id/pay').post(updateOrderToPaid);

router.route('/:id/delivered').post(protect, adminAuth, updateOrderToDelivered);
export default router;
