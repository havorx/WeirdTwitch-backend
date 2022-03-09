import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log('Database connect successfully!');
  } catch (error) {
    console.log('Database connect failure!');
  }
}
