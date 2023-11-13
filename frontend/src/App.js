import React from"react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import LoadingPage from "./pages/loadingPage/loadingPage";
import LoginPage from "./pages/login/login";
import MenuPage from "./pages/menu/MenuPage";
import Sigrl from "./pages/SIGRL/Sigrl";
import Immatriculation from "./pages/immatriculation/Immatriculation";
import SituationRecette from "./pages/recette/SituationRecettte/SituationRecette";
import ConsultationRecette from "./pages/recette/Consulation/Consultation";
import NIFRecette from "./pages/recette/RF/NIF";
import ResteRecovré from "./pages/recette/ResteRecouvre/ResteRecovré";
import UtilitairesRecette from "./pages/recette/Utilitaires/Utilitaires";
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
import ConsultationGestion from "./pages/gestion/Consultation/Consultation";
import SituationNatureImpot from "./pages/gestion/SituationEntreprise/SituationNatureImpot";
import ImpressionImpot from "./pages/gestion/SituationEntreprise/ImpressionImpot";
import MJRRegimeFiscalETGestionDossier from "./pages/gestion/SituationEntreprise/MJRRegimeFiscalETGestionDossier";
import GestionDossier from "./pages/gestion/SituationEntreprise/GestionDossier";
import SituationGeographique from "./pages/gestion/SituationEntreprise/SituationGeographique";
import RegimeFiscal from "./pages/gestion/SituationEntreprise/RegimeFiscal";
import ResteRecouvreGlobal from "./pages/gestion/Consultation/ResteRecouvreGlobal";
import TitrePerceptio from "./pages/gestion/Consultation/TitrePerceptio";
import ListeNatureImpot from "./pages/gestion/Consultation/ListeNatureImpot";
import ResteRecouvrerDeuxDate from "./pages/gestion/Consultation/ResteRecouvrerDeuxDate";
import ConsultationRecetteDeuxDate from "./pages/gestion/Consultation/ConsultationRecetteDeuxDate";
import MontantNatureImpot from "./pages/gestion/Consultation/MontantNatureImpot";
import Defaillant from "./pages/gestion/Defaillants/Defaillant";
import RelanceDefaillant from "./pages/gestion/Defaillants/RelanceDefaillant";
import Listing from "./pages/gestion/Defaillants/Listing";
import TVA from "./pages/gestion/Defaillants/TVA";
import AutreImpot from "./pages/gestion/Defaillants/AutreImpot";
import IRISDA from "./pages/gestion/Defaillants/IRISDA";
import IRSAIRCM from "./pages/gestion/Defaillants/IRSAIRCM";
import SaisieDeclaration from "./pages/recette/SaisieDeclaration/SaisieDeclaration";
import PriseEnCharge from "./pages/immatriculation/PriseEnCharge/PriseEnCharge";
import PriseCharge from "./pages/immatriculation/PriseEnCharge/PriseCharge";
import SituationGeographiqueIm from "./pages/immatriculation/PriseEnCharge/SituationGeographique";
import RegimeFiscalIm from "./pages/immatriculation/PriseEnCharge/RegimeFiscal";
import ConsultationImmatriculation from "./pages/immatriculation/consultatioRF/consultationImmatriculation";
import LoginRecette from "./pages/recette/LoginRecette";
import EnregistrementTitre from "./pages/recette/SaisieDeclaration/EnregistrementTitre";
import LoginParametre from "./pages/paramètres/LoginParametre";
import LoginImmatriculation from "./pages/immatriculation/LoginImmatriculation";
import EtatDetailleEncaissement from "./pages/recette/SituationRecettte/EtatDetailleEncaissement";
import DelivranceDuplicataRecepisse from "./pages/recette/SaisieDeclaration/DelivranceDuplicataRecepisse";
import SituationRecetteImpression from "./pages/recette/SituationRecettte/SituationRecetteImpression";
import ConsultationDetailRecette from "./pages/recette/Consulation/ConsultationDetailRecette";

function App() {
  
 
  return (
    <>
    <Router>
      <Routes>
     <Route path="/" element={<LoadingPage />}></Route>  
     <Route path="/login" element={<LoginPage />}></Route>
     <Route path="/menu" element={<MenuPage/>}></Route> 
     <Route path="/SIGRL" element={<Sigrl/>}></Route> 
    
    
     <Route path="/saisiDeclarationRecette" element={<SaisieDeclaration/>}></Route>
     <Route path="/EnregistrementTitre" element={<EnregistrementTitre/>}></Route>
     <Route path="/situationRecette" element={<SituationRecette/>}></Route>
     <Route path="/consultationRecette" element={<ConsultationRecette/>}></Route>
     <Route path="/NIFRecette" element={<NIFRecette/>}></Route>
     <Route path="/ResteRecovreRecette" element={<ResteRecovré/>}></Route>
     <Route path="/utilitaireRecette" element={<UtilitairesRecette/>}></Route>
     <Route path="/EtatDetailleEncaissement" element={<EtatDetailleEncaissement/>}></Route>
     <Route path="/DelivranceDuplicataRecepisse" element={<DelivranceDuplicataRecepisse/>}></Route>
     <Route path="/SituationRecetteImpression" element={<SituationRecetteImpression/>}></Route>
     <Route path="/ConsultationDetailRecette" element={<ConsultationDetailRecette/>}></Route>
     
     

    
     <Route path="/gestion" element={<Gestion/>}></Route>
     <Route path="/SituationNatureImpot" element={<SituationNatureImpot/>}></Route>
     <Route path="/GestionDossier" element={<GestionDossier/>}></Route>
     <Route path="/SituationGeographique" element={<SituationGeographique/>}></Route>
     <Route path="/RegimeFiscal" element={<RegimeFiscal/>}></Route>     
     <Route path="/MJRRegimeFiscalETGestionDossier" element={<MJRRegimeFiscalETGestionDossier/>}></Route>
     <Route path="/ImpressionImpot" element={<ImpressionImpot/>}></Route>
     <Route path="/ConsultationGestion" element={<ConsultationGestion/>}></Route>
     <Route path="/ResteRecouvreGlobal" element={<ResteRecouvreGlobal/>}></Route>
     <Route path="/TitrePerceptio" element={<TitrePerceptio/>}></Route>
     <Route path="/ListeNatureImpot" element={<ListeNatureImpot/>}></Route>
     <Route path="/ResteRecouvrerDeuxDate" element={<ResteRecouvrerDeuxDate/>}></Route>
     <Route path="/ConsultationRecetteDeuxDate" element={<ConsultationRecetteDeuxDate/>}></Route>
     <Route path="/MontantNatureImpot" element={<MontantNatureImpot/>}></Route>
     <Route path="/Defaillant" element={<Defaillant/>}></Route>
     <Route path="/RelanceDefaillant" element={<RelanceDefaillant/>}></Route>
     <Route path="/Listing" element={<Listing/>}></Route>
     <Route path="/TVA" element={<TVA/>}></Route>
     <Route path="/AutreImpot" element={<AutreImpot/>}></Route>
     <Route path="/IRISDA" element={<IRISDA/>}></Route>
     <Route path="/IRSAIRCM" element={<IRSAIRCM/>}></Route>


     <Route path="/immatriculation" element={<Immatriculation/>}></Route> 
     <Route path="/consultatioRF" element={<ConsultationRF/>}></Route>
     <Route path="/utilitaire" element={<Utilitaire/>}></Route>
     <Route path="/MiseAJourRF" element={<MiseAJourRF/>}></Route>
     <Route path="/PriseEnCharge" element={<PriseEnCharge/>}></Route>
     <Route path="/PriseChargeIm" element={<PriseCharge/>}></Route>
     <Route path="/SituationGeographiqueIm" element={<SituationGeographiqueIm/>}></Route>
     <Route path="/RegimeFiscalIm" element={<RegimeFiscalIm/>}></Route>
     <Route path="/ConsultationImmatriculation" element={<ConsultationImmatriculation/>}></Route>



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
     <Route path="/codeFormeJuridique" element={<CodeFormeJuridique/>}></Route>
     <Route path="/codeCollectivite" element={<CodeCollectivite/>}></Route>
     <Route path="/periodiciteImpot" element={<PeriodiciteImpot/>}></Route>
     <Route path="/periodicite" element={<Periodicite/>}></Route>
     <Route path="/obligationFiscal" element={<ObligationFiscal/>}></Route>
     <Route path="/typeProceVerbaux" element={<TypeProceVerbaux/>}></Route>
     <Route path="/operateurTelephonique" element={<OperateurTelephonique/>}></Route>
     
     
     <Route path="/LoginRecette" element={<LoginRecette/>}></Route>
     <Route path="/LoginParametre" element={<LoginParametre/>}></Route>
     <Route path="/LoginImmatriculation" element={<LoginImmatriculation/>}></Route>
     
     
     
      </Routes>
    </Router>
    </>
  );
}

export default App;
