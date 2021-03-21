import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import { authRoute, contractRoute } from './routes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ extented: false }));

authRoute(app);
contractRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
