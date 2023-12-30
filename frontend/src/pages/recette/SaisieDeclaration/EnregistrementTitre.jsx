import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import ReactSelect from 'react-select';
import Checkbox from '../../../components/button/Checkbox'
import Select from 'react-select'
import Modal from '../../../components/modals/Modal'
import Table from '../../../components/table/Table'
import axios from 'axios'
import SearchInput from '../../../components/input/SearchInput'
function EnregistrementTitre() {
  const [isModalImpot , setIsModalImpot] = useState(false)
  const [DataImpot , setDataImpot] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRowIndexCodeBanque, setSelectedRowIndexCodeBanque] = useState(null);
  const [DataSelected , setDataSelected] = useState([]);
  const [searchTerm ,setSearchTerm] = useState([]);
  const [ DataCodeBanqueSelected , setDataCodeBanqueSelected] = useState({});
  const [Client , setClient] = useState([])
  const [searchClient , setSeacrchClient] = useState([])
  const [CodeBanque , setCodeBanque] = useState([]);
  const [ModalCodeBanque , setModalCodeBanque] = useState(true)
  const [selectCodeBanque , setSelectCodeBanque] = useState([])
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
 
  return (
    <div className='bg-[#212122] h-full w-full p-4'>
     <Navbar content={NavbarContent}></Navbar>
     <div className='p-2 flex justify-between'>
      <div className='flex flex-row'>
      <Button children="Prise en charge"></Button>
      <Button children="N° impot" className="ml-2" onClick={()=> {setIsModalImpot(true);
      setSearchTerm("")
      }}></Button>
      <Button children="Attribution ou Mise à jour RF" className="ml-2"></Button>
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
       value={searchTerm ||DataSelected? DataSelected.numero_impot:"" }
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
      <ReactSelect className='ml-2'></ReactSelect>
       </div>
       <div className="flex flex-row">
       <Input type="text"></Input>
      <Label text="Année concerné" className="ml-2"></Label>
      <ReactSelect className='ml-2'></ReactSelect>
      <Label text="Période" className="ml-2"></Label>
      <ReactSelect className='ml-2'></ReactSelect>
      <ReactSelect className='ml-2'></ReactSelect>
       </div>
     </div>
     <div className="p-2 flex justify-between">
     <div className='flex flex-row'>
      <div className='flex flex-col'>
      <Label text="Numéro impot" className="font-bold"></Label>
      <Label text={DataSelected? DataSelected.numero_impot:""} className="mt-2"></Label>
      </div>
      <div className='ml-4 flex flex-col'>
      <Label text="type impot"  className="font-bold"></Label>
      <Label text={DataSelected ? DataSelected.libelle : ""} className="mt-2"></Label>
      </div>
     </div>
     <div className='flex flex-row'>
      <Label text="Transporteur"></Label>
      <Checkbox className="ml-2"></Checkbox>
      <Input type="text" className="ml-2 h-10" placeholder="IM vehicule..."></Input>
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
    <Input type="text" value={Client? Client.raison_sociale : ""} ></Input>
     </div>
     </div>
      <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Nom commercial"></Label>
    <Input type="text" value={Client? Client.nom_commerciale : ""}></Input>
   
     </div>
    <div className="flex justify-between w-[500px]">
    <Label text="Commune" className="ml-2"></Label>
    <Input type="text" value={Client? Client.commune : ""} ></Input>
    </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Adresse"></Label>
    <Input type="text" value={Client? Client?.adresse : ""} ></Input>
     </div>
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant versé"></Label>
    <Input type="text" ></Input>
     </div>
     </div>
       <div className="p-2 flex justify-between">
     <div className='flex justify-between w-[500px]'>
    <Label text="Base Impossable"></Label>
    <Input type="text" ></Input>
     </div>
       <div className='flex justify-between w-[500px]'>
    <Label text="Montant à Payer"></Label>
    <Input type="text" ></Input>
     </div>
     </div>
       <div className="p-4 bg-black flex justify-center rounded  mt-4 mb-4">
   <Label text="Mode de Règlement" className="text-center text-lg font-bold"></Label>
     </div>
    <div className='flex justify-between mr-4 ml-4 mt-2'>
    <div className='flex flex-col '>
      <div className='flex justify-between w-[500px]'>
      <Checkbox label="Espèce"></Checkbox>
      <Checkbox label="Chèque"></Checkbox>
      <Checkbox label="Virement"></Checkbox>
      <Checkbox label="Dépot"></Checkbox>
      </div>
      <div className='flex flex-col mt-2'>
      <Checkbox label="Autre" ></Checkbox>
      <Checkbox label="Tresor" className="mt-2"></Checkbox>
      <Checkbox label="Mobile Banky" className="mt-2"></Checkbox>
      </div>
     </div>
    
    <div className='w-[500px] flex flex-col'>
    <div className='flex justify-between '>
      <Label text="Code banque"></Label>
      <SearchInput type="text" placeholder="Code banque"
      value={selectCodeBanque ? selectCodeBanque.id : ""}
onSearch={()=> setModalCodeBanque(true)}
     ></SearchInput>
    </div>
    
    <div className='flex justify-between mt-2'>
      <Label text="Nom commercial de la banque"></Label>
      <Input type="text" className="w-[210px]" value={ selectCodeBanque ? selectCodeBanque.nom_commerciale : "" }></Input>
    </div>
    <div className='flex justify-between mt-2'>
      <Label text="Numéro chèque"></Label>
      <Input type="text"  className="w-[210px]"></Input>
    </div>
   
    </div>
    </div>
    <div className='mr-4 ml-4 mt-2  flex justify-between'>
     <Button type="submit" children="Nouveau"></Button>
     <Button type="submit" children="Enregistrer"></Button>
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
    </div>
  )
}

export default EnregistrementTitre