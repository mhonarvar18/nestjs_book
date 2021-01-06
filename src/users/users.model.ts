import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}