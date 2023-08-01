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
import PeriodiciteImpot from "./pages/paramètres/Mije A jour/PeriodiciteImpot";
import Periodicite from "./pages/paramètres/Mije A jour/Periodicite";
import ObligationFiscal from "./pages/paramètres/Mije A jour/ObligationFiscal";
import TypeProceVerbaux from "./pages/paramètres/Mije A jour/TypeProceVerbaux";
import OperateurTelephonique from "./pages/paramètres/Mije A jour/OperateurTelephonique";
import Operateur from "./pages/paramètres/Utilitaires/Operateur";
import PrevisonAnnuelle from "./pages/paramètres/Parametres/PrevisonAnnuelle";
import PCOCPAffectation from "./pages/paramètres/Parametres/PCOCP&Affectation";
import ChefActionTypePrevision from "./pages/paramètres/Parametres/ChefActionTypePrevision";
import DateEcheancePeriode from "./pages/paramètres/Parametres/PeriodiciteImpot/DateEcheancePeriode";
import DateEcheanceTypeImpot from "./pages/paramètres/Parametres/PeriodiciteImpot/DateEcheanceTypeImpot";
import PeriodiciteImpotParametre from "./pages/paramètres/Parametres/PeriodiciteImpot/PeriodiciteImpot";
import MiseAJourRF from "./pages/immatriculation/Immatriculation/MiseAJourRF";
import ReleveRF from "./pages/immatriculation/Immatriculation/ReleveRF";
import ConsultationGestion from "./pages/gestion/Consultation/Consultation";

function App() {
  
 
  return (
    <>
    <Router>
      <Routes>
     <Route path="/" element={<LoadingPage />}></Route>  
     <Route path="/login" element={<LoginPage />}></Route>
     <Route path="/menu" element={<MenuPage/>}></Route> 
     <Route path="/SIGRL" element={<Sigrl/>}></Route> 
    
     <Route path="/recette" element={<Recette/>}></Route>
     <Route path="/saisiDeclarationRecette" element={<SaisieDeclaration/>}></Route>
     <Route path="/situationRecette" element={<SituationRecette/>}></Route>
     <Route path="/consultationRecette" element={<ConsultationRecette/>}></Route>
     <Route path="/NIFRecette" element={<NIFRecette/>}></Route>
     <Route path="/ResteRecovreRecette" element={<ResteRecovré/>}></Route>
     <Route path="/utilitaireRecette" element={<UtilitairesRecette/>}></Route>
     
     <Route path="/gestion" element={<Gestion/>}></Route>
     <Route path="/ConsultationGestion" element={<ConsultationGestion/>}></Route>


     <Route path="/immatriculation" element={<Immatriculation/>}></Route> 
     <Route path="/consultatioRF" element={<ConsultationRF/>}></Route>
     <Route path="/utilitaire" element={<Utilitaire/>}></Route>
     <Route path="/MiseAJourRF" element={<MiseAJourRF/>}></Route>
     <Route path="/ReleveRF" element={<ReleveRF/>}></Route>



     <Route path="/miseAJourParametre" element={<MiseAJour/>}></Route>
     <Route path="/utilitaireParametre" element={<UtilitaireParametre/>}></Route>
     <Route path="/Operateur" element={<Operateur/>}></Route>
   
     <Route path="/sauvegardeParametre" element={<Sauvegarde/>}></Route>

     <Route path="/parametreParametre" element={<Parametres/>}></Route>
     <Route path="/previsonAnnuelle" element={<PrevisonAnnuelle/>}></Route>
     <Route path="/PCOCPAffectation" element={<PCOCPAffectation/>}></Route>
     <Route path="/ChefActionTypePrevision" element={<ChefActionTypePrevision/>}></Route>
     <Route path="/PeriodiciteImpotParametre" element={<PeriodiciteImpotParametre/>}></Route>
     <Route path="/DateEcheancePeriode" element={<DateEcheancePeriode/>}></Route>
     <Route path="/DateEcheanceTypeImpot" element={<DateEcheanceTypeImpot/>}></Route>
      
     <Route path="/changementMotdePasse" element={<ChangementMotPasse/>}></Route>
     <Route path="/codeActivite" element={<CodeActivite/>}></Route>
     <Route path="/codeBanque" element={<CodeBanque/>}></Route>
     <Route path="/codeGeographique" element={<CodeGeographique/>}></Route>
     <Route path="/codeFormeJuridique" element={<CodeFormeJuridique/>}></Route>
     <Route path="/codeCollectivite" element={<CodeCollectivite/>}></Route>
     <Route path="/periodiciteImpot" element={<PeriodiciteImpot/>}></Route>
     <Route path="/periodicite" element={<Periodicite/>}></Route>
     <Route path="/obligationFiscal" element={<ObligationFiscal/>}></Route>
     <Route path="/typeProceVerbaux" element={<TypeProceVerbaux/>}></Route>
     <Route path="/operateurTelephonique" element={<OperateurTelephonique/>}></Route>
      
      
     
     
     
      </Routes>
    </Router>
    </>
  );
}

export default App;
