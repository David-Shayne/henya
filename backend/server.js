import dotenv from 'dotenv';
import express from 'express';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import uploadRoutes from './routes/uploadRoutes.js';
import connectDB from './config/db.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import path from 'path';
import 'colors';

// Settings setup
dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

//Static Routing
app.use(express.static(path.join(__dirname, '/frontend/build')));

// Routing APIs
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorMiddleware);

// Handling incorrect paths
app.use((req, res, next) => {
  res.status(404);
  res.json({ error: `${req.originalUrl} not found` });
  next();
});

//Frontend loader
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});
app.get('/#/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});
connectDB();

app.listen(
  PORT,
  console.log(
    `\nRunning in ${process.env.NODE_ENV} on port ${PORT}...`.yellow.bold
  )
);
