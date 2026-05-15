import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful! VIP Wristband secured:", data.token);
        localStorage.setItem("havenToken", data.token);
        
        try {
          const campfireResponse = await fetch("http://localhost:5001/api/auth/campfire/sync", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${data.token}`
            }
          });

          if (campfireResponse.ok) {
            const campfireData = await campfireResponse.json();
            localStorage.setItem("havenFallsCampfire", JSON.stringify(campfireData.campfireList));
            console.log("Campfire downloaded from vault.");
          }
        } catch (syncError) {
          console.error("Could not download campfire:", syncError);
        }
        
        setStatusMessage("Welcome back to basecamp.");
        setIsSuccess(true);
        
        setFormData({ email: '', password: '' });

        window.location.href = "/account";
      } else {
        console.error("Login failed:", data.message);
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
        <h2>Return to Basecamp</h2>
        <p>Enter your credentials to access your kit.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Adventurer Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="primary-button">
            Unlock Vault
          </button>
        </form>

        {statusMessage && (
          <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
            {statusMessage}
          </div>
        )}

        <p className="auth-switch">
          New to Haven Falls? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;