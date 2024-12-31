import mongoose, { Document, Schema } from "mongoose";

export interface Users extends Document {
  userName: string;
  password: string;
  email: string;
  fullName: string;
}
export const usersSchema: Schema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model<Users>("users", usersSchema, "users");
