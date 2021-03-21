import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { authRoute } from './routes';
import auth from './middleware/auth';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ extented: false }));

app.get('/users', auth, (req, res) => {
  res.json({ user: req.user });
});

authRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
