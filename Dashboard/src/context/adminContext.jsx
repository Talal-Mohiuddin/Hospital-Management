import { createContext, useContext } from "react";
import { useState } from "react";

const Admin = createContext();

const AdminProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  return (
    <Admin.Provider
      value={{ isAuthenticated, setisAuthenticated, user, setuser }}
    >
      {children}
    </Admin.Provider>
  );
};

const useAdmin = () => {
  return useContext(Admin);
};

export { AdminProvider, useAdmin };
