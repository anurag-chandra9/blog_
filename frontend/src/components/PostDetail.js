import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './PostDetail.css';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`, {
          headers: auth ? {
            'Authorization': `Token ${auth.token}`
          } : {}
        });
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, auth]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="error-message">Post not found</div>;
  }

  return (
    <div className="post-detail">
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>
      <div className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>Posted by: {post.author_username}</span>
          <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
          {post.updated_at && (
            <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
          )}
        </div>
        {post.image_url && (
          <div className="post-image">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}
        <div className="post-body">
          {post.content}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
