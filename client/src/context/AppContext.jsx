import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const value = {
        isLoggedIn,
        setIsLoggedIn,
        navigate,
        axios,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}


export const useAppContext = () => {
    return useContext(AppContext);
}