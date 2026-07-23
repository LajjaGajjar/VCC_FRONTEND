import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar"; // ✅ ADD THIS
import ChatWindow from "../components/chat/ChatWindow";

export default function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="app">

      <Sidebar setSelectedChat={setSelectedChat} />

      <div className="main-area"> {/* renamed from main-content */}

        <Navbar /> {/* ✅ THIS WAS MISSING */}

        <ChatWindow
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

      </div>

    </div>
  );
}