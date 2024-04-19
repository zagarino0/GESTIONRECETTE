import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import ReactSelect from 'react-select';
import Checkbox from '../../../components/button/Checkbox'
import Modal from '../../../components/modals/Modal'
import Table from '../../../components/table/Table'
import axios from 'axios'
import SearchInput from '../../../components/input/SearchInput'
import PasswordInput from '../../../components/input/PasswordInput'
import { ModalError, ModalErrorServer } from '../../immatriculation/Modal'

function EnregistrementTitre() {
  const [isModalImpot , setIsModalImpot] = useState(false)
  const [DataImpot , setDataImpot] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndexCodeBanque, setSelectedRowIndexCodeBanque] = useState(null);
  const [selectedRowIndexCodeFokontany, setSelectedRowIndexCodeFokontany] = useState(null);
  const [DataCodeFokontanySelect , setDataCodeFokontanySelect] = useState([]);
  const [DataSelected , setDataSelected] = useState([]);
  const [searchTerm ,setSearchTerm] = useState([]);
  const [Client , setClient] = useState([])
  const [searchClient , setSeacrchClient] = useState([])
  const [CodeBanque , setCodeBanque] = useState([]);
  const [ModalCodeBanque , setModalCodeBanque] = useState(false)
  const [selectCodeBanque , setSelectCodeBanque] = useState([])
  const [ModalLoginPriseCharge , setModalPriseCharge] = useState(false);
  const [ModalMAJRF , setModalMAJRF] = useState(false);
  const [ModalFokontany , setModalFokontany] = useState(false);
  const [DataCodeFokontany , setDataCodeFokontany] = useState([]);
  const [TypePrev , setTypePrev] = useState([]);
  const [isModalError, setIsModalError] = useState(false);
  const [isModalErrorServer, setIsModalErrorServer] = useState(false);
  
  const [isModalErrorPriseEnCharge, setIsModalErrorPriseEnCharge] = useState(false);
  const [isModalSucessPriseEnCharge, setIsModalSuccessPiseEnCharge] = useState(false);
  const [ModalLogin , setModalLogin] = useState(false);
  const [searchPriseEnCharge, setSearchPriseEnCharge] = useState('');
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);



useEffect(() => {
  if (searchPriseEnCharge) {
    setIsLoading(true);
    // Effectuer une requête API en utilisant Axios
    axios.get(`http://localhost:3500/client/${searchPriseEnCharge}`)
      .then((response) => {
        setData(response.data);
        console.log(data)
      setIsLoading(false);
     
      })
      .catch((error) => {
        console.error(error);
      });
  }

}, [searchPriseEnCharge , data]);

const handlePriseEnCharge = () => {
  // Perform data verification logic here
  if (searchPriseEnCharge) {
    // Data is verified, set isDataVerified to true
    

    // Update the data object with the prise_charge property
    const updatedData = { reference_fiscal : searchPriseEnCharge , prise_charge: true };

    // Send the updated data to the backend
    axios.post('http://localhost:3500/prisecharge', updatedData)
      .then((response) => {
        // Handle the response from the backend, if needed
       setIsModalSuccessPiseEnCharge(true);
      })
      .catch((error) => {
        console.error('Error sending verification data:', error);
        setIsModalErrorPriseEnCharge(true);
      });
  }
};


  // Value of Enregistement déclaration
  const [value , setValue] = useState(
  {
    numero_impot : "",
    annee: "",
    montant_a_payer:"",
    montant_verser : "",
    reste_a_payer : "",
    type_payment: "",
    numero_cheque : "",
    code_banque : "",
    numero_recepisse : "",
    periode : "",
    transporteur : false,
    periode1 : "",
    periode2 : "",
    reference_fiscal : "",
    mode_de_payement : "",
    immatriculation_vehicule: "",
    raison_social: "",
    nom_commercial : "",
    adresse : "",
    commune:"",
    nom_commercial_banque : "",
    rib: "",
    date_cloture_exercice: "",
    type_prev:"",
    amende_penalite:""
  }
  );



// Fonction pour faire un  recherche d'un client avec référence fiscal
const handleSearchClient = async () => {
  const baseUrl = 'http://localhost:3500/consultation';

  try {
   
      const reference_fiscal = { "reference_fiscal" : searchClient}
      const response = await axios.post(`${baseUrl}/nif`, reference_fiscal);
      setClient(response.data);
     
    console.log(Client)
   
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  if (searchClient === "4000000"){
    setModalMAJRF(true)
  }
};

  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
    Enregistrement des titres de recette ou des déclarations
        </div>
        <div>
          <BackButton to="/saisiDeclarationRecette"></BackButton>
        </div>
    </div>
      )

      //Modal Content Impot 
    const navbarModalImpot = (
      <>
      <Label text="Des impôts " className="font-bold"></Label>
      </>
    )
//Modal navbar content Code Banque 
const navbarModalCodeBanque = (
  <>
  <Label text="Code Banque " className="font-bold"></Label>
  </>
)

// Modal navbar Prise en charge 
const NavbarModalPriseEnCharge = (
  <>
  <Label text="Prise en charge" className="font-bold"></Label>
  </>
  )
    //Data code impot include in the Table  
    useEffect(() => {
 
      // Récupérer les données depuis le backend
      axios.get('http://localhost:3500/code/impot')
        .then((response) => setDataImpot(response.data))
        .catch((error) => console.error(error));
    }, []);

    
  const headerContentTable = ["N ° Impot" ,"Libellé" ,"Abrev" ,"PCOP","N° Budget","N° Classe" , "Chapitre" , "Groupe d'impot" ];
  const dataContentTable = DataImpot.map(item => [item.numero_impot, item.libelle , item.abreviation , item.pcop , item.numero_budget , item.numero_classes , item.chapitre , item.groupe_impot ]);
 
  const handleTableRowClick = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    // Update input fields or perform other actions based on the selected row data
    const selectedRowData = DataImpot[rowIndex];
   setDataSelected(selectedRowData)
    setIsModalImpot(false);
  };
  
  const handleTableRowClickCodeBanque = (rowIndex) => {
    setSelectedRowIndexCodeBanque(rowIndex);
    // Update input fields or perform other actions based on the selected row data
    const selectedRowDataCode = CodeBanque[rowIndex];
   setSelectCodeBanque(selectedRowDataCode)
    setModalCodeBanque(false);
  };

//Data select code fokontany
const handleTableRowClickCodeFokontany = (rowIndex) => {
  setSelectedRowIndexCodeFokontany(rowIndex);
  // Update input fields or perform other actions based on the selected row data
  const selectedRowDataCode = DataCodeFokontany[rowIndex];
 setDataCodeFokontanySelect(selectedRowDataCode)
  setModalFokontany(false);
};


  useEffect(() => {
    // Récupérer les données depuis le backend avec le terme de recherche
    axios.get(`http://localhost:3500/code/impot/${searchTerm}`)
      .then((response) => setDataSelected(response.data))
      .catch((error) => console.error(error));
  }, [searchTerm]);
  

  // code banque select

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/banque')
      .then((response) => setCodeBanque(response.data))
      .catch((error) => console.error(error));
  }, []);

  const HeaderCodeBanque= ["numéro", "Raison social", "Nom commercial"];
  const DataCodeBanque = CodeBanque.map(item => [item.id, item.raison_social, item.nom_commercial]);

  // Fonction Modal Fokontany 

  useEffect(() => {
   
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/geographique')
      .then((response) => setDataCodeFokontany(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headerFokontany = [  "Arrondissement ","Code Fokontany","Fokotany"];
  const formattedDataFokontany = DataCodeFokontany.map((item) => [
    
    item.arrondisement,
    item.fokontany,
    item.libelle
  
  ]);

  const ModalNavbarCodeFokontany = (
    <>
    <Label text="Code Fokontany " className="font-bold"></Label>
    </>
  )
 

  // Get data from bakend type Proces verbeaux
  
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
      .then((response) => setTypePrev(response.data))
      .catch((error) => console.error(error));
  }, []);

  // login modal immatirculation
  const [code, setCode] = useState('');
  const [mdp, setMdp] = useState('');


  
  const handleLogin = () => {
    // Replace with your API endpoint for user authentication
    const apiUrl = 'http://localhost:3500/user/auth';

    // Create a request body with user input
    const requestBody = {
      "code": code,
      "mdp": mdp,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        const userData = response.data;
        console.log(userData)
        // Check if the user is authenticated and has immatriculation_prise_charge set to true
        if (userData.login && userData.immatriculation_prise_charge) {
          // Redirect to the desired page if the condition is met
          
          setModalLogin(false);
          
          setMdp('');
          setCode('');
          
          
           // Call createWindow function here
    window.open('http://localhost:3000/PriseEnCharge' )
        } else {
          setIsModalError(true);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
       
        setIsModalErrorServer(true);
      });
  };



  const GenerateNumeroRecepisse = () =>{

    const reference_fiscal = data.contribuables.length === 0 ? 1 : data.contribuables[data.contribuables.length - 1].id + 1;
    const nombre_zero = (data.contribuables.length < 10) ? '00000000000' : ((data.contribuables.length >= 10 && data.contribuables.length < 100) ? '0000000000' : ((data.contribuables.length >= 100 && data.contribuables.length < 1000) ? '000000000' : ((data.contribuables.length >= 1000 && data.contribuables.length < 10000) ? '00000000' : ((data.contribuables.length >= 10000 && data.contribuables.length < 100000) ? '0000000' : ((data.contribuables.length >= 100000 && data.contribuables.length < 1000000) ? '000000' : ((data.contribuables.length >= 1000000 && data.contribuables.length < 10000000) ? '00000' : ((data.contribuables.length >= 10000000 && data.contribuables.length < 100000000) ? '0000' : ((data.contribuables.length >= 100000000 && data.contribuables.length < 1000000000) ? '000' : ((data.contribuables.length >= 1000000000 && data.contribuables.length < 10000000000) ? '00' : ((data.contribuables.length >= 10000000000 && data.contribuables.length < 100000000000) ? '0' : ''))))))))));

    const valeur_reference = nombre_zero + "" + reference_fiscal;
    
    return valeur_reference;
  }

  const [Enregistement , setEnregistrement] = useState({})
  // Immatriculation prise en charge 

  const handleEnregistrementDecl = () => {
    // Perform data verification logic here
    if (searchClient === "4000000") {
      // Data is verified, set isDataVerified to true
      
  
      // Update the data object with the prise_charge property
      const ValueEnregistrement = {
        
        "nif_regisseur":searchClient,
         "numero_impot": value.numero_impot ,
         "raison_social" : value.raison_social,
         "nom_commercial": value.nom_commercial,
         "adresse" : value.adresse,
         "commune": value.commune,
         "montant_a_payer": value.montant_a_payer,
         "montant_verser": value.montant_verser,
         "reste_a_payer": value.montant_verser,
         "type_payment" : value.type_payment,
         "numero_cheque": value.numero_cheque,
         "code_banque": value.code_banque,
         "nom_commercial_banque": value.nom_commercial_banque,
         "rib": value.rib,
         "transporteur" : value.transporteur,
         "numero_recepisse": GenerateNumeroRecepisse(),
         "annee": value.annee ,
         "periode": value.periode,
         "periode1": value.periode1,
         "periode2": value.periode2,
         "date_cloture_exercice": value.date_cloture_exercice,
         "amende_penalite": value.amende_penalite
      };
      
      // Send the updated data to the backend
      axios.post('http://localhost:3500/recette/declarationnonperiodique', ValueEnregistrement)
        .then((response) => {
         setEnregistrement(response.data)
         console.log(Enregistement);         // Handle the response from the backend, if needed
       alert("Enregistre de déclaration réussi")  
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
          setIsModalError(true);
        });
    }

   else if (searchClient) {
      // Data is verified, set isDataVerified to true
      // Update the data object with the prise_charge property
      const ValueEnregistrementPeriodique = {
    "numero_impot": value.numero_impot,
    "annee" : value.annee,
    "montant_a_payer":value.montant_a_payer,
    "montant_verser": value.montant_a_payer,
    "reste_a_payer": value.reste_a_payer,
    "type_payment":value.type_payment,
    "numero_cheque": value.numero_cheque,
    "code_banque": value.code_banque,
    "numero_recepisse": value.numero_recepisse,
    "periode":value.periode,
    "transporteur":value.transporteur,
    "periode1": value.periode1,
    "periode2":value.periode2,
    "reference_fiscal": value.reference_fiscal,
    "abbreviation_type_payment": value.type_payment
      };
      
      // Send the updated data to the backend
      axios.post('http://localhost:3500/recette/declarationperiodique', ValueEnregistrementPeriodique)
        .then((response) => {
        setEnregistrement(response.data);       // Handle the response from the backend, if needed
        alert("Enregistre de déclaration réussi")  
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
          setIsModalError(true);
        });
    }
  };
  
const [valueNonPeriodique , setValueNonPeriodeique] = useState({
  raison_social: "",
  nom_commercial:"",
  fokontany : "",
  adresse : "",
  CIN : "",
  Motif: ""
})
  
  return (
    <div className='bg-[#212122] h-full w-full p-4'>
     <Navbar content={NavbarContent}></Navbar>
     <div className='p-2 flex justify-between'>
      <div className='flex flex-row'>
      <Button children="Prise en charge"  onClick={()=>setModalPriseCharge(true)}></Button>
      <Button children="N° impot" className="ml-2" onClick={()=> {setIsModalImpot(true);
      setSearchTerm("")
      }}></Button>
      <Button children="Attribution ou Mise à jour RF" onClick={()=> setModalLogin(true)} className="ml-2"></Button>
      <SearchInput type="text" placeholder="Référence fiscal"
value={searchClient}
onChange={(e)=> setSeacrchClient(e.target.value)}
 onSearch={handleSearchClient}
 className="ml-2"
></SearchInput> 
</div>
      <div className='flex flex-row'>
       <Label text="Numéro"></Label>
       <ReactSelect className='ml-2'></ReactSelect>
      </div>
     </div>
     <div className='p-2 flex justify-between'>
       <div className="flex flex-row">
      <Label text="N° impot"></Label>
      <Input type="text" className=" ml-2" 
       value={searchTerm || DataSelected? DataSelected.numero_impot:""  }
       onChange={(e) => {
        // Update the search term and trigger the search
        setSearchTerm(e.target.value);
        
        // Validate if the input is a number before updating the state
        if (!isNaN(e.target.value)) {
          setDataSelected((prevData) => ({
            ...prevData,
            numero_impot: e.target.value,
          }));
        }
      }}
      ></Input>
      <ReactSelect 
       options={TypePrev.map((item) => ({
        value: item.type_prevision,
        label: item.type_prevision,
      }))}
       className='ml-2'></ReactSelect>
       </div>
       <div className="flex flex-row">
       <Input type="text"
        value={value.annee}
        onChange={(e)=> setValue({...value , annee : e.target.value })}
       ></Input>
      <Label text="Année concerné" className="ml-2"></Label>
      <Input type="text"  className="ml-2"
      value={value.periode}
      onChange={(e)=> setValue({...value , periode : e.target.value })}
      ></Input>
      <Label text="Période" className="ml-2"></Label>
      <Input type="text" value={value.periode1}
      onChange={(e)=>setValue({...value , periode1 : e.target.value})}
      className="ml-2"></Input>
        <Input type="text" value={value.periode2}
      onChange={(e)=>setValue({...value , periode2 : e.target.value})}
      className="ml-2"></Input>
       </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex flex-row'>
      <div className='flex flex-col'>
      <Label text="Numéro impot" className="font-bold"></Label>
      <Label text={DataSelected? DataSelected.numero_impot:"" === value.numero_impot} className="mt-2"></Label>
      </div>
      <div className='ml-4 flex flex-col'>
      <Label text="type impot"  className="font-bold"></Label>
      <Label text={DataSelected ? DataSelected.libelle : "" } className="mt-2"></Label>
      </div>
     </div>
     <div className='flex flex-row'>
      <Label text="Transporteur"></Label>
      <Checkbox className="ml-2" 
      checked={value.transporteur }
      onChange={(checked)=>setValue({...value , transporteur :  checked} )}
      ></Checkbox>
      { value.transporteur  ? (
        <Input type="text"
        value={value.immatriculation_vehicule}
        onChange={(e)=>setValue({...value , immatriculation_vehicule : e.target.value})}
        className="ml-2 h-10" placeholder="IM vehicule..."></Input>
      ) : <div></div> }
     </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="RF"></Label>
    <Input type="text" value={Client? Client.reference_fiscal: ""} 
     onChange={(e) => {
      
      // Validate if the input is a number before updating the state
      if (!isNaN(e.target.value)) {
        setClient((prevData) => ({
          ...prevData,
          reference_fiscal: e.target.value,
        }));
      }
    }}
    ></Input>
     </div>
    <Input type="text" ></Input>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Raison social"></Label>
    <Input type="text" value={Client? Client.raison_sociale : "" === value.raison_social} ></Input>
     </div>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Nom commercial"></Label>
    <Input type="text" value={Client? Client.nom_commerciale : "" === value.nom_commercial}></Input>
   
     </div>
    <div className="flex justify-between w-[500px]">
    <Label text="Commune" className="ml-2"></Label>
    <Input type="text" value={Client? Client.commune : ""=== value.commune} ></Input>
    </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Adresse"></Label>
    <Input type="text" value={Client? Client?.adresse : "" === value.adresse} ></Input>
     </div>
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant versé"></Label>
    <Input type="text" 
    value={value.montant_verser}
    onChange={(e)=> {setValue({...value , montant_verser : e.target.value})}}
    ></Input>
     </div>
     </div>
       <div className="p-2 flex justify-between">
    
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant à Payer"></Label>
    <Input type="text" 
    value={value.montant_a_payer}
    onChange={(e)=>setValue({...value , montant_a_payer : e.target.value})}
    ></Input>
     </div>
     </div>
       <div className="p-4 bg-black flex justify-center rounded  mt-4 mb-4">
   <Label text="Mode de Règlement" className="text-center text-lg font-bold"></Label>
     </div>
    <div className='flex justify-between mr-4 ml-4 mt-2'>
    <div className='flex flex-col '>
      <div className='flex justify-between w-[500px]'>
      <Checkbox label="Espèce" checked={value.mode_de_payement === "E"} onChange={()=>setValue({...value , mode_de_payement : "E"})}></Checkbox>
      <Checkbox label="Chèque" checked={value.mode_de_payement === "C"}  onChange={()=>setValue({...value , mode_de_payement : "C"})}></Checkbox>      
      <Checkbox label="Virement" checked={value.mode_de_payement === "V"} onChange={()=>setValue({...value , mode_de_payement : "V"})}></Checkbox>
      <Checkbox label="Dépot" checked={value.mode_de_payement === "D"} onChange={()=>setValue({...value , mode_de_payement : "D"})}></Checkbox>
      </div>
      <div className='flex flex-col mt-2'>
      <Checkbox label="Autre" checked={value.mode_de_payement === "A"} onChange={()=>setValue({...value , mode_de_payement : "A" })} ></Checkbox>
      <Checkbox label="Tresor" checked={value.mode_de_payement === "T"} onChange={()=>setValue({...value , mode_de_payement : "T" })} className="mt-2"></Checkbox>
      <Checkbox label="Mobile Banky" checked={value.mode_de_payement === "M"} onChange={()=>setValue({...value , mode_de_payement : "M" })} className="mt-2"></Checkbox>
      </div>
     </div>
    
    <div className='w-[500px] flex flex-col'>
    <div className='flex justify-between '>
      <Label text="Code banque"></Label>
      <SearchInput type="text" placeholder="Code banque"
      value={selectCodeBanque ? selectCodeBanque.id : ""  === value.code_banque}
      onChange={(e)=>{setValue({...value , code_banque : e.target.value})}}
onSearch={()=> setModalCodeBanque(true)}
     ></SearchInput>
    </div>
    
    <div className='flex justify-between mt-2'>
      <Label text="Nom commercial de la banque"></Label>
      <Input type="text" className="w-[210px]" value={ selectCodeBanque ? selectCodeBanque.nom_commercial : "" === value.nom_commercial_banque }></Input>
    </div>
    <div className='flex justify-between mt-2'>
      <Label text="Numéro chèque"></Label>
      <Input type="text" 
      value={value.numero_cheque}
      onChange={(e)=>{setValue({...value , numero_cheque : e.target.value})}}
      className="w-[210px]"></Input>
    </div>
   
    </div>
    </div>
    <div className='mr-4 ml-4 mt-2  flex justify-between'>
     <Button type="submit" children="Nouveau"></Button>
     <Button type="submit" onClick={handleEnregistrementDecl} children="Enregistrer"></Button>
     <Button type="submit" children="Mise à jour"></Button>
     <Button type="submit" children="Valider Modification"></Button>
     <Button type="submit" children="Visualisation"></Button>
    </div>
    <Modal isOpen={isModalImpot} onClose={()=> setIsModalImpot(false)} className=" w-[1000px] h-[550px]" >
      <Navbar content={navbarModalImpot}></Navbar>
      <div className=' flex justify-center p-4'>
      <Table headers={headerContentTable} data={dataContentTable}  classTable="overflow-y-auto " 
     onClick={handleTableRowClick}
      selectedRowIndex={selectedRowIndex}
      
      ></Table>
      </div>
      <div className='flex justify-end p-4'>
     <Button children="Quitter" onClick={()=> setIsModalImpot(false)}></Button>
      </div>
    </Modal>
    <Modal isOpen={ModalCodeBanque} onClose={()=> setModalCodeBanque(false)} className=" w-[500px] h-[550px]" >
      <Navbar content={navbarModalCodeBanque}></Navbar>
      <div className=' flex justify-center p-4'>
      <Table headers={HeaderCodeBanque} data={DataCodeBanque}  classTable="overflow-y-auto " 
     onClick={handleTableRowClickCodeBanque}
      selectedRowIndex={selectedRowIndexCodeBanque}
      
      ></Table>
      </div>
      <div className='flex justify-end p-4'>
     <Button children="Quitter" onClick={()=> setModalCodeBanque(false)}></Button>
      </div>
    </Modal>

    {/* Modal login prise en charge */}
    <Modal isOpen={ModalLoginPriseCharge} onClose={()=>setModalPriseCharge(false)} className="w-[1300px] h-[650px]  rounded-xl flex flex-col">
    <Navbar content={NavbarModalPriseEnCharge} className="fixed"></Navbar>
    <div className='p-8'>
      
          <div className='m-4 flex justify-between'>
<div className='flex flex-col w-[300px]'>
<Label text="Référence Fiscal" ></Label>
<Input type="text" placeholder="Référence Fiscal..." className=" h-10 mt-2"
value={searchPriseEnCharge}
onChange={(e) => setSearchPriseEnCharge(e.target.value)}
></Input>
</div>

<Button children="Prise en charge" onClick={handlePriseEnCharge} className="h-12 mt-8"></Button>

</div>
          {isLoading ? (
 <div className='flex justify-center mt-4'>
 <Label className="text-3xl" text="Aucun resultat"></Label>
 </div>
) : (
                <div className='flex flex-col pr-4 pl-4 py-2'>
                     
           <div >        
           <div className=" flex flex-row">

<Label text="RF" className="text-xs"></Label>
<p className='text-xs ml-2 text-white text-[15px] text-[15px]'>

{data.reference_fiscal }
</p>
<Label text="RF" ></Label>
<p className='text-xs ml-2 text-white '>

{data.nif }
</p>
<Label text="N° Statistique" className="ml-8 "></Label>
<p className='text-xs ml-2 text-white '>
  { data.numero_statistique }
</p>
           </div>
<div className='flex justify-between '>
<div className='flex flex-col w-[500px]'>
<div className="flex justify-between mt-1">
<Label text="Raison social" className=""></Label>
<p className='text-xs ml-2 text-white '>
{ data.raison_sociale}
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Nom Commercial" className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.nom_commerciale }
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Adresse" className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.adresse }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Activité principal"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.activite }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Forme juridique" className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.forme_juridique}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Type"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.type }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Précision activitée"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.precision_activite }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Capital"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.capital }
</p>
</div>
</div>
<div className='flex flex-col w-[500px]'>

<div className="flex justify-between mt-2">
<Label text="Regime Fiscal"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.regime_fiscal }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Début exercice"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_debut_exe }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Fin exercice"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.date_cloture_exe}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="RCS"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="N° agrément"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.reference_agrement }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date agrementt"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_agrement }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Periode grace"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.periode_grace }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date creation"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_creation }
</p>
</div>
</div>
    </div>
   
    <div className='flex justify-between mt-2'>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Titre"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.titre }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date accord"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_accord }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date acte"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_acte }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Type demande"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.type_demande }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Proprietaire"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.proprietaire }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nombre salarie"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.nombre_salarie }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Rib"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.rib }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Resident"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.resident }
</p>
</div>
</div>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Delivree le"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.delivree_le }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Exportateur"className=""></Label>
<p className='text-xs ml-2 text-white '>
<Checkbox value={data.exportateur}></Checkbox>
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Importateur"className=""></Label>
<p className='text-xs ml-2 text-white '>
  <Checkbox value={data.importateur}></Checkbox>
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date registre" className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_registre }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Registre commerce"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.registre_commerce }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Precision activite"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.precision_activite }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date demande modif"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.date_demande_modif }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date attribution RF"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.date_attribution_nif }
</p>
</div>
</div>
 
    </div>

      
        </div>
        
        </div>
       
)}

     </div>
    </Modal>

    {/* error modal login prise en charge */}
    <ModalError isOpen={isModalError} onClose={()=> setIsModalError(false)} quitter={()=> setIsModalError(false)}></ModalError>
        <ModalErrorServer isOpen={isModalErrorServer} onClose={()=> setIsModalErrorServer(false)} quitter={()=> setIsModalErrorServer(false)}></ModalErrorServer>

     {/*Mise  à jour RF Modal */}
     <Modal isOpen={ModalMAJRF} onClose={()=>setModalMAJRF(false)} className={` w-[500px] h-[650px] rounded flex justify-center`} >
     <div className='flex flex-col p-4 w-[400px]'>
            <Label className="text-3xl" text="Renseignement"></Label>
      
            <div className='flex flex-col mt-4'>
              <Label text="Raison Social"></Label>
              <Input type="text" 
              value={valueNonPeriodique.raison_social}
              onChange={(e)=>setValueNonPeriodeique({...valueNonPeriodique , raison_social : e.target.value })}
              placeholder="Raison Social"  className="w-full"/>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="Nom Commercial"></Label>
              <Input type="text"
              value={valueNonPeriodique.nom_commercial}
              onChange={(e)=>setValueNonPeriodeique({...valueNonPeriodique , nom_commercial : e.target.value})}
              placeholder="Nom Commercial"  className="w-full"/>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="Fokontany"></Label>
              <SearchInput type="text" placeholder="Fokontany" value={DataCodeFokontanySelect? DataCodeFokontanySelect.libelle : "" === valueNonPeriodique.fokontany}  classInput={` w-full`} onSearch={()=>setModalFokontany(true)}></SearchInput>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="Adresse"></Label>
              <Input type="text"
              value={valueNonPeriodique.adresse}
              onChange={(e)=>setValueNonPeriodeique({...valueNonPeriodique , adresse: e.target.value })}
              placeholder="Adresse"  className="w-full"/>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="CIN"></Label>
              <Input type="text" 
              value={valueNonPeriodique.CIN}
              onChange={(e)=>setValueNonPeriodeique({...valueNonPeriodique , CIN : e.target.value })}
              placeholder="CIN"
              
              className="w-full"/>
            </div>
            <div className='flex flex-col mt-4'>
              <Label text="Motif"></Label>
              <Input type="text" 
              value={valueNonPeriodique.Motif}
              onChange={(e)=>setValueNonPeriodeique({...valueNonPeriodique , Motif : e.target.value})}
              placeholder="Motif"  className="w-full"/>
            </div>
            <Button type="submit" children="Enregistrer"  className="mt-8"></Button>
           
          </div>
     </Modal>

     {/* Fokontany Modal search */}
     <Modal isOpen={ModalFokontany} onClose={()=>setModalFokontany(false)} className={`w-[500px] h-[550px] flex flex-col rounded`}>
     <Navbar content={ModalNavbarCodeFokontany}></Navbar>
      <div className=' flex justify-center p-4'>
      <Table headers={headerFokontany} data={formattedDataFokontany}  classTable="overflow-y-auto " 
     onClick={handleTableRowClickCodeFokontany}
      selectedRowIndex={selectedRowIndexCodeFokontany}
      
      ></Table>
      </div>
      <div className='flex justify-end p-4'>
     <Button children="Quitter" onClick={()=> setModalFokontany(false)}></Button>
      </div>
     </Modal>
     <Modal isOpen={isModalErrorPriseEnCharge} onClose={()=> setIsModalErrorPriseEnCharge(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Il y a une erreur" className="text-xl"></Label>
<Button children="OK"  onClick={()=> setIsModalErrorPriseEnCharge(false)} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isModalSucessPriseEnCharge} onClose={()=> setIsModalSuccessPiseEnCharge(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Donné prise en charge" className="text-xl"></Label>
<Button children="OK"  onClick={()=> setModalPriseCharge(false)} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={ModalLogin} onClose={()=> setModalLogin(false)} className={`flex justify-center w-[500px] h-[450px]`}>
        <div className='mt-8 flex flex-col p-4 w-[400px]'>
          <Label className="text-5xl" text="Identification"></Label>
          <div className='flex flex-col mt-8'>
            <Label text="Code"></Label>
            <Input type="text" placeholder="Votre code" value={code} onChange={(e) => setCode(e.target.value)} className="w-full"/>
          </div>
          <div className='flex flex-col mt-4'>
            <Label text="Mot de passe"></Label>
            <PasswordInput value={mdp} onChange={(e)=> setMdp(e.target.value)}></PasswordInput>
          </div>
          <Button type="submit" children="Se connecter" onClick={handleLogin} className="mt-8"></Button>
         
          </div>
        </Modal>


    </div>

  )
}

export default EnregistrementTitre