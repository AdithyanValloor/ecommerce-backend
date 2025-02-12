import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './src/routes/auth.js'
import connectDB from './src/config/db.js';

connectDB()

const app = express();
app.use(express.json());
app.use(cors({
    origin:'https://chimerical-travesseiro-acfb77.netlify.app'
}));

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.status(200).send('Backend Server'))

app.use("/api/auth", authRoutes);

console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
