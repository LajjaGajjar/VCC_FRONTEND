import API from "./api";

// 🔐 Login User
export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    return res;
  } catch (error) {
    throw error;
  }
};

// 📝 Register User
export const registerUser = async (data) => {
  try {
    const res = await API.post("/auth/register", data);
    return res;
  } catch (error) {
    throw error;
  }
};
