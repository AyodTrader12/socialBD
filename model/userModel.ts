import { model, Schema, Types } from "mongoose";

interface iUser {
  email: string;
  password: string;
  userName: string;
  avatar: string;
  avatarID: string;
  post: Array<{}>;
}

interface iUSerData extends iUser, Document {}

const userModel = new Schema<iUSerData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    post: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
  },

  { timestamps: true }
);

export default model<iUSerData>("user", userModel);
