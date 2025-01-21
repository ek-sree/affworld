import mongoose, { Document, Schema, Types } from "mongoose";

interface IUserInterface extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string; // Make password optional
  googleId?: string; // Store Google ID for Google login
  isStatus: boolean;
}

const userSchema: Schema<IUserInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      trim: true,
      validate: {
        validator: function (this: IUserInterface, v: string): boolean {
          // Allow password to be null if googleId exists
          if (this.googleId) return true;
          // If googleId doesn't exist, ensure password is at least 6 characters
          return !!v && v.length >= 6;
        },
        message: "Password should be at least 6 characters long",
      },
    },
    googleId: {
      type: String, 
      default:null
    },
    isStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUserInterface>("User", userSchema);

export default UserModel;
