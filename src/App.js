import { BrowserRouter, Routes, Route } from "react-router-dom";
import Primeira from "./pages/Primeira";



export default function App() {

  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Primeira />} />
        
         
        </Routes>
      </BrowserRouter>
  );
}