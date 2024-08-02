import React, { useEffect , useState } from 'react'
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
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import { useNavigate } from 'react-router-dom'
function ModificationPeriodique() {
    const [isModalImpot , setIsModalImpot] = useState(false)
    const [DataImpot , setDataImpot] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [selectedRowIndexCodeBanque, setSelectedRowIndexCodeBanque] = useState(null);
    const [selectedRowIndexCodeFokontany, setSelectedRowIndexCodeFokontany] = useState(null);
    const [selectedRowIndexPriseEnCharge , setSelectedRowIndexPriseEnCharge] = useState(null);
    const [DataSelectedPriseEnCharge , setDataSelectdPriseEnCharge] = useState([]);
    const [DataCodeFokontanySelect , setDataCodeFokontanySelect] = useState([]);
    const [DataSelected , setDataSelected] = useState([]);
    const [searchTerm ,setSearchTerm] = useState([]);
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
    const [searchPriseEnCharge] = useState('');
  const [data, setData] = useState([]);
  const [ setIsLoading] = useState(false);
  
  const [EnregistementDeclaration, setEnregistementDeclaration] = useState(false);
  const [ErrorEnregistrementDecleration , setErrorEnregistrementDecleration] = useState(false);
   
   const UserData = localStorage.getItem("userDataRecette");
   const user = JSON.parse(UserData );
  
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
  
  }, [searchPriseEnCharge , data , setIsLoading]);
  
  
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
      amende_penalite:"",
      numero_immatriculation: "",
      annulation : false 
    }
    );
  
  // liste mode de payment 
  const ModeDePayment = [
    "Cheque",
     "Espece",
      "Virement",
      "Dépot",
      "Trésor",
      "BAR",
      "Autre"
  
  ]
  
  
  
    const NavbarContent = (
      <div className='flex justify-between'>
      <div className='text-white font-semibold'>
     Modification Enregistrement des titres de recette ou des déclarations
          </div>
          <div>
            <BackButton to="/DelivranceDuplicataRecepisse"></BackButton>
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
   
  
  
    const [Contribuable , setContribuable ] = useState([]);
    const [searchTermPriseEnCharge, setSearchTermPriseEnCharge] = useState("");
   
    useEffect(() => {
     // Récupérer les données depuis le backend
     axios.get('http://localhost:3500/prisecharge/contribuable/encharge')
       .then((response) => setContribuable(response.data))
       .catch((error) => console.error(error));
   }, []);
  
  
   //select Data prise en charge 
   const handleTableRowClickPriseEnCharge = (rowIndex) => {
    // Check if the row is already selected
    if (selectedRowIndexPriseEnCharge === rowIndex) {
      // Deselect the row if it is already selected
      setSelectedRowIndexPriseEnCharge(null);
      setDataSelectdPriseEnCharge(null);
    } else {
      // Select the row
      setSelectedRowIndexPriseEnCharge(rowIndex);
      const selectedRowDataPriseEnChage = Contribuable[rowIndex];
      setDataSelectdPriseEnCharge(selectedRowDataPriseEnChage);
    }
    setModalPriseCharge(false);
  };
  
   const handleSearch = (e) => {
     setSearchTermPriseEnCharge(e.target.value);
   };   
  
  const filteredData = Contribuable.filter((item) => 
   item.id && item.id.toLowerCase().includes(searchTermPriseEnCharge.toLowerCase())
   );
   
  
   const {siege} = DataSelectedPriseEnCharge ;
   const {activite} = DataSelectedPriseEnCharge ;
  // Header table client
  const ClientHeaders = ["Ref démandé", "Raison social",  "Référence Fiscal" , "type" , " Date autorisation" , "Régime fiscal" , "Forme juridique" , "Date de création" , "RIB"];
  // Data client Table
  const ClientData = filteredData.map((item) =>[
   item.id , 
   item.raison_social , 
   item.reference_fiscal , 
   item.type,
   <DateFormatConverter isoDate={item.date_agrement}></DateFormatConverter> ,
   item.regime_fiscal,
   item.forme_juridique ,
  <DateFormatConverter isoDate={item.date_creation}></DateFormatConverter> ,
   item.RIB
  ]);
  
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
  
  
  
    const generateId = () => {
      const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const length = Math.floor(Math.random() * (10 - 8 + 1)) + 8;
      let randomString = "";
      for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomString;
    };
  
    
    const [randomNumbers, setRandomNumbers] = useState('');
  
    const generateNumbers = () => {
      setRandomNumbers(generateId());
    };
  
   
    const handleEnregistrementDecl = () => {
        const ValueEnregistrementPeriodique = {
      "numero_impot": DataSelected.numero_impot,
      "annee" : value.annee,
      "base_impot" : DataSelected.libelle , 
      "montant_a_payer":value.montant_a_payer,
      "montant_verser": value.montant_a_payer,
      "reste_a_payer": value.reste_a_payer,
      "type_payment":value.mode_de_payement,
      "numero_cheque": value.numero_cheque,
      "code_banque": selectCodeBanque.id,
      "numero_recepisse": randomNumbers,
      "periode":value.periode,
      "transporteur":value.transporteur,
      "periode1": value.periode1,
      "periode2":value.periode2,
      "type_prevision":value.type_prev,
      "reference_fiscal": DataSelectedPriseEnCharge.reference_fiscal,
      "abbreviation_type_payment": value.type_payment,
      "numero_immatriculation": value.numero_immatriculation , 
      "annulation": value.annulation ,
      "user": user.code
        };
      
        console.log(ValueEnregistrementPeriodique)
        // Send the updated data to the backend
        axios.post('http://localhost:3500/recette/declarationperiodique', ValueEnregistrementPeriodique)
          .then((response) => {       // Handle the response from the backend, if needed
          setEnregistementDeclaration(true);
  
          })
          .catch((error) => {
            console.error('Error sending verification data:', error);
            setErrorEnregistrementDecleration(true);
          });
      }
    
    
  const [valueNonPeriodique , setValueNonPeriodeique] = useState({
    raison_social: "",
    nom_commercial:"",
    fokontany : "",
    adresse : "",
    CIN : "",
    Motif: ""
  })
  
  const navigate = useNavigate()
  
  
  // options data 
  const optionsTypePrev = TypePrev.map(item => ({
    value: item.type_prevision, // La chaîne de caractères pour l'option
    label: item.type_prevision  // La chaîne de caractères pour l'étiquette
  }));
  
  const ModeDePayement  = ModeDePayment.map((item)=>({value : item , label : item}))
  return (

    <div className='bg-[#212122] h-full w-full p-4'>
     <Navbar content={NavbarContent}></Navbar>
     <div className='p-2 flex justify-between'>
      <div className='flex flex-row'>
      <Button children="Prise en charge"  onClick={()=>setModalPriseCharge(true)}></Button>
      <Button children="N° impot" className="ml-2" onClick={()=> {setIsModalImpot(true)}}></Button>
      <Button children="Attribution ou Mise à jour RF" onClick={()=> setModalLogin(true)} className="ml-2"></Button>
      <Button children="Régisseur" onClick={()=> navigate('/EnregistrementDeclarartionRegisseur')} className="ml-2"></Button>
      
</div>
      <div className='flex flex-row'>
       <Label text="Numéro" className="mt-4"></Label>
       <Input value={randomNumbers} onChange={(e)=>setRandomNumbers(e.target.value)} className="ml-2 mt-2"></Input>
       <Button children="générer" onClick={generateNumbers} className='ml-2'></Button>
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
       options={optionsTypePrev}

      value={optionsTypePrev.find(option => option.value === value.type_prev)}
      onChange={(selectedOption) => setValue({ ...value, type_prev: selectedOption ? selectedOption.value : '' })}
       className='ml-2'></ReactSelect>
       </div>
       <div className="flex flex-row">
    <div className='flex flex-col'>
    <Label text="Année concerné" className="mt-2"></Label>
    <Input type="text"
        value={value.annee}
        onChange={(e)=> setValue({...value , annee : e.target.value })}
        className="mt-2"
       ></Input>
     
    </div>
    <div className=' ml-2 flex flex-col'>
    <Label text="Période" className="mt-2"></Label>
    <Input type="text"  className="mt-2"
      value={value.periode}
      onChange={(e)=> setValue({...value , periode : e.target.value })}
      ></Input>

    </div>
      <div className='flex flex-col ml-2'>
     <Label text="P1" className="mt-2"></Label>
     <Input type="text" value={value.periode1}
      onChange={(e)=>setValue({...value , periode1 : e.target.value})}
      className="mt-2"></Input>
      </div>
   <div className='flex flex-col ml-2'>
    <Label text="P2" className="mt-2"></Label>
   <Input type="text" value={value.periode2}
      onChange={(e)=>setValue({...value , periode2 : e.target.value})}
      className="mt-2"></Input>
   </div>
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
        value={value.numero_immatriculation}
        onChange={(e)=>setValue({...value , numero_immatriculation : e.target.value})}
        className="ml-2 h-10" placeholder="IM vehicule..."></Input>
      ) : <div></div> }
     </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="RF"></Label>
    <Input type="text" value={DataSelectedPriseEnCharge? DataSelectedPriseEnCharge.reference_fiscal: ""} 
     
    ></Input>
     </div>
    <div className='flex justify-between'>
  <Label text='Reste à payer'></Label>
  <Input type="text" className="ml-2" value={value.reste_a_payer} onChange={(e)=>setValue({...value , reste_a_payer : e.target.value})}  ></Input>
    </div>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Raison social"></Label>
    <Input type="text" value={DataSelectedPriseEnCharge? DataSelectedPriseEnCharge.raison_social : "" === value.raison_social} ></Input>
     </div>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Activité"></Label>
    <Input type="text" value={activite? activite.activite : "" }></Input>
   
     </div>
    <div className="flex justify-between w-[500px]">
    <Label text="Commune" className="ml-2"></Label>
    <Input type="text" value={siege? siege.commune : ""} ></Input>
    </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Adresse"></Label>
    <Input type="text" value={siege? siege.adresse_actuel : ""} ></Input>
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
    <div className='flex flex-row '>
     <Label text="Mode de payement" className="mt-2"></Label>
     <ReactSelect
     className={" w-[210px] h-10 ml-4"}	
     options={ ModeDePayement}
     value={ModeDePayement.find((option) => option.value === value.mode_de_payement)}      
     onChange={(options)=>{setValue({...value , mode_de_payement : options ? options.value : ""})}}
     />
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
     
     <Button type="submit" onClick={handleEnregistrementDecl} children="Enregistrer"></Button>
     
     <Button type="submit" onClick={()=> navigate('/saisiDeclarationRecette')} children="Quitter"></Button>
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
      <div className='flex flex-row mt-12'>
        <SearchInput placeholder={"Recherche"} onChange={handleSearch}></SearchInput>
      </div>
      <div className='mt-4'>
      <Table
      headers={ClientHeaders}
      data={ClientData}
      selectedRowIndex={selectedRowIndexPriseEnCharge}
      onClick={handleTableRowClickPriseEnCharge}
      ></Table>
      </div>
      <div className='flex justify-between mt-4'>
        {/* <Button children="Choisir" ></Button> */}
         <Button children="Quitter" onClick={()=>setModalPriseCharge(false)}></Button>
      </div>
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
        <Modal isOpen={EnregistementDeclaration} onClose={()=> setEnregistementDeclaration(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Enregistrement effectue" className="text-xl"></Label>
<Button children="OK"  onClick={()=> window.location.reload()} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={ErrorEnregistrementDecleration} onClose={()=> setErrorEnregistrementDecleration(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Il y a une erreur" className="text-xl"></Label>
<Button children="OK"  onClick={()=> setErrorEnregistrementDecleration(false)} className="mt-4"></Button>
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

export default ModificationPeriodique