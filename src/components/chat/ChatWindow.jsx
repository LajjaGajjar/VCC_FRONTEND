import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { sendMessage } from "../../services/chatService";
import "../../styles/chat.css";

export default function ChatWindow({ selectedChat, setSelectedChat }) {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  /* =========================
     LOAD SELECTED CHAT
  ========================= */
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
      setChatId(selectedChat._id);
    } else {
      // NEW CHAT
      setMessages([]);
      setChatId(null);
    }
  }, [selectedChat]);

  /* =========================
     AUTO SCROLL
  ========================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* =========================
     SEND MESSAGE
  ========================= */
  const handleSend = async (text) => {
    if (!text || loading) return;

    // show user message instantly
    setMessages((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { role: "user", content: text },
    ]);

    try {
      setLoading(true);

      const res = await sendMessage({
        message: text,
        chatId: chatId || null,
      });

      const newMessages = Array.isArray(res?.data?.messages)
        ? res.data.messages
        : [];

      const newChatId = res?.data?.chatId || chatId;

      setMessages(newMessages);
      setChatId(newChatId);

      /* =========================
         NEW CHAT CREATED
      ========================= */
      if (!chatId && newChatId) {
        // 🔥 notify sidebar
        window.dispatchEvent(new Event("chatCreated"));

        // 🔥 auto select chat
        setSelectedChat({
          _id: newChatId,
          messages: newMessages,
        });
      }

    } catch (err) {
      console.error("Chat Error:", err);

      setMessages((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        { role: "bot", content: "❌ Error sending message" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="chat-container">

      {/* =========================
          MESSAGES
      ========================= */}
      <div className="messages">

        {safeMessages.length === 0 ? (
          <div className="empty">
            <h2>Welcome to VCC 💬</h2>
            <p>Start chatting...</p>
          </div>
        ) : (
          safeMessages.map((msg, index) => (
            <MessageBubble
              key={index}
              role={msg?.role || "bot"}
              text={msg?.content || ""}
            />
          ))
        )}

        {/* Typing indicator */}
        {loading && (
          <MessageBubble role="bot" text="Typing..." />
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />

      </div>

      {/* =========================
          INPUT (FLOATING)
      ========================= */}
      <ChatInput onSend={handleSend} disabled={loading} />

    </div>
  );
}