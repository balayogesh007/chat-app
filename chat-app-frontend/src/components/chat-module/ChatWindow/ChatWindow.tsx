import './ChatWindow.css'

export const ChatWindowComponent = () => {

    const userName = localStorage.getItem('fullName');

    return (
        <div className="chat-container">
            <div className="chat-header">
                <span id="username">{userName}</span>
            </div>
        
            <div id="chatBody" className="chat-body">
            </div>
        
            <div className="chat-footer">
                <input id="chatInput" type="text" placeholder="Type your message..."/>
                <button id="sendButton">Send</button>
            </div>
      </div>
    )
}