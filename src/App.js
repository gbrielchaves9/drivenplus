import React, { createContext, useState , useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Primeira from "./pages/Primeira";
import Segunda from "./pages/Segunda";
import Home from "./pages/Home";
import Plano from "./pages/Plano";
import Subscriptions from "./pages/Subscriptions";
import { Navigate } from "react-router-dom";



export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setUser(token); 
    }
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Primeira />} />
          <Route path="/cadastro" element={<Segunda />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/:id" element={<Plano />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

