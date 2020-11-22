import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const fetchSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    res.status(404);
    throw new Error(`product with id ${req.params.id} not found`);
  }
});

//@desc     DELETE product
//@route    DELETE /api/product/:id
//@access   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    res.json({ success: true });
  } else {
    res
      .status(404)
      .json({ error: `Product with ID ${req.params.id} not found` });
  }
});

//@desc     Updates product by id
//@route    PUT /api/product/:id
//@access   Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.email;
    product.description = req.body.description || product.description;
    product.countInStock = req.body.countInStock || product.countInStock;

    if (req.body.image) {
      product.image = req.body.image;
    }

    const updatedProduct = await product.save();

    return res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.email,
      description: updatedProduct.description,
      image: updatedProduct.image,
      countInStock: product.countInStock
    });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

//@desc     Create a product
//@route    POST /api/product/create
//@access   Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = {};
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.countInStock = req.body.countInStock;
  product.image = req.body.image;
  product.category = 'treat';
  product.brand = 'Henya';
  product.user = req.user._id;

  const newProduct = await Product.create(product);

  return res.json(newProduct);
});

//@desc     Delete a product by id
//@route    DELETE /api/product/:id
//@access   Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.json(error);
  }
});
