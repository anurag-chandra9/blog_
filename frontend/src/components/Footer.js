import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Blog Platform</h3>
          <p>Share your stories with the world.</p>
          <div className="social-links">
            <a href="https://linkedin.com/in/anurag-chandra9" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/anurag.chandra9?igsh=MXJiaDEweTNkcWg4dg==" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Post</Link></li>
            <li><Link to="/my-posts">My Posts</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:anuragkrstm01@gmail.com" className="contact-link">
                <i className="fas fa-envelope"></i> anuragkrstm01@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+918804116315" className="contact-link">
                <i className="fas fa-phone"></i> +91-8804116315
              </a>
            </li>
            <li>
              <a href="https://maps.google.com/?q=Patna,Bihar,India" target="_blank" rel="noopener noreferrer" className="contact-link">
                <i className="fas fa-map-marker-alt"></i> Patna, Bihar, India
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
