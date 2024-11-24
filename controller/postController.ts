import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import postModel from "../model/postModel";
import { Types } from "mongoose";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { message } = req.body;

    const findUser = await userModel.findById(userID);

    if (findUser) {
      const post: any = await postModel.create({
        message,
      });
      findUser.post.push(new Types.ObjectId(post?._id));
      findUser.save();
      return res.status(201).json({
        message: "user created successfully",
        data: post,
        status: 201,
      });
    } else {
      return res.status(404).json({
        error: "Error getting users",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const getAllPost = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "account created",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
export const getOneUserPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;
    const user = await userModel.findById(userID).populate({
      path: "post",
      options: {
        sort: {
          createdAT: -1,
        },
      },
    });
    return res.status(201).json({
      message: "account created",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const likeOneUserPost = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const user = await userModel.findById(userID);
    const post: any = await postModel.findById(postID);

    await postModel.findByIdAndUpdate(
      postID,
      {
        like: [...post.like, userID],
      },
      { new: true }
    );
    return res.status(201).json({
      message: "account created",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
