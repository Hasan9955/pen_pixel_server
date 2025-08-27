"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouters = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("../models/post"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        if (!title || !content)
            return res.status(400).json({ error: "Title & content required" });
        const post = yield post_1.default.create({ title, content, author });
        res.status(201).json(post);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        res.json(post);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}));
exports.postRouters = router;
