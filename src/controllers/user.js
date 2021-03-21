import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/User';

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) res.status(500).json({ message: `Server error` });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (!user) {
      const newUser = new User(req.body);
      newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
      newUser.save((err, user) => {
        if (err) res.status(500).json({ message: 'Server error' });
        else {
          user.hashPassword = undefined;
          return res.json(user);
        }
      });
    }
  });
};

export const login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) res.status(500).json({ message: 'Server error' });
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. No user found' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res
          .status(401)
          .json({ message: 'Authentication failed. Wrong password' });
      } else {
        return res.json({
          token: jwt.sign(
            { username: user.username, email: user.email, _id: user.id },
            process.env.JWT_SECRET
          ),
        });
      }
    }
  });
};
