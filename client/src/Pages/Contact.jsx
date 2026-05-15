import React, { useState } from 'react';
import { FiRadio } from 'react-icons/fi'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  // Success Message State
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Transmission Setup
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Payload Conversion
        body: JSON.stringify(formData),
      });

      // Awaiting Server Reply
      const data = await response.json();

      // Trigger the UI
      if (response.ok) {
        console.log("Server confirmed:", data.message);
        setIsSent(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      } else {
        console.error("Transmission rejected by server:", data);
      }
      
    } catch (error) {
      console.error("Fatal error: Could not reach basecamp.", error);
    }
  };

  return (
    <div className="contact-wrapper">
      
      {/* Header */}
      <div className="contact-header-accent">
        <h1><FiRadio className="comms-icon" /> Establish Comms</h1>
      </div>
      <p className="contact-subtext">Reach out to basecamp. We're standing by.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Item Question">Item Question</option>
            <option value="Returns & Exchanges">Returns & Exchanges</option>
            <option value="Deployment Support">Deployment Support</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="submit-btn">
          <FiRadio className="btn-icon" /> Send Transmission <FiRadio className="btn-icon" />
        </button>
      </form>

      {/* Success Message */}
      {isSent && (
        <div className="transmission-success">
          <FiRadio className="success-icon" />
          Transmission sent to Haven Falls basecamp. We will get back to you within 3 working days.
        </div>
      )}

    </div>
  );
};

export default Contact;