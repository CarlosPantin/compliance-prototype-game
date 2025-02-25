import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import "./MainMenu.css";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route?: string;
}

const HRDetectiveMainMenu: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>("newCase");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const menuItems: MenuItem[] = [
    { id: "newCase", title: "New Case", icon: "📁", route: "/game-board" },
    {
      id: "caseLibrary",
      title: "Case Library",
      icon: "📚",
      route: "/case-library",
    },
    {
      id: "myRecords",
      title: "My Verdicts",
      icon: "⚖️",
      route: "/my-verdicts",
    },
    { id: "training", title: "Training", icon: "🎓", route: "/training" },
    { id: "settings", title: "Settings", icon: "⚙️", route: "/settings" },
    { id: "logout", title: "Logout", icon: "🚪" },
  ];

  const handleMenuItemClick = (id: string) => {
    setActiveMenuItem(id);
    const selectedItem = menuItems.find((item) => item.id === id);

    if (selectedItem && selectedItem.route) {
      navigate(selectedItem.route);
    } else if (id === "logout") {
      logout();
      navigate("/login");
    }
  };

  const handleStartInvestigation = () => {
    navigate("/game-board");
  };

  return (
    <div className="hr-detective">
      <div className="background"></div>
      <div className="particles"></div>

      <div className="container">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">⚖️</div>
            <h1>HR Detective</h1>
          </div>

          <div className="profile">
            <span className="profile-name">
              {user?.username || "Detective"}
            </span>
            <div className="profile-icon">
              {user?.username
                ? user.username.substring(0, 2).toUpperCase()
                : "DS"}
            </div>
          </div>
        </header>

        <div className="content">
          <nav className="menu">
            <h2 className="menu-title">Command Center</h2>
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`menu-item ${
                    activeMenuItem === item.id ? "active" : ""
                  }`}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  <span className="menu-item-icon">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </nav>

          <main className="main-content">
            <div className="welcome-banner">
              <div className="welcome-text">
                <h2>Welcome back, {user?.username || "Detective"}</h2>
                <p>You have 3 new HR cases awaiting your investigation.</p>
                <button
                  className="start-button"
                  onClick={handleStartInvestigation}
                >
                  Begin Investigation
                </button>
              </div>
              <div className="banner-decoration">
                <div className="badge"></div>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <h3>Resolved Cases</h3>
                <div className="stat-number">42</div>
                <div className="stat-trend positive">+12% this week</div>
              </div>

              <div className="stat-card">
                <h3>Accuracy Rating</h3>
                <div className="stat-number">93%</div>
                <div className="stat-trend positive">+5% this month</div>
              </div>

              <div className="stat-card">
                <h3>Pending Cases</h3>
                <div className="stat-number">7</div>
                <div className="stat-trend negative">+2 since yesterday</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HRDetectiveMainMenu;
