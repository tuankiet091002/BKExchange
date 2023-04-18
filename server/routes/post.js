import express from 'express';

import { getPosts, createPost, likePost, commentPost, deletePost } from '../controllers/postController.js';

const router = express.Router();
import { authenticate } from "../middleware/auth.js";

router.get('/', getPosts);
router.post('/', authenticate, createPost);
router.delete('/:id', authenticate, deletePost);
router.patch('/:id/like', authenticate, likePost);
router.post('/:id/comment', authenticate, commentPost);


export default router;