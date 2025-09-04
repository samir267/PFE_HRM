/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';

export interface Seeder {
  name: string;
  dependencies: string[];
  description?: string; // Optional for documentation
  seed(db: mongoose.Connection): Promise<void>;
}