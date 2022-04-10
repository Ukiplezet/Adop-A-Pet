import { createContext, useState } from "react";

export const UserContext = createContext({
  email: "",
  auth: false,
  
});
const token = localStorage.getItem("token");
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    auth: token,
  });
  const login = (user) => {
    setUser((user) => ({
      email: user.email,
      token: user.token,
      auth: user.token,
    }));
  };
  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
