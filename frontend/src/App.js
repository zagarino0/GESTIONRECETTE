import React from"react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoadingPage from "./pages/loadingPage/loadingPage";
import LoginPage from "./pages/login/login";
import MenuPage from "./pages/menu/MenuPage";
import Sigrl from "./pages/SIGRL/Sigrl";
import Immatriculation from "./pages/immatriculation/Immatriculation";
import Recette from "./pages/recette/Recette";
import SaisieDeclaration from "./pages/recette/SaisieDeclaration";
import SituationRecette from "./pages/recette/SituationRecette";
import ConsultationRecette from "./pages/recette/Consultation";
import NIFRecette from "./pages/recette/NIF";
import ResteRecovré from "./pages/recette/ResteRecovré";
import UtilitairesRecette from "./pages/recette/Utilitaires";
import Gestion from "./pages/gestion/Gestion";
import Parametre from "./pages/paramètres/Parametre";
import ConsultationRF from "./pages/immatriculation/consultatioRF/ConsultationRF";
import Utilitaire from "./pages/immatriculation/utilitaire/Utilitaire";

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
     <Route path="/recette" element={<Recette/>}></Route>
     <Route path="/saisiDeclarationRecette" element={<SaisieDeclaration/>}></Route>
     <Route path="/situationRecette" element={<SituationRecette/>}></Route>
     <Route path="/consultationRecette" element={<ConsultationRecette/>}></Route>
     <Route path="/NIFRecette" element={<NIFRecette/>}></Route>
     <Route path="/ResteRecovreRecette" element={<ResteRecovré/>}></Route>
     <Route path="/utilitaireRecette" element={<UtilitairesRecette/>}></Route>
     <Route path="/gestion" element={<Gestion/>}></Route>
     <Route path="/parametre" element={<Parametre/>}></Route>
      
      
     
     
     
      </Routes>
    </Router>
    </>
  );
}

export default App;
