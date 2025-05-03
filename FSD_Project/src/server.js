import express from 'express';
import mongoose from 'mongoose'; // Import mongoose as a default import
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser as a default import
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken as a default import

const { connect, connection, Schema, model } = mongoose;
const { json } = bodyParser; // Destructure the json method from body-parser
const { sign } = jwt; // Destructure the sign method from jsonwebtoken

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
connect('mongodb://127.0.0.1:27017/planova', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema and Model
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model('User', userSchema);

// Routes

// Sign In Route
app.post('/api/signin', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    const token = sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});