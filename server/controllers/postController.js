import express from 'express';
import mongoose from 'mongoose';

import PostModel from '../models/postModel.js';
import Usermodel from '../models/userModel.js';

const router = express.Router();

export const getPosts = async (req, res) => {
    const { creator, title, tags } = req.query
    try {
        let query = {}
        if (creator) {
            const user = await Usermodel.findOne({ name: { $regex: creator, $options: 'i' } })
            query.creator = user?._id ? user._id : null
        }
        if (title) query.title = { $regex: title, $options: 'i' }
        if (tags) query.tags = { $in: tags.split(',') }

        const posts = await PostModel.find(query)
            .populate('creator', 'name avatar')
            .populate('comments.user', 'name avatar')
            .populate('likes', 'name avatar')

        res.status(200).json({ result: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const { title, message, tags, selectedFile } = req.body;
    try {
        const post = await PostModel.create({
            creator: req.user, title,
            message, tags, selectedFile
        });

        res.status(201).json({ result: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    try {
        let post = await PostModel.findById(id)
        if (!post) return res.status(404).json({ message: 'Post not found' })

        const liked = post.likes.indexOf(req.user._id)
        if (liked === -1) {
            post.likes.push(req.user._id);
        } else {
            post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString());
        }

        post = await PostModel.findByIdAndUpdate(id, post, { new: true })
            .populate('creator', 'name avatar')
            .populate('comments.user', 'name avatar')
            .populate('likes', 'name avatar')

        res.status(200).json({ result: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        let post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post = await PostModel.findByIdAndUpdate(id, { $push: { comments: { user: req.user._id, content } } }, { new: true })
            .populate('creator', 'name avatar')
            .populate('comments.user', 'name avatar')
            .populate('likes', 'name avatar')

        res.status(200).json({ result: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        let post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (req.user._id.toString() != post.creator.toString())
            return res.status(401).json({ message: 'You are not the owner to delete this post' });

        post = await PostModel.findByIdAndRemove(id);
        res.status(200).json({ result: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default router;