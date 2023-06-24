import React from"react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoadingPage from "./pages/loadingPage/loadingPage";
import LoginPage from "./pages/login/login";
import MenuPage from "./pages/menu/MenuPage";
import Sigrl from "./pages/SIGRL/Sigrl";
import Immatriculation from "./pages/immatriculation/Immatriculation";
import ConsultationRF from "./pages/consultatioRF/ConsultationRF";
import Utilitaire from "./pages/utilitaire/Utilitaire";

function App() {
  
 
  return (
    <>
    <Router>
      <Routes>
     <Route path="/" element={<LoadingPage />}></Route>  
     <Route path="/login" element={<LoginPage />}></Route>
     <Route path="/menu" element={<MenuPage/>}></Route> 
     <Route path="/SIGRL" element={<Sigrl/>}></Route> 
     <Route path="/immatriculation" element={<Immatriculation/>}></Route> 
     <Route path="/consultatioRF" element={<ConsultationRF/>}></Route>
     <Route path="/utilitaire" element={<Utilitaire/>}></Route>        
      </Routes>
    </Router>
    </>
  );
}

export default App;
