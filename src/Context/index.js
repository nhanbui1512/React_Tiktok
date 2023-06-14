import { useState, createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const [loginPopper, setLoginPopper] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const value = {
        loginPopper: loginPopper,
        setLoginPopper: setLoginPopper,
        theme: theme,
        toggleTheme,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };
