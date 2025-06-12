import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    navigate,
    axios,
  };

  //Fetch User is Login or Not on Load
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/isAuth");
      if (data.success) {
        setIsLoggedIn(true);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //Checks if user is already LoggedIn
  useEffect(() => {
    fetchUser();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
