import express from "express";
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/auth.js'
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors(
    {
    origin:['http://localhost:5174', 'https://chimerical-travesseiro-acfb77.netlify.app']
    }
));

app.use(express.json())
app.use("/products", productRoutes)
app.use("/api/auth", authRoutes)

export default app
