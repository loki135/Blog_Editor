import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Blog from './models/Blog.js';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Parse tags from string
const parseTags = (tagsString) => {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
};

// API Routes
// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

// Get blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

// Save or update draft
app.post('/api/blogs/save-draft', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const parsedTags = parseTags(tags);
    
    if (id) {
      // Update existing blog
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          content,
          tags: parsedTags,
          status: 'draft'
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      res.json(updatedBlog);
    } else {
      // Create new blog
      const newBlog = new Blog({
        title,
        content,
        tags: parsedTags,
        status: 'draft'
      });
      
      await newBlog.save();
      res.status(201).json(newBlog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to save draft' });
  }
});

// Publish blog
app.post('/api/blogs/publish', async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const parsedTags = parseTags(tags);
    
    if (id) {
      // Update existing blog
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title,
          content,
          tags: parsedTags,
          status: 'published'
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      
      res.json(updatedBlog);
    } else {
      // Create new blog
      const newBlog = new Blog({
        title,
        content,
        tags: parsedTags,
        status: 'published'
      });
      
      await newBlog.save();
      res.status(201).json(newBlog);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish blog' });
  }
});

// Delete blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog ID format' });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ 
      error: 'Failed to delete blog',
      details: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});