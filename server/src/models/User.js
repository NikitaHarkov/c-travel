import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcryptjs.compare(password, hashPassword);
};
