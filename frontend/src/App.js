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
import ConsultationRF from "./pages/immatriculation/consultatioRF/ConsultationRF";
import Utilitaire from "./pages/immatriculation/utilitaire/Utilitaire";
import MiseAJour from "./pages/paramètres/Mije A jour/MiseAJour";
import UtilitaireParametre from "./pages/paramètres/Utilitaires/UtilitaireParametre";
import Sauvegarde from "./pages/paramètres/Sauvegarde/Sauvegarde";
import Parametres from "./pages/paramètres/Parametres/Parametres";
import ChangementMotPasse from "./pages/paramètres/Utilitaires/ChangementMotPasse";
import CodeActivite from "./pages/paramètres/Mije A jour/CodeActivite";
import CodeBanque from "./pages/paramètres/Mije A jour/CodeBanque";
import CodeGeographique from "./pages/paramètres/Mije A jour/CodeGeographique";
import CodeFormeJuridique from "./pages/paramètres/Mije A jour/CodeFormeJuridique";
import CodeCollectivite from "./pages/paramètres/Mije A jour/CodeCollectivite";

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


     <Route path="/miseAJourParametre" element={<MiseAJour/>}></Route>
     <Route path="/utilitaireParametre" element={<UtilitaireParametre/>}></Route>
     <Route path="/sauvegardeParametre" element={<Sauvegarde/>}></Route>
     <Route path="/parametreParametre" element={<Parametres/>}></Route>
     <Route path="/changementMotdePasse" element={<ChangementMotPasse/>}></Route>
     <Route path="/codeActivite" element={<CodeActivite/>}></Route>
     <Route path="/codeBanque" element={<CodeBanque/>}></Route>
     <Route path="/codeGeographique" element={<CodeGeographique/>}></Route>
     <Route path="/codeFormeJuridique" element={<CodeFormeJuridique/>}></Route>
     <Route path="/codeCollectivite" element={<CodeCollectivite/>}></Route>
      
      
     
     
     
      </Routes>
    </Router>
    </>
  );
}

export default App;
