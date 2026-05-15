import { useNavigate, Link } from 'react-router-dom';
import { TbCampfire } from "react-icons/tb";
import { FiShoppingBag, FiSettings } from "react-icons/fi";

const Account = ({ kitItems = [], campfireList = [] }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("havenToken");
    localStorage.removeItem("havenFallsCampfire");
    localStorage.removeItem("havenFallsKit");
    window.location.href = "/login";
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
          <Link to="/campfire" className="card-link">View Campfire</Link>
        </div>

        {/* KIT MODULE */}
        <div className="dashboard-card">
          <FiShoppingBag className="card-icon" />
          <h3>Your Kit</h3>
          <p>{kitItems.length} items packed</p>
          <Link to="/cart" className="card-link">View Kit</Link>
        </div>

        {/* SETTINGS MODULE */}
        <div className="dashboard-card">
          <FiSettings className="card-icon" />
          <h3>Settings</h3>
          <p>Manage your adventurer profile</p>
          <span 
            className="card-link" 
            style={{ 
              color: '#999', 
              borderBottom: 'none', 
              cursor: 'not-allowed' 
            }}
          >
            Module in Development
          </span>
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