import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shipping,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    let order;

    if (req.body.email) {
      order = new Order({
        user: req.user._id,
        orderItems,
        shipping,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        email: req.body.email
      });
    } else {
      order = new Order({
        user: req.user._id,
        orderItems,
        shipping,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice
      });
    }

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    GET order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email isGuest'
    );

    res.json(order);
  } catch (error) {
    res.status(404);
    throw new Error(`Order with ID ${req.params.id} not found`);
  }
});

// @desc    Update order to paid
// @route   POST /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const isAuthorized = req.body.m_payment_id == `${order._id}//sEcur_e`;
    const isComplete = req.body.payment_status === 'COMPLETE';

    if (isAuthorized && isComplete) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.updatedAt = Date.now();
      order.status = req.body.payment_status;
      order.save();
    } else {
      res.status(401);
      throw new Error('Unauthorized - invalid credentials');
    }
  } catch (error) {
    res.status(400);
    throw new Error(`Bad request`);
  }
});

// @desc    GET orders by user id
// @route   GET /api/orders/myOrders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1
    });

    res.json(orders);
  } catch (error) {
    res.status(404);
    throw new Error(`No orders by this user`);
  }
});

// @desc    GET ALL orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');

    res.json(orders);
  } catch (error) {}
});

// @desc    Update order to delivered
// @route   POST /api/orders/delivered
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.updatedAt = Date.now();
    order.save();
    res.end();
  } catch (error) {
    res.status(400);
    throw new Error(`Bad request`);
  }
});
