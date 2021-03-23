import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoute, contractRoute } from './routes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

authRoute(app);
contractRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
