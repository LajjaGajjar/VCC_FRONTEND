// 📌 Truncate long text
export const truncateText = (text, maxLength = 30) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

// 📌 Generate chat title from message
export const generateChatTitle = (message) => {
  if (!message) return "New Chat";
  return message.substring(0, 20);
};

// 📌 Format time (simple)
export const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

// 📌 Format date
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
