import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

//Compares hashed password with typed in text and returns boolean
userSchema.methods.correctPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Hashes passwords when saving new user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    next();
  }
});

//Always saves user email as lower case
userSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    this.email = String(this.email).toLowerCase();
  } else {
    next();
  }
});

const User = mongoose.model('user', userSchema);

export default User;
