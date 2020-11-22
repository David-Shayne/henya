import jwt from 'jsonwebtoken';
import 'dotenv';

export default function generateToken(_id) {
  return (
    'Bearer ' +
    jwt.sign({ _id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '30d'
    })
  );
}
