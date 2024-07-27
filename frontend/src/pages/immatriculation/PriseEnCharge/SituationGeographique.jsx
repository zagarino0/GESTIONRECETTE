import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Layout } from './Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../../components/modals/Modal';
import Checkbox from '../../../components/button/Checkbox';
import {  AiOutlineSave } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ImStatsDots } from "react-icons/im";
import { RiArrowGoBackFill, RiDeleteBinLine, RiSubtractFill } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { BiBody } from "react-icons/bi";
import { MdDeleteOutline, MdOpenInBrowser, MdOpenInNew, MdOutlineCached, MdOutlineZoomInMap, MdPermIdentity, MdZoomOutMap } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Select from '../../../components/input/SelectInput';

function SituationGeographiqueIm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  const [Geograph, setGeograph] = useState([]);
  const [Data , setData] = useState([]);
  let navigate = useNavigate();
  const [isModalError, setIsModalError] = useState(false);
  const [isModalSucess, setIsModalSuccess] = useState(false);
  const [add , setAdd] = useState(false);
  const [bool , setBool] = useState({
    Principaux_renseignement : false,
    activite: false,
    siege: false,
    associe: false,
    etablissement: false,
    dirigeant:false,
    vehicule:false,
    interlocuteur:false,
    autre: false
  })

 
  const selectedData = localStorage.getItem("selectedDataPriseEnCharge");
 
  const [ContribuableData, setContribuableData] = useState(
  JSON.parse(selectedData)
);

console.log(ContribuableData);
    const {activite} = ContribuableData ;
    const {siege} = ContribuableData;
    const {actionnaire} = ContribuableData;
    const {etablissement} = ContribuableData;  
    const {dirigeant} = ContribuableData ;
    const {autre} =ContribuableData ;
    const {interlocuteur} = ContribuableData ;
    const {coordonnees} = ContribuableData ;
    const {assujetissement} = ContribuableData ;
   
  useEffect(() => {
    if (referenceFiscal) {
      axios.get(`http://localhost:3500/client/${referenceFiscal}`)
        .then((response) => {
          const data = response.data;
          console.log(data.commune)
          if ( data) {
            // Convert the object values to an array
    ;
           
            setGeograph(data);
            console.log('Data received:', data);
          } else {
            console.error('Invalid data format:', data);
            setIsModalError(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsModalError(true);
        });
    }
  }, [referenceFiscal]);
  
  

  const handlePriseEnCharge = () => {
    // Perform data verification logic here
    if (ContribuableData.reference_fiscal) {
      // Data is verified, set isDataVerified to true
      
  
      // Update the data object with the prise_charge property
      const updatedData = { reference_fiscal : ContribuableData.reference_fiscal , prise_charge: true };
      setData(updatedData);
  
      // Send the updated data to the backend
      axios.post('http://localhost:3500/prisecharge', updatedData)
        .then((response) => {
          // Handle the response from the backend, if needed
         setIsModalSuccess(true);
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
          setIsModalError(true);
        });
    }
  };
  

  const headers = [
    "numero",
    "imposition",
    "date_debut",
    "periodicite",
    "annee",
    "exonere",
    "period_1",
    "period_2",
    "etat",
     "date_exe",
    "date_assujetissement",
    "date fin"

  ];

  const dataAssujetissement = assujetissement ? assujetissement.map((item ) => [
      item.id,
      item.imposition,
      item.date_debut,
      item.periodicite,
      item.annee,
    <Checkbox onChange={()=> window} checked={item.exonere}></Checkbox>,
      item.period_1,
      item.period_2,
      item.etat,
      item.date_exe,
      item.date_assujetissement,
      item.date_fin

  ]) : [];


  // associe Table 
const HeadersAssocie = ["Type association" , "Nom actionnaire" , "Fonction" , " Résident" , "N° CIN ou Passport" , " Adresse Actionnaire" , "Autre activité " , " Référence contribuable " , "Référence fiscal actionnaire" , "Action ou actionnaire" , "associe unique" , "Email actionnaire" , "numéro actionnaire" , "Gérant" , "CIN / Passport Gérant" , "Siege","supprimer" , "modifier"]
const DataAssocie = actionnaire ? actionnaire.map((item  )=>[item.type , item.nom_actionnaire , item.fonction_actionnaire , item.resident_actionnaire , item.cin_passport_actionnaire , item.adresse_actionnaire , item.autre_activite_actionnaire , item.id_contribuable , item.nif_actionnaire , item.action_ou_actionnaire , item.associe_unique_actionnaire, item.email_actionnaire , item.numero_actionnaire , item.gerant  , item.cin_passport_gerant , item.siege , 
]) : [];

 // Etablissement table 
 const Headersetablissement  = ["activité" ,"adresse" , "commune" ,"fokontany" , "district", "province" , "date ouverture", "email" , "fax", "identifiant contribuable" , "nom commercial" ,"proprietaire local" , "region" , "téléphone" , "titre" ]
 const DataEtablissment = etablissement ? etablissement.map((item )=>[item.activite , item.adresse , item.commune , item.fokontany , item.district , item.province ,item.date_ouverture , item.email , item.fax , item.id_contribuable , item.nom_commercial , <Checkbox checked={item.proprietaire_local}></Checkbox> , item.region , item.telephone_1 , item.titre ,
]) : [];

// Table dirigeant
const HeaderDirigent = ["Nom" , "fonction" , "cin" , "passport" , "RF" , "email" , "telephone" ]
const datadirigeant = dirigeant ? dirigeant.map((item)=>[item.nom ,item.fonction , item.cin , item.passport , item.rf , item.email , item.telephone , 
 ]
): [];

const Fokontany = [
  "MANGA",
  "AMBOVOALANANA", 
  "TSARAMANDROSO AMBANY",    
  "TSARAMANDROSO AMBONY",
   "MAHAVOKY SUD",
   "MANJARISOA",
   "MORAFENO",
   "MAHABIBOKELY",
    "ABATTOIR MAROVATO",
    "MANGARIVOTRA",
    "ARANTA",
    "ANTANIMASAJA",
    "MAHATSINJO",
    "TANAMBAO SOTEMA",
     "AMBOHIMANDAMINA",
      "ANTANIMALANDY",
      "AMBONDRONA",
      "FIOFIO",
      "AMBALAVOLA",
      "ANTANAMBAO AMBALAVATO",
      "TSARARANO AMBONY",
     "TSARARANO ANOSIKELY",
      "TSARARANO AMBANY",
      "AMBOROVY",
      "MAHAVOKY NORD",
     
]
     
   const BodyContent = (
       <div className='overflow-x-auto h-[600px]' >
    
    <div className="m-4 mb-4">
       
       <div className="text-white bg-black py-3 px-4 rounded  text-3xl  font-semibold  "> Détails d'un contribuable  : {ContribuableData?ContribuableData.reference_fiscal:""}</div>
<div className="flex flex-col">
<div className="flex items-center justify-center p-2">
 <div className="flex flex-col">

 <div className="flex flex-col  ">
<div className="p-2 mx-4">
 </div>
 <div onClick={()=>setBool({...bool , Principaux_renseignement:true})} className=" w-[750px] text-white    py-3  px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer ">
 <HiOutlineInformationCircle className="text-xl mx-2 font-semibold"></HiOutlineInformationCircle>
 Principaux renseignements
 </div>
 { bool.Principaux_renseignement === true && (
<div className="flex justify-enter bg-black w-full p-4">
<div className=" flex flex-col w-[700px] ">
       <div className="flex justify-between mt-6">
         <Label text=" Raison Social" />
         <Input type="text"
         value={ContribuableData? ContribuableData.raison_social : ""}
        />
       </div>
       <div className="flex justify-between mt-6">
         <Label text="Type" />
         <div className="flex justify-between">
         <p className=" text-white ml-6">
   <input
     type="radio"
     value="Personne physique"
     className='mr-2 '
     checked={  ContribuableData.type === "Personne physique"}
   />
   Personne physique
 </p>
 <p className='text-white ml-4'>
   <input
     type="radio"
     value="Personne morale"
     className='mr-2 text-white'
     checked={ContribuableData.type === "Personne morale"}
   />
   Personne morale
 </p>
         </div>
       </div>
       { ContribuableData.type === "Personne physique" && (
 <div>
   <div className='flex justify-between mt-6 '>
   <Label text="Situation matrimoniale "></Label>
   <Input
     type="text"
     value={ContribuableData ? ContribuableData.situation_matrimoiniale : ""}     
   ></Input>
 </div>
 <div className='flex justify-between mt-6 '>
   <Label text="Sexe "></Label>
   <div className="flex justify-between w-[200px]">
   <Checkbox label="Masculin" checked={ContribuableData.sexe === "Masculin"} onChange={()=>window} ></Checkbox>
   <Checkbox label="Feminin" checked={ContribuableData.sexe === "Feminin"} onChange={()=>window}></Checkbox>
   </div>
 </div>
 <div className='flex justify-between mt-6 '>
   <Label text="Etranger "></Label>
   <div className="flex justify-between w-[200px]">
   <Checkbox label="Oui" checked={ContribuableData.etranger === true} onChange={()=>window} ></Checkbox>
   <Checkbox label="Non" onChange={()=>window} checked={ContribuableData.etranger === false}></Checkbox>
   </div>
 </div>
 { ContribuableData.etranger === false && (
   <>
     <div className='flex justify-between mt-6 '>
   <Label text="CIN"></Label>
   <Input
     type="text" 
     value={ContribuableData?ContribuableData.cin : ""}
   ></Input>
 </div>
   <div className='flex justify-between mt-6 '>
   <Label text="Date de délivrance"></Label>
   <Input
     type="date" 
     value={ContribuableData?ContribuableData.date_de_delivrance_cin : ""}
   ></Input>
 </div>
 <div className='flex justify-between mt-6 '>
   <Label text="Lieu de délivrance"></Label>
   <Input
     type="text"
      value={ContribuableData?ContribuableData.lieu_de_delivrance_cin : ""}     
   ></Input>
 </div>
   </>
 )

 }
   { ContribuableData.etranger === true && (
   <>
     <div className='flex justify-between mt-6 '>
   <Label text="Numéro passport"></Label>
   <Input
     type="text" 
     value={ContribuableData?ContribuableData.numero_passport : ""}
   ></Input>
 </div>
   <div className='flex justify-between mt-6 '>
   <Label text="Date de délivrance"></Label>
   <Input
     type="date" 
     value={ContribuableData?ContribuableData.date_de_delivrance_passeport: ""}
   ></Input>
 </div>

   </>
 )

 }
 <div className='flex justify-between mt-6 '>
   <Label text="Date naissance"></Label>
   <Input
     type="date" 
      value={ContribuableData?ContribuableData.date_de_naissance : ""}    
   ></Input>
 </div>
 <div className='flex justify-between mt-6 '>
   <Label text="Lieu naissance "></Label>
   <Input
     type="text" 
     value={ContribuableData? ContribuableData.lieu_de_naissance : ""}    
   ></Input>
 </div>
 </div>
)}
       <div className="flex justify-between mt-6">
         <Label text="Forme juridique" />
         <Input type="text" 
         value={ContribuableData?ContribuableData.forme_juridique : ""}
         />
       </div>
       <div className="flex justify-between mt-6">
         <Label text="Régime Fiscale" />
         <Input type="text"
         value={ContribuableData? ContribuableData.regime_fiscal : ""}
       
         />
       </div>
       <div className="flex justify-between mt-6">
         <Label text="Date de Création" />
         <Input type="date"
         value={ContribuableData? ContribuableData.date_creation : ""}
         />
       </div>
       <div className="flex justify-between mt-6">
         <Label text="Capital en Ar" />
         <Input type="text"
         value={ContribuableData? ContribuableData.capital : ""}
         />
       </div>
       <div className='flex justify-between mt-6 '>
   <Label text="RIB "></Label>
   <div className="flex justify-between w-[300px]">
   <Checkbox label="Disponible" onChange={()=>window} checked={ContribuableData.RIB === "Disponible"}></Checkbox>
   <Checkbox label="Pas encore" onChange={()=>window} checked={ContribuableData.RIB === "Pas encore"}></Checkbox>
   </div>
   
 </div>
 <div className="flex justify-between mt-6">
         <Label text="Compte bancaire" />
         <Input type="text"
         value={ContribuableData? ContribuableData.numero_compte_bancaire : ""}

         />
       </div>
       <div className="flex justify-between"> 
       
       <button onClick={()=> setBool({...bool , Principaux_renseignement: false})}  className="border-[2px] mt-6 mb-6 w-40 p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>
       </div>
   </div>
</div>
 )

 }

 <div  onClick={()=>setBool({...bool , activite:true })} className="w-full w-[750px] text-white  py-3 px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer ">
 <ImStatsDots className="text-xl mx-2"></ImStatsDots>
 Activités
 </div>
 { bool.activite === true  && (
   <div className="flex justify-center">
     <div className="flex flex-col bg-black w-[750px] p-4">
     <div className="flex justify-between mt-6">
           <Label text="Activités " />
           <Input type="text" 
         value={activite ?activite.activite:""}
             />
         </div>
         
  
   <div>
     <div className='flex justify-between mt-6 '>
     <Label text="Précision sur les activités "></Label>
     <Input
       type="text" 
          value={activite ? activite.precision_activite: ""}
         
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Numéro d'identification Fiscal"></Label>
     <Input
       type="text" 
          value={activite ? activite.nif: "" }
         
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Numéro statistique "></Label>
     <div className="flex flex-col">
     <div className="flex justify-between w-[300px]">
     <Checkbox label="Disponible" onChange={()=>window} checked={activite.statistique === true} ></Checkbox>
     <Checkbox label="Pas encore Disponible" onChange={()=>window} checked={activite.statistique === false} ></Checkbox>
     </div>
     { activite.statistique === true && (
       <Input
       type="text"
       value={activite.numero_statistique}
      
       className="mt-2"     
     ></Input>
     )
     }
     </div>
   </div>
 
   <div className='flex justify-between mt-6 '>
     <Label text="Date de délivrance statistique "></Label>
     <Input
       type="date"
       value={activite ? activite.date_delivrance_statistique : ""}
      
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Registre de commerce"></Label>
     <Input
       type="text"
        value={activite ? activite.registre_commerce : ""}
       
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Date de registre de commerce"></Label>
     <Input
       type="date"  
        value={activite ? activite.date_registre_commerce : ""}
         
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Début de l'exercice comptable  "></Label>
     <Input
       type="date"
        value={activite ? activite.debut_exercice : ""}
      
     ></Input>
   </div>
   </div>
 
         <div className="flex justify-between mt-6">
           <Label text="Clôture de l'exercice comptable" />
           <Input type="date" 
            value={ activite ?activite.cloture_exercice : ""}
           
           />
         </div>
    
         <div className="flex justify-between mt-6">
           <Label text="Nombre salarié" />
           <Input type="text"
           value={activite?activite.nombre_salarie : ""}
           
            />
         </div>
<div className="flex justify-between">
<button onClick={()=> setBool({...bool , activite: false})}  className="border-[2px] mt-6 mb-6 w-40 p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>

 </div>   
     </div>
         </div>
 )

 }
 <div onClick={()=> setBool({...bool , siege: true})} className=" text-white w-[750px] py-3 px-4  flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer  ">
 <FaUniversity className="text-xl  mx-2"></FaUniversity>
 Siège
 </div>
 { bool.siege === true && (
   <div className=" flex justify-center ">
   <div className="flex flex-col bg-black w-[750px] p-4  w-[620px] ">
   <div className="flex justify-between  mt-6">
           <Label text="Adresse actuelle (siège) " />
           <Input type="text" 
           value={siege?siege.adresse_actuel : ""}
           
           />
         </div>
         
  
   <div>
     <div className='flex justify-between mt-6 '>
     <Label text="Fokontany"></Label>
     <Select
       options={Fokontany.map((option) => ({ value: option, label: option }))}   
       value={ siege ? siege.fokontany : ""}
       
       className=""
     />
   </div>
  
   <div className='flex justify-between mt-6 '>
     <Label text="Commune "></Label>
     <Input
       type="text"
       value={siege.commune = "MAHAJANGA I"}
       
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="District "></Label>
     <Input
       type="text"     
       value={siege.district = "MAHAJANGA"}
       
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Région"></Label>
     <Input
       type="text"     
       value={siege.region = "BOENY"}
       
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Province "></Label>
     <Input
       type="text" 
       value={siege.province = "MAHAJANGA "}
       
     ></Input>
   </div>
   <div className="flex justify-between">      

   <button onClick={()=> setBool({...bool , siege: false})}  className="border-[2px] mt-6 mb-6 w-40 p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>
   </div>
   </div>
   </div>

   </div>
 )
 }

{ ContribuableData.type === "Personne morale" ? (
 <>
<div onClick={()=>setBool({...bool , associe:true })} className="text-white  w-[750px] py-3  px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer w-full">
 <BiBody className="text-xl mx-2"></BiBody>
 Associé
 </div>
 { bool.associe === true && (
   <div className="flex justify-center w-[750px]  bg-black  p-4">
     <div className="flex flex-col " >
     { add === true && ( 
           <div className=" flex justify-center">
<div className="flex flex-col">
<div className='flex justify-between mt-6 '>
   <Label text="Type d'associés / Actionnaires"></Label>
   <div className="flex justify-between ">
   </div>
 </div>
 
     
</div>
           </div>
          )}
         
{ add === false  && (
 
 <div className="flex justify-center " >
  <div className="flex flex-col">
  
   <div className=" overflow-y-auto w-[700px] mt-6 overflow-y-auto">
 <Table

headers={HeadersAssocie}
data={DataAssocie}
></Table>
</div>
<div className="flex justify-center mt-6 mb-6">



</div>
<div className="flex justify-between">
 
<button onClick={()=> setBool({...bool , associe: false})}  className="border-[2px] mt-6 mb-6 w-40 p-2 rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>
</div>
  </div>

</div>
)} 
     </div>
    
   </div>
 )

 }
 </>
):(
<>
</>
)
}

{ ContribuableData.type === "Personne morale" ? (
 <>
 <div onClick={()=> setBool({...bool , etablissement: true})} className=" w-[750px] text-white py-3 px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer w-full">
 <FaUniversity className="text-xl mx-2"></FaUniversity>
 Etablissement
 </div>
 { bool.etablissement === true && (
   <div className="flex justify-center bg-black w-[750px] p-4">
    <div className="flex flex-col">
    { add === true && ( 
           <div className="p-4">
 
 
   <>
   
   </>

   
         
         <div className="flex justify-center mt-6">
         {/* <button onClick={HandleModifieEtablissement} className="border-[2px] p-2 border-black rounded hover:bg-black/70 hover:text-white flex flex-row"><AiOutlineSave className="text-2xl mr-2"></AiOutlineSave> Sauver</button> */}
         <button onClick={()=> setAdd(false)}  className="border-[2px] ml-4 p-2 border-black rounded hover:bg-black/70 hover:text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Annuler</button>
         </div>
           </div>
          )}
         
{ add === false  && (
 
 <div className="flex justify-center p-4 " >
  
  <div className="flex flex-col">
  <div className=" mt-6 overflow-y-auto w-[650px] ">
 <Table
headers={Headersetablissement}
data={DataEtablissment}
// onClick={handleSelectedDataTableEtablissment}
// selectedRowIndex={selectedRowIndexEtablissement}
></Table>
</div>
<div className="flex justify-center mt-6">

</div>
<button onClick={()=> setBool({...bool , etablissement: false})}  className="border-[2px] mt-6 mb-6 w-40 p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>
  </div>
</div>
)} 
    </div>
   </div>
 )
 }
 </>
) : (
 <>
 
 </>
)

}


{ ContribuableData.type === "Personne morale" ?(
 <>
 <div onClick={()=> setBool({...bool , dirigeant: true})} className=" py-3 w-[750px] text-white px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer w-full">
 <MdPermIdentity className="text-xl mx-2"></MdPermIdentity>
 Dirigant
 </div>
 { bool.dirigeant=== true && (
   <div className=" bg-black w-[750px] p-4">
   { add === true && ( 
         <div>


 <>
   
 </>

 
       
       <div className="flex justify-center mt-6">
       {/* <button onClick={HandleModificationDirigeant} className="border-[2px] p-2 border-black rounded hover:bg-black/70 hover:text-white flex flex-row"><AiOutlineSave className="text-2xl mr-2"></AiOutlineSave> Sauver</button> */}
       <button onClick={()=> setAdd(false)}  className="border-[2px] ml-4 p-2 border-black rounded hover:bg-black/70 hover:text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Annuler</button>
       </div>
         </div>
        )}
       
{ add === false  && (

<div  className="">
  
 <div className="w-[650px] p-4 mt-6 overflow-y-auto flex justify-center">
<Table
headers={HeaderDirigent}
data={datadirigeant}
// onClick={handleSelectedDataTableDirigeant}
// selectedRowIndex={selectedRowIndexDirigeant}
></Table>
</div>
<div className="flex justify-center mt-6">


</div>
<button onClick={()=> setBool({...bool , dirigeant: false})}  className="border-[2px]  mt-6 mb-6 w-40 p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/> Fermer</button>
</div>
)} 
   </div>
 )

 }
 </>
)
: 
(
 <>

 </>
)

}


{
  
 ContribuableData.type === "Personne morale"  ?
(
<>
<div onClick={()=> setBool({...bool , interlocuteur: true})} className=" w-[750px] text-white  py-3  px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer w-full">
 <IoIosPerson className="text-xl mx-2"></IoIosPerson>
 Interlocuteur
 </div>
 { bool.interlocuteur === true && (
   <div className="flex  bg-black  p-4">
    
     <div  className="flex flex-col w-[750px]">
     <div className="flex justify-between mt-6">
           <Label text="Nom " />
           <Input type="text"
            value={interlocuteur.nom_interlocuteur}
            />
         </div>
         
  
   <div>
     <div className='flex justify-between mt-6 '>
     <Label text="Titre"></Label>
     <Input
       type="text"
       value={interlocuteur.titre_interlocuteur}
       ></Input>
   </div>
  
   <div className='flex justify-between mt-6 '>
     <Label text="Adresse  "></Label>
     <Input
       type="text" 
       value={interlocuteur.adresse_interlocuteur}
              
     ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="Téléphone "></Label>
     <Input
       type="text" 
       value={interlocuteur.telephone_interlocuteur}
          ></Input>
   </div>
   <div className='flex justify-between mt-6 '>
     <Label text="E-mail"></Label>
     <Input
       type="text"
       value={ interlocuteur.email_interlocuteur}
       
     ></Input>
   </div>
   <div className="flex mt-6">
       {/* <button  onClick={HandleModifieInterlocuteur} className="border-[2px] p-2 border-black rounded hover:bg-black/70 hover:text-white flex flex-row"><AiOutlineSave className="text-2xl mr-2"></AiOutlineSave>Modifier</button> */}
       <button onClick={()=> setBool({...bool , interlocuteur : false})}  className="border-[2px]  py-2 px-6  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/>Fermer</button>
       </div>
   </div>
     </div>
  
   </div>
 )

 }

</>

) :
(
 <>
 </>

)

}

<>
<div onClick={()=> setBool({...bool , autre: true})} className=" w-[750px] text-white    py-3  px-4 flex flex-row shadow-xl border-[1px] font-semibold cursor-pointer w-full">
 <MdOutlineCached  className="text-xl mx-2"></MdOutlineCached >
 Autre
 </div>
 { bool.autre === true && (
  <div className="bg-black  p-4">

<div className="flex justify-center w-full h-full ">
     <div className="flex flex-col w-[500px]">
               <div className="flex justify-between mt-6">
           <Label text="M'envoyer par e-mail les informations saisies " />
     <div className="flex justify-between w-[300px]">
   <Checkbox label="Oui" onChange={()=> window} checked={autre.information_mail === true }></Checkbox>
   <Checkbox label="Non" onChange={()=> window} checked={autre.information_mail === false}></Checkbox>
   </div>
   </div>
   <div className="flex justify-between mt-6">
           <Label text="Votre exerice dépasse t-il 12 mois ? " />
     <div className="flex justify-between w-[300px]">
   <Checkbox label="Oui(18 mois)" onChange={()=> window} checked={autre.depassement_12_mois === true}></Checkbox>
   <Checkbox label="Non(12 mois)" onChange={()=> window} checked={autre.depassement_12_mois === false}></Checkbox>
   </div>
   </div>
   <div className="flex justify-between mt-6">
           <Label text="Je certifie que ces renseignements sont complets et exacts " />
     <div className="flex justify-between w-[300px]">
   
   <Checkbox onChange={()=> window} checked={autre ? autre.certification : "" }></Checkbox>
   </div>
   </div>

       
      
     </div>
     </div>
   <div className="flex  mt-6">
      
       <button onClick={()=> setBool({...bool , autre : false})}  className="border-[2px]  p-2  rounded bg-black/70 text-white flex flex-row"><RiArrowGoBackFill  className="text-2xl mr-2"/>Fermer</button>
       </div>
   
   </div>
 )

 }

</>


</div>
 </div>
</div>

<div className="flex flex-col mt-4 rounded h-[500px] p-4">
<div className="flex flex-row">

<Label text={`régime d'imposition :`} className="ml-4"></Label>

</div>

<div className="  mt-6 overflow-y-auto h-[400px]">
 <Table
 // onClick={handleTableRowClickEntries}
 // selectedRowIndex={selectedRowIndexEntries}
headers={headers}
data={dataAssujetissement}
></Table>
</div>
</div>

<div className="flex flex-col  mt-4 rounded h-[220px] p-4">
<Label text={`Coordonnées géographique :`} className="ml-4"></Label>
<div className="mt-6 flex flex-row justify-between ">
<Label text="Longitude" className="mt-4"></Label>
<Input type="text" className="w-96  "
value={coordonnees ? coordonnees.longitude : ""}

></Input>
</div>
<div className="mt-6 flex flex-row justify-between ">
<Label text="Laltitude" className="mt-4"></Label>
<Input type="text" className="w-96  "

value={coordonnees ?coordonnees.latitude : ""}

></Input>
</div>

</div>

</div>


 
   </div>


     <div className='mt-6 '>
   
         <div className='flex mt-2 justify-end mr-4'>      
           <Button type="submit" children="Prise en Charge" onClick={handlePriseEnCharge} ></Button>
         </div>
         </div>
 
       </div>
     )
     return (
       <div  className='bg-[#212122] h-screen w-screen'>
        <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
        <Modal isOpen={isModalError} onClose={()=> setIsModalError(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Il y a une erreur" className="text-xl"></Label>
<Button children="OK"  onClick={()=> setIsModalError(false)} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isModalSucess} onClose={()=> setIsModalSuccess(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Donné prise en charge" className="text-xl"></Label>
<Button children="OK"  onClick={()=> navigate("/PriseChargeIm")} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
       </div>
     )
}

export default SituationGeographiqueIm