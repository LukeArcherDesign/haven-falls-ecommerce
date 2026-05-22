import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TbCampfire } from "react-icons/tb";
import { FiShoppingBag, FiSettings } from "react-icons/fi";

const Account = ({ kitItems = [], campfireList = [] }) => {
  const navigate = useNavigate();

  // UI Toggle State
  const [isEditing, setIsEditing] = useState(false);

  // Data State
  const [currentName, setCurrentName] = useState("Loading...");
  const [newUsername, setNewUsername] = useState("");
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("havenToken");
        if (!token) return;

        const response = await fetch("http://localhost:5001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setCurrentName(data.user.name); // Updates the UI with their real database name
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
        setCurrentName("Adventurer"); // Fallback if the server is offline
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("havenToken");
    localStorage.removeItem("havenFallsCampfire");
    localStorage.removeItem("havenFallsKit");
    window.location.href = "/login";
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;

    setUpdateStatus("loading");
    setStatusMessage("");

    try {
      const token = localStorage.getItem("havenToken");

      const response = await fetch(
        "http://localhost:5001/api/auth/profile/name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newName: newUsername }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUpdateStatus("success");
        setStatusMessage("Name successfully updated!");
        setCurrentName(newUsername); // Instantly update the UI text
        setNewUsername("");

        // Smoothly close the form after 1.5 seconds so they have time to read the success message
        setTimeout(() => {
          setIsEditing(false);
          setUpdateStatus("idle");
          setStatusMessage("");
        }, 1500);
      } else {
        setUpdateStatus("error");
        setStatusMessage(data.message || "Failed to update.");
      }
    } catch (error) {
      setUpdateStatus("error");
      setStatusMessage("Server connection lost. Are you online?");
    }
  };

  return (
    <section className="account-dashboard">
      <div className="account-header-accent">
        <h2>Basecamp Command Center</h2>
      </div>

      <div className="dashboard-grid">
        {/* CAMPFIRE MODULE */}
        <div className="dashboard-card">
          <TbCampfire className="card-icon" />
          <h3>Your Campfire</h3>
          <p>{campfireList.length} items saved</p>
          <Link to="/campfire" className="card-link">
            View Campfire
          </Link>
        </div>

        {/* KIT MODULE */}
        <div className="dashboard-card">
          <FiShoppingBag className="card-icon" />
          <h3>Your Kit</h3>
          <p>{kitItems.length} items packed</p>
          <Link to="/cart" className="card-link">
            View Kit
          </Link>
        </div>

        {/* SETTINGS MODULE */}
        <div className="dashboard-card settings-card">
          <FiSettings className="card-icon" />
          <h3>Settings</h3>

          {/* THE CONDITIONAL RENDER */}
          {!isEditing ? (
            <div className="settings-display">
              <p className="current-name-display">
                Name: <strong>{currentName}</strong>
              </p>
              <button
                className="reveal-form-btn"
                onClick={() => setIsEditing(true)}
              >
                Update Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleNameUpdate} className="settings-form">
              <input
                type="text"
                placeholder="Enter new name..."
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="settings-input"
                autoFocus
              />
              <div className="settings-button-row">
                <button
                  type="submit"
                  className="settings-button"
                  disabled={updateStatus === "loading"}
                >
                  {updateStatus === "loading" ? "Updating..." : "Save"}
                </button>
                <button
                  type="button"
                  className="settings-button cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setStatusMessage("");
                  }}
                  disabled={updateStatus === "loading"}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {statusMessage && (
            <p className={`status-message ${updateStatus}`}>{statusMessage}</p>
          )}
        </div>
      </div>

      <div className="account-actions">
        <button onClick={handleLogout} className="secondary-button">
          Pack Up & Log Out
        </button>
      </div>
    </section>
  );
};

export default Account;
