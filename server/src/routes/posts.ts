import express from 'express';
import { dbGet, dbAll, dbRun } from '../database';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all posts (feed)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const posts: any = await dbAll(`
      SELECT p.*, u.username, u.id as user_id,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as like_count,
      (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count,
      (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = ?) as is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `, [req.userId]);
    res.json(posts);
  } catch (error: any) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create post
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { content, image_url } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const result = await dbRun('INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)', [req.userId, content, image_url || null]);
    const postId = result.lastID;
    const post: any = await dbGet(`
      SELECT p.*, u.username, u.id as user_id,
      0 as like_count, 0 as comment_count, 0 as is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `, [postId]);
    res.status(201).json(post);
  } catch (error: any) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like/Unlike post
router.post('/:id/like', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const postId = req.params.id;
    const existingLike: any = await dbGet('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, req.userId]);
    
    if (existingLike) {
      await dbRun('DELETE FROM likes WHERE post_id = ? AND user_id = ?', [postId, req.userId]);
      res.json({ message: 'Post unliked', liked: false });
    } else {
      await dbRun('INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, req.userId]);
      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error: any) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get comments for a post
router.get('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const comments: any = await dbAll(`
      SELECT c.*, u.username, u.id as user_id
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `, [req.params.id]);
    res.json(comments);
  } catch (error: any) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add comment to post
router.post('/:id/comments', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const result = await dbRun('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [req.params.id, req.userId, content]);
    const commentId = result.lastID;
    const comment: any = await dbGet(`
      SELECT c.*, u.username, u.id as user_id
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `, [commentId]);
    res.status(201).json(comment);
  } catch (error: any) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
