import React, { useState, useEffect } from 'react';
import { Loader, FileWarning } from 'lucide-react';
import { Blog } from '../types';
import { api } from '../services/api';
import BlogCard from './BlogCard';

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts'>('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await api.getBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  const filteredBlogs = blogs.filter(blog => {
    if (activeTab === 'all') return true;
    return blog.status === activeTab.slice(0, -1); // remove 's' from 'drafts' or 'published'
  });

  const publishedCount = blogs.filter(blog => blog.status === 'published').length;
  const draftsCount = blogs.filter(blog => blog.status === 'draft').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-500">
        <FileWarning className="h-12 w-12 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Your Blogs</h1>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'all' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'published' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'drafts' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Drafts ({draftsCount})
          </button>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">No blogs found in this category.</p>
          <a 
            href="/new" 
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create New Blog
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              onDelete={handleDeleteBlog} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;