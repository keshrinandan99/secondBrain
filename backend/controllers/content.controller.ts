import type { Request, Response } from "express";
import type { AuthRequest } from "../types/auth-req.ts";
import { contentTypes, Contents, Tags, Links } from "../db/schema.js";
import crypto from "crypto";
export const addNewContent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { link, title, type, tags = [] } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!type || !contentTypes.includes(type)) {
      return res.status(400).json({
        message: `Type is required and must be one of: ${contentTypes.join(", ")}`,
      });
    }

    if (link !== undefined && typeof link !== "string") {
      return res.status(400).json({ message: "Link must be a string" });
    }
    if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
      return res
        .status(400)
        .json({ message: "Tags must be an array of strings" });
    }
    const tagNames = [
      ...new Set<string>(
        tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean),
      ),
    ];
    const tagDocs = await Promise.all(
      tagNames.map((name) =>
        Tags.findOneAndUpdate(
          { title: name },
          { $setOnInsert: { title: name } },
          { upsert: true, new: true },
        ),
      ),
    );
    const tagIds = tagDocs.map((tag) => tag._id);
    const content = await Contents.create({
      link: link?.trim(),
      title: title.trim(),
      type,
      tags: tagIds,
      userId,
    });
    const populated = await content.populate("tags");
    return res.status(201).json({
      message: "Content added successfully.",
      content: populated,
    });
  } catch (error) {
    console.error("addContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllContent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contents = await Contents.find({ userId }).populate("tags");
    return res
      .status(200)
      .json({ message: "Contents fetched successfully", contents });
  } catch (error) {
    console.error("getContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const deleted = await Contents.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Content not found" });
    }
    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("deleteContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const generateShareableLink = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { share } = req.body;
    if (typeof share !== "boolean") {
      return res.status(411).json({ message: "Share must be true or false" });
    }
    if (!share) {
      await Links.findOneAndDelete({ userId });
      return res.status(200).json({ message: "Share is disabled" });
    }
    let link = await Links.findOne({ userId });
    if (!link) {
      link = await Links.create({
        userId,
        hash: crypto.randomBytes(16).toString("hex"),
      });
    }
    return res.status(200).json({
      link: `${req.protocol}://${req.get("host")}/api/v1/brain/${link.hash}`,
    });
  } catch (error) {
    console.error("shareBrain error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchUserContent = async (req: AuthRequest, res: Response) => {
  try {
    const { shareLink } = req.params;
    if (typeof shareLink !== "string") {
      return res.status(400).json({ message: "Invalid share link" });
    }
    const link = await Links.findOne({ hash: shareLink }).populate(
      "userId",
      "username",
    );
    if (!link) {
      return res.status(404).json({ message: "Broken or expired link" });
    }
    const content = await Contents.find({ userId: link.userId }).populate(
      "tags",
    );
    return res.status(200).json({
      username: (link.userId as any).username,
      content,
    });
  } catch (error) {
    console.error("fetchUserContent error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
