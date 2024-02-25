import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [loginPopper, setLoginPopper] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [notiLoginSuccess, setNotiLoginSuccess] = useState(false);
  const [user, setUser] = useState({});
  const [listVideo, setListVideo] = useState([]);
  const [volume, setVolume] = useState(localStorage.getItem('volume') || 40);
  const [isMuted, setIsMuted] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    theme === 'light' ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    const authToken = localStorage.getItem('authToken') || getCookie('authToken');
    if (authToken) {
      axios
        .request({
          method: 'get',
          url: `https://tiktok.fullstack.edu.vn/api/auth/me`,
          params: {
            // Các tham số yêu cầu (nếu có)
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setCurrentUser(true);
            setUser(response.data.data);
          }
        })
        .catch((error) => {
          // Xử lý lỗi
          console.error(error);
        });
    }
  }, []);

  const value = {
    loginPopper: loginPopper,
    setLoginPopper: setLoginPopper,
    theme: theme,
    toggleTheme,
    currentUser,
    setCurrentUser,
    notiLoginSuccess,
    setNotiLoginSuccess,
    user,
    setUser,
    listVideo,
    setListVideo,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };
