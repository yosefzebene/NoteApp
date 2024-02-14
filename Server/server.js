import 'dotenv/config';
import express from "express";
import cors from 'cors';
import connectDB from "./db/conn.js";
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

// Connect to DB
connectDB().then(() => console.log('Database successfully connected!'));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
