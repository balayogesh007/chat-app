import { useNavigate } from 'react-router-dom';
import './ChatWindow.css';

export const ChatWindowComponent = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('fullName');

  const logoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="parent-container">
      <div className="sidebar-component">
        <div className="side-bar-nav">
          <h1>Chat App</h1>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="username-section">
            <img
              src="/assets/profile-user.png"
              alt="profile-icon"
              className="user-profile-img"
            />
            <span id="username">{userName?.toUpperCase()}</span>
          </div>
          <div className="logout-section" onClick={logoutHandler}>
            <img
              src="/assets/logout.png"
              alt="logout-icon"
              className="logout-icon"
            />
            <span>Logout</span>
          </div>
        </div>

        <div id="chatBody" className="chat-body"></div>

        <div className="chat-footer">
          <input
            id="chatInput"
            type="text"
            placeholder="Type your message..."
          />
          <button id="sendButton">Send</button>
        </div>
      </div>
    </div>
  );
};
