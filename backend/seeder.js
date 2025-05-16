import dotenv from 'dotenv';
import 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
  }
};

const destroyData = async (type) => {
  if (type === 'all') {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();

      console.log('Data Destroyed!'.red.inverse);
      process.exit();
    } catch (error) {
      console.log(`Error: ${error.message}`.red.bold);
    }
  } else {
    try {
      await Order.deleteMany();

      console.log('Data Destroyed!'.red.inverse);
      process.exit();
    } catch (error) {
      console.log(`Error: ${error.message}`.red.bold);
    }
  }
};

if (process.argv[2] === '-d') {
  destroyData('all');
}

if (process.argv[2] === '-i') {
  importData();
}
