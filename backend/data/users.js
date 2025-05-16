import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true
  },

  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('12345', 10)
  },

  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('12345', 10)
  },

  {
    name: 'Guest',
    email: 'N/A',
    password: bcrypt.hashSync('guest123', 10),
    isGuest: true
  }
];

export default users;
