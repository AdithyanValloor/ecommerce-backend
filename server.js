import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';

dotenv.config()
connectDB()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.status(200).send('Backend Server'))

console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
