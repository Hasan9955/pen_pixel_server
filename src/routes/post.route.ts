import { Router } from "express"; 
import Post from "../models/post";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title & content required" });
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export const postRouters = router;
