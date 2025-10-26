import { createContext, useContext, useState } from "react";

const AppContext = createContext(); // setting up context to allow us to share data across components

export const AppProvider = ({ children }) => {
  // Track login info
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // dummy account to test login
  const [accounts, setAccounts] = useState([
    {
      username: "marley_admin",
      password: "AdminMarley123?",
    },
  ]);

  // Example events
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Walking Alfie",
      start: new Date(2025, 9, 28, 10, 0),
      end: new Date(2025, 9, 28, 12, 0),
    },
    {
      id: 1,
      title: "Squash",
      start: new Date(2025, 9, 14, 11, 0),
      end: new Date(2025, 9, 14, 11, 45),
    },
  ]);

  // Handle user login
  const handleLogin = (username, password) => {
    const user = accounts.find(
      // searching through array to check if entered username and password matches
      (acc) => acc.username === username && acc.password === password
    );

    if (user) {
      setCurrentUser(user.username);
      setLoggedIn(true);
      return true; // successful login
    } else {
      return false; // login failed
    }
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        currentUser,
        handleLogin,
        handleLogout,
        accounts,
        setAccounts,
        events,
        setEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);