import dotenv from "dotenv";
import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();
import type { AuthRequest } from "../types/auth-req.ts";
const secret = process.env.JWT_SECRET;

export const generateJwtToken = (id: string, username: string) => {
  if (!secret) {
    throw new Error("JWT Secret is not defined.");
  }
  return jwt.sign({ id, username }, secret);
};

export const verifyJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!secret) {
    console.error("JWT_SECRET is not configured.");
    return res
      .status(500)
      .json({ message: "Authentication is not configured." });
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.trim().match(/^Bearer\s+(\S+)$/i);

  if (!bearerToken) {
    return res.status(401).json({
      message: "Authorization header must use the Bearer token format.",
    });
  }
  const token=bearerToken[1];
  try {
    const decoded = jwt.verify(token!, secret);
    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "string" ||
      typeof decoded.username !== "string"
    ) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    console.error("JWT verification error:", error);
    return res.status(500).json({ message: "Unable to verify token." });
  }
};
