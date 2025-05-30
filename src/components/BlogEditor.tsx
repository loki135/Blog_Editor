import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Send, Loader, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Blog, BlogFormData } from '../types';
import { api } from '../services/api';
import { useAutosave } from '../hooks/useAutosave';

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    tags: ''
  });
  
  // Last saved timestamp state
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Function to handle successful autosave
  const handleAutosaveSuccess = () => {
    setLastSaved(new Date());
    toast.success('Draft saved automatically', {
      duration: 2000,
      position: 'bottom-right',
      icon: '📝',
      style: {
        background: '#EFF6FF',
        color: '#1E40AF',
      },
    });
  };

  // Initialize autosave hook
  useAutosave({
    formData: { ...formData, id },
    onSave: handleAutosaveSuccess,
    delay: 5000
  });

  useEffect(() => {
    // If we have an ID, fetch the blog for editing
    if (id) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const blog = await api.getBlogById(id);
          setFormData({
            title: blog.title,
            content: blog.content,
            tags: blog.tags.join(', ')
          });
          setError(null);
        } catch (err) {
          console.error('Failed to fetch blog:', err);
          setError('Failed to load the blog. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      await api.saveDraft({ ...formData, id });
      setLastSaved(new Date());
      toast.success('Draft saved successfully!');
      
      // If it's a new blog, redirect to edit page with the new ID
      if (!id) {
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to save draft:', err);
      toast.error('Failed to save draft. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setSaving(true);
      await api.publishBlog({ ...formData, id });
      toast.success('Blog published successfully!');
      navigate('/');
    } catch (err) {
      console.error('Failed to publish blog:', err);
      toast.error('Failed to publish blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading blog content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="content" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="tags" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <button
                onClick={handleSaveDraft}
                disabled={saving}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                disabled={saving || !formData.title || !formData.content}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publish
              </button>
            </div>
            
            {lastSaved && (
              <p className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {formData.title && formData.content && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{formData.title}</h1>
              <div className="prose max-w-none">
                {formData.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {formData.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, idx) => (
                    tag.trim() && (
                      <span 
                        key={idx} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;