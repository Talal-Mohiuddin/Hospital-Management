import { createContext, useContext, useState } from "react";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  return (
    <Auth.Provider
      value={{ isAuthenticated, setisAuthenticated, user, setuser }}
    >
      {children}
    </Auth.Provider>
  );
};

const useAuth = () => {
  return useContext(Auth);
};

export { AuthProvider, useAuth };
