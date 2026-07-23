import ReactMarkdown from "react-markdown";

export default function MessageBubble({ role, text }) {
  return (
    <div className={`message-row ${role}`}>

      {/* BOT AVATAR */}
      {role === "bot" && (
        <div className="avatar bot">🤖</div>
      )}

      {/* MESSAGE */}
      <div className="message-bubble">
        <div className="message-content">
          <ReactMarkdown>
            {text}
          </ReactMarkdown>
        </div>
      </div>

      {/* USER AVATAR */}
      {role === "user" && (
        <div className="avatar user">👤</div>
      )}

    </div>
  );
}