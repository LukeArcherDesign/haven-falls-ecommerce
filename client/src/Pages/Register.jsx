import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful! VIP Wristband secured:", data.token);
        localStorage.setItem("havenToken", data.token);
        

        setStatusMessage("Account created successfully! Welcome to basecamp.");
        setIsSuccess(true);
        

        setFormData({ name: '', email: '', password: '' });
      } else {
        console.error("Registration failed:", data.message);
        

        setStatusMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage("Failed to connect to the server. Check if port 5001 is running.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Join Haven Falls</h2>
        <p>Register your details to secure your basecamp access.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Adventurer Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="primary-button">
            Forge Key
          </button>
        </form>


        {statusMessage && (
          <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
            {statusMessage}
          </div>
        )}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Return to Basecamp</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;