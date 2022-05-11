import { createContext, useContext, useState } from "react";


const sidebarContext = createContext();



export const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("unauthenticated");
    console.log({open})
    return(
        <sidebarContext.Provider value={{ open, setOpen, mode, setMode }}>
            {children}
        </sidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(sidebarContext);