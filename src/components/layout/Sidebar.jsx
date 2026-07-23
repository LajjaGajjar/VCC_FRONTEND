import { useEffect, useState } from "react";
import { getChats } from "../../services/chatService";

export default function Sidebar({ selectedChat, setSelectedChat }) {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  const fetchChats = async () => {
    try {
      const res = await getChats();
      setChats(res.data || []);
    } catch (err) {
      console.error("Sidebar error:", err);
    }
  };

  useEffect(() => {
    fetchChats();

    const handler = () => fetchChats();
    window.addEventListener("chatCreated", handler);

    return () => {
      window.removeEventListener("chatCreated", handler);
    };
  }, []);

  // 🔍 Filter chats
  const filteredChats = chats.filter((chat) =>
    chat.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sidebar">

      {/* HEADER */}
      <div className="sidebar-header">VCC</div>

      {/* NEW CHAT */}
      <button
        className="new-chat-btn"
        onClick={() => setSelectedChat(null)}
      >
        + New Chat
      </button>

      {/* SEARCH */}
      <input
        className="sidebar-search"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CHAT LIST */}
      <div className="chat-history">
        {filteredChats.map((chat) => (
          <div
            key={chat._id}
            className={`chat-item ${
              selectedChat?._id === chat._id ? "active" : ""
            }`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="chat-text">
              <strong>{chat.title || "New Chat"}</strong>
            </div>

            {/* DELETE ICON (hover only) */}
            <button className="delete-btn">🗑</button>
          </div>
        ))}
      </div>

    </div>
  );
}