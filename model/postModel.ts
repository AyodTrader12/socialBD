import { model, Schema, Types } from "mongoose";

interface ipost {
  message: string;
  image: string;
  imageID: string;
  user: {};
  like: Array<{}>;
}

interface ipostData extends ipost, Document {}

const postModel = new Schema<ipostData>(
  {
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    user: {
      type: Types.ObjectId,
      ref: "users",
    },
    like: [
      {
        type: Types.ObjectId,
        ref: "likess",
      },
    ],
  },

  { timestamps: true }
);

export default model<ipostData>("posts", postModel);
