import type { Request, Response } from "express";
import { Users } from "../db/schema.js";
import bcrypt from "bcryptjs";

import { generateJwtToken } from "../utils/auth.middleware.js";
//sign up
export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(411)
        .json({ message: "Username and Password are required." });
    }
    if (username.length < 3 || username.length > 10) {
      return res
        .status(411)
        .json({ message: "Username must be 3-10 letters." });
    }
    if (password.length < 8 || password.length > 20) {
      return res
        .status(411)
        .json({ message: "Password must be 8-20 letters." });
    }
    const existingUser = await Users.findOne({ username: username });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "User already exists with this username" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, password: hashPassword });
    return res.status(200).json({
      message: "User signedUp successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//signIn
export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({username});
    if (!user) {
      return res.status(411).json({ message: "Username is incorrect." });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect Password" });
    }
    const token = generateJwtToken(user._id.toString(), user.username);
    return res
      .status(200)
      .json({ message: "User loggedIn successfully.", token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
