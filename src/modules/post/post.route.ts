import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.get("/", PostController.getAllPosts);
router.post("/", PostController.createPost);

export const postRouter = router;
