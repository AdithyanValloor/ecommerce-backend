import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import dotenv from 'dotenv'

const router = express.Router();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "VirtuMart123";

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const exist = await User.findOne({email})
    if(exist) return res.status(404).json({error:"User already exists. Please login."})
    const userNameExist =  await User.findOne({username})
    if(userNameExist) return res.status(404).json({error:"This username is taken. Use another name."})
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });

    // res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, username });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
