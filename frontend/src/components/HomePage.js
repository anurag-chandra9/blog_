import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8000/api/posts/', {
          headers: {
            'Authorization': `Token ${auth?.token || ''}`
          }
        });
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        if (err.response?.status === 401) {
          setError('Please log in to view posts');
          navigate('/login');
        } else {
          setError('Failed to fetch posts. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [auth, navigate]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Blog Posts</h1>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">No posts available.</div>
        ) : (
          posts.map(post => (
            <div 
              key={post.id} 
              className="post-card" 
              onClick={() => handlePostClick(post.id)}
            >
              {post.image && (
                <div className="post-image">
                  <img src={post.image_url} alt={post.title} />
                </div>
              )}
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.content.substring(0, 150)}...</p>
                <div className="post-meta">
                  <span>Posted by: {post.author_username}</span>
                  <span>Date: {new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
