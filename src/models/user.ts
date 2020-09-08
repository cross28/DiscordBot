import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: string;
  username: string;
  currency: number;
}

const UserSchema: Schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  username: String,
  currency: Number,
});

export const User = mongoose.model<IUser>('User', UserSchema);
