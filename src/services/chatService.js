import API from "./api";

/* =========================
   💬 SEND MESSAGE
========================= */
export const sendMessage = async (data) => {
  try {
    const res = await API.post("/chat", data);
    return res;
  } catch (error) {
    throw error;
  }
};


/* =========================
   📂 GET ALL CHATS
========================= */
export const getChats = async () => {
  try {
    const res = await API.get("/chat");
    return res;
  } catch (error) {
    throw error;
  }
};


/* =========================
   📄 GET SINGLE CHAT
========================= */
export const getChatById = async (chatId) => {
  try {
    const res = await API.get(`/chat/${chatId}`);
    return res;
  } catch (error) {
    throw error;
  }
};


/* =========================
   🗑 DELETE CHAT (NEW)
========================= */
export const deleteChat = async (chatId) => {
  try {
    const res = await API.delete(`/chat/${chatId}`);
    return res;
  } catch (error) {
    throw error;
  }
};


/* =========================
   ✏️ UPDATE CHAT TITLE (OPTIONAL)
========================= */
export const updateChatTitle = async (chatId, title) => {
  try {
    const res = await API.put(`/chat/${chatId}`, { title });
    return res;
  } catch (error) {
    throw error;
  }
};