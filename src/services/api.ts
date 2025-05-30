import axios from 'axios';
import { Blog, BlogFormData } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
  // Get all blogs
  getBlogs: async (): Promise<Blog[]> => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  },

  // Get a single blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  },

  // Save as draft
  saveDraft: async (blogData: BlogFormData): Promise<Blog> => {
    const response = await axios.post(`${API_URL}/blogs/save-draft`, blogData);
    return response.data;
  },

  // Publish blog
  publishBlog: async (blogData: BlogFormData): Promise<Blog> => {
    const response = await axios.post(`${API_URL}/blogs/publish`, blogData);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Blog post not found');
        } else if (error.response?.status === 400) {
          throw new Error('Invalid blog ID');
        } else {
          throw new Error(error.response?.data?.error || 'Failed to delete blog');
        }
      }
      throw error;
    }
  }
};