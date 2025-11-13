import express from 'express';
import CommunityPost from '../models/CommunityPost.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Add a comment to a post (auth required)
router.post('/posts/:id/comment', authRequired, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  const comment = {
    user: {
      id: req.user.id,
      name: req.user.name,
  avatar: req.user.avatar || '/avatar.png',
    },
    content,
    createdAt: new Date(),
  };
  post.comments.push(comment);
  await post.save();
  req.app.get('io').emit('new_comment', { postId: post._id, comment });
  res.status(201).json({ postId: post._id, comment });
});

// Get all posts (newest first)
router.get('/posts', async (req, res) => {
  const posts = await CommunityPost.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create a new post (auth required)
router.post('/posts', authRequired, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Content required' });
  const post = await CommunityPost.create({
    user: {
      id: req.user.id,
      name: req.user.name,
  avatar: req.user.avatar || '/avatar.png',
    },
    content,
  });
  // Emit real-time event
  req.app.get('io').emit('new_post', post);
  res.status(201).json(post);
});

// Like a post (auth required)
router.post('/posts/:id/like', authRequired, async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.likedBy.includes(req.user.id)) return res.status(400).json({ message: 'Already liked' });
  post.likes++;
  post.likedBy.push(req.user.id);
  await post.save();
  req.app.get('io').emit('like_post', { id: post._id, likes: post.likes });
  res.json({ id: post._id, likes: post.likes });
});

export default router;
