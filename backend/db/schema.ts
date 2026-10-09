import mongoose from "mongoose";
import { Types } from "mongoose";

//user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Users = mongoose.model("Users", userSchema);

//tag
const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});
export const Tags = mongoose.model("Tags", tagSchema);
//content
export const contentTypes = ["youtube" , "twitter" , "article" , "image" , "text" , "link"];
const contentSchema = new mongoose.Schema({
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: contentTypes,
    required: true,
  },
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tags",
    },
  ],
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
  },

});
export const Contents = mongoose.model("Contents", contentSchema);

//link
const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique:true
  },
  userId: {
    type: Types.ObjectId,
    ref: "Users",
    required: true,
    unique:true
  },
});
export const Links = mongoose.model("Links", linkSchema);
