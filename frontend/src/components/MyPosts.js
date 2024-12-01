import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './MyPosts.css';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      fetchPosts();
    }
  }, [auth]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8000/api/posts/my_posts/', {
        headers: {
          'Authorization': `Token ${auth.token}`
        }
      });
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.error || 'Failed to fetch your posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost({
      ...post,
      newTitle: post.title,
      newContent: post.content
    });
  };

  const handleUpdate = async () => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('title', editingPost.newTitle);
      formData.append('content', editingPost.newContent);
      
      await axios.put(
        `http://localhost:8000/api/posts/${editingPost.id}/`,
        formData,
        {
          headers: {
            'Authorization': `Token ${auth.token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err.response?.data?.error || 'Failed to update post. Please try again.');
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setError(null);
        await axios.delete(`http://localhost:8000/api/posts/${postId}/`, {
          headers: {
            'Authorization': `Token ${auth.token}`
          }
        });
        fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        setError(err.response?.data?.error || 'Failed to delete post. Please try again.');
      }
    }
  };

  const handleView = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return <div className="loading">Loading your posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="my-posts">
        <h1>My Blog Posts</h1>
        <div className="no-posts">
          <p>You haven't created any posts yet.</p>
          <button onClick={() => navigate('/create')} className="create-post-button">
            Create Your First Post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-posts">
      <h1>My Blog Posts</h1>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {post.image && (
              <div className="post-image">
                <img src={post.image_url} alt={post.title} />
              </div>
            )}
            <div className="post-content">
              {editingPost?.id === post.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editingPost.newTitle}
                    onChange={(e) => setEditingPost({
                      ...editingPost,
                      newTitle: e.target.value
                    })}
                  />
                  <textarea
                    value={editingPost.newContent}
                    onChange={(e) => setEditingPost({
                      ...editingPost,
                      newContent: e.target.value
                    })}
                  />
                  <div className="edit-buttons">
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingPost(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.content.substring(0, 150)}...</p>
                  <div className="post-meta">
                    <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                    <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="post-actions">
                    <button onClick={() => handleView(post.id)}>View</button>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;
