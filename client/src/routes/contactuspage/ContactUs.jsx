import React, { useState } from 'react';
import './contactUs.css';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', { name, email, message });
    setSubmitted(true);
    
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send us a message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Send Message</button>
          {submitted && <p className="success-message">Message sent successfully!</p>}
        </form>
      </div>
      
    </div>
  );
}