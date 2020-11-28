import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        image: {
          type: Array,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        }
      }
    ],
    shipping: {
      address: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: {
        type: String
      },
      status: {
        type: String
      },
      updateTime: {
        type: String
      },
      email: {
        type: String
      }
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    status: {
      type: String
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('order', orderSchema);

export default Order;
