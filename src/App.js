import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Primeira from "./pages/Primeira";
import Segunda from "./pages/Segunda";
import Home from "./pages/Home";


export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Primeira />} />
          <Route path="/cadastro" element={<Segunda />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

