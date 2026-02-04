import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPost, getSomePosts, updatePost } from "../controllers/posts.controller";

const postsRouter = Router();

postsRouter.post("/", createPost);
postsRouter.get("/", getAllPosts);
postsRouter.get("/", getSomePosts);
postsRouter.get("/:id", getPost);
postsRouter.get("/:id", deletePost);
postsRouter.put("/:id", updatePost);

export default postsRouter;
