import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!input.trim() || disabled) return;

    onSend(input.trim());
    setInput("");

    // reset height after send
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);

    // 🔥 AUTO EXPAND TEXTAREA
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="chat-input-box">

          <textarea
            ref={textareaRef}
            placeholder="Message VCC..."
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={disabled || !input.trim()}
          >
            ↑
          </button>

        </div>
      </div>
    </div>
  );
}