import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Your adventurer name must be at least 2 characters."),
  email: z.string().email("Please enter a valid basecamp email address."),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters long."),
});

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Zod Error State
  const [formErrors, setFormErrors] = useState({});

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the specific red-text error the moment typing starts again
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null,
      });
    }

    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // safeParse checks the data without throwing a fatal application crash if it fails
    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      // Extract the specific errors and map them to the correct input fields
      const formattedErrors = {};
      validation.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });

      setFormErrors(formattedErrors);
      return; // CRITICAL: Abort the function here. Do not ping the backend.
    }

    // If Zod gives the green light, proceed to the Vault
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
        console.log(
          "Registration successful! VIP Wristband secured:",
          data.token,
        );
        localStorage.setItem("havenToken", data.token);

        setStatusMessage("Account created successfully! Welcome to basecamp.");
        setIsSuccess(true);
        setFormData({ name: "", email: "", password: "" });
        setFormErrors({});
      } else {
        console.error("Registration failed:", data.message);
        setStatusMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatusMessage(
        "Failed to connect to the server. Check if port 5001 is running.",
      );
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
            // Removed native 'required' so Zod can handle the heavy lifting
          />
          {formErrors.name && (
            <span className="field-error">{formErrors.name}</span>
          )}

          <input
            type="text" // Changed from 'email' to 'text' to prevent browser overriding Zod
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span className="field-error">{formErrors.email}</span>
          )}

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <span className="field-error">{formErrors.password}</span>
          )}

          <button type="submit" className="primary-button">
            Forge Key
          </button>
        </form>

        {statusMessage && (
          <div className={`status-message ${isSuccess ? "success" : "error"}`}>
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
