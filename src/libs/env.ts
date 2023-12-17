import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
export const DB_KEY: string = process.env.DATABASE || ''; // Retrieve the environment variable
