export const API_BASE_URL = "https://sms-backend-4o08.onrender.com";

export const getAttendance = async () => {
  const res = await fetch(`${API_BASE_URL}/api/attendance`);
  return res.json();
};

export const getChatbotResponse = async (message) => {
  const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
};

export const getDashboardData = async () => {
  const res = await fetch(`${API_BASE_URL}/api/dashboard`);
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const sendEmail = async (emailData) => {
  const res = await fetch(`${API_BASE_URL}/api/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  });
  return res.json();
};
