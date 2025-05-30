import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Clock, CalendarDays } from 'lucide-react';
import { Blog } from '../types';
import { api } from '../services/api';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/edit/${blog.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.deleteBlog(blog.id);
        onDelete(blog.id);
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">{blog.title}</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="text-gray-600 mb-4 line-clamp-2">
          {truncateContent(blog.content)}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarDays size={14} className="mr-1" />
            <span>Created: {formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>Updated: {formatDate(blog.updatedAt)}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span 
            className={`text-xs px-2 py-1 rounded-full ${
              blog.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {blog.status === 'published' ? 'Published' : 'Draft'}
          </span>
          
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {blog.status === 'published' ? 'View Details' : 'Continue Editing'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;