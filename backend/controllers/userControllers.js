import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

//@desc     Auth user and return token
//@route    POST /api/users/login
//@access   Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.correctPassword(password)) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      isGuest: user.isGuest
    });
  } else {
    //Returns 401 when incorrect credentials entered
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Returns a 400 error if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error('User already exists');
  }

  //Creates a new user and pushes to database, returning new user and token
  const newUser = await User.create({
    name,
    email,
    password
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id)
    });
  }
  //If user creation fails, returns a 400 error
  else {
    res.status(400);
    throw new Error('Bad request');
  }
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isGuest: user.isGuest
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc     Get user profiles
//@route    GET /api/users
//@access   Private/Admin
export const getUserProfiles = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No users in DB');
  }
});

//@desc     DELETE user
//@route    DELETE /api/users/:id
//@access   Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.remove();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: `User with ID ${req.params.id} not found` });
  }
});

//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

//@desc     Update user profile by id
//@route    PUT /api/users/:id
//@access   Private/Admin
export const updateUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.isAdmin) {
      user.isAdmin = req.body.isAdmin;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
