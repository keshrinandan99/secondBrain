import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { addNewContent, deleteContent, fetchUserContent, generateShareableLink, getAllContent } from "../controllers/content.controller.js";
import { verifyJWT } from "../utils/auth.middleware.js";
const router=Router();

router.post("/api/v1/signup",signUp);
router.post("/api/v1/signin",signIn);
router.post("/api/v1/content",verifyJWT,addNewContent);
router.get("/api/v1/content",verifyJWT,getAllContent);
router.delete("/api/v1/content/:id",verifyJWT,deleteContent);
router.post("/api/v1/brain/share",verifyJWT,generateShareableLink);
router.get("/api/v1/brain/:shareLink",fetchUserContent);

export default router;