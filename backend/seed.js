// seed.js (ESM version)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './model/user.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error(err));

const users = [
  'Rahul',
  'Kamal',
  'Sanak',
  'Priya',
  'Anita',
  'Vikram',
  'Riya',
  'Amit',
  'Sneha',
  'Kiran'
];

async function seedUsers() {
  try {
    await User.deleteMany(); // Optional: clear existing users
    const createdUsers = await User.insertMany(users.map(name => ({ name })));
    console.log("Users seeded:", createdUsers);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedUsers();
