import React, { useEffect, useState } from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Checkbox from '../../../components/button/Checkbox';
import axios from 'axios';
import * as XLSX from 'xlsx';
function ResteRecouvrerDeuxDate() {
  const [selectedOption, setSelectedOption] = useState(true);
  const [value , setValue] = useState({
    
    date_init:"",
    date_fin:"",
    nif:""
  });
  
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format date in "dd/mm/yyyy hh:mm:ss" format
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
  };

  const [Response , setResponse] = useState([]);
  // header Table components 
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/gestion/restearecouvrer')
      .then((response) => setResponse(response.data))
      .catch((error) => console.error(error));
     
  }, []);
const HandleData = async() => {
const baseUrl = `http://localhost:3500/gestion`

  try {


    const response = await axios.post(`${baseUrl}/restearecouvrer`, {
      date_init: value.date_init,
      date_fin: value.date_fin,
      nif : value.nif      
    });
  
  
    // Extract the data property from the response
    const BetweenToDate = response.data;
    console.log(BetweenToDate);
    setResponse(BetweenToDate);
   
   } catch (error){
    console.error(`l'erruer est`,error)
   }
}

  
  const headers = [  "Référence fiscal",
  "Base impôt",
  " P1 ",
   "P2" , 
   "Année",
  "Reste à recouvrer",
  "Transporteur",
  "Type de payement",
  "Montant à payer",
  "Montant verser",
  "code banque",
  "date de création",
  "numéro de chèque",
  "numéro impôt",
  "numéro récépissé",
  "periode",
  "Selectionné"
];

const [valueSelected, setValueSelected] = useState([]);



const handleCheckboxChange = (item) => {
  // Check if the item is already selected
  const isSelected = valueSelected.some((selectedItem) => selectedItem.id === item.id);

  if (isSelected) {
    // If selected, remove it from the array
    const updatedSelection = valueSelected.filter((selectedItem) => selectedItem.id !== item.id);
    setValueSelected(updatedSelection);
  } else {
    // If not selected, add it to the array
    setValueSelected([...valueSelected, item]);
  }

  console.log('Selected values:', valueSelected);
};




  // data Table components  
 const data = Array.isArray(Response) ? Response.map(item => [
  item.reference_fiscal , 
  item.base_impot,
  item.periode1, 
  item.periode2  ,
  item.annee ,
  item.reste_a_payer , 
  <Checkbox value={item.transporteur} onChange={() => handleCheckboxChange(item.id)} ></Checkbox>,
  item.type_payment,
  item.montant_a_payer,
  item.motant_verser,
  item.code_banque,
  item.date_creation,
  item.numero_cheque,
  item.numero_impot,
  item.numero_recepisse,
  item.periode,
  <Checkbox
  value={valueSelected.some((selectedItem) => selectedItem.id === item.id)}
  onChange={() => handleCheckboxChange(item)}
  className="hover:cursor-pointer"
></Checkbox>,
]) : [];

const sumResteAPayer = data.reduce((accumulator, item) => {
  const resteAPayer = parseFloat(item[5]) || 0; // Assuming "reste_a_payer" is a number
  return accumulator + resteAPayer;
}, 0);


const exportToExcel = () => {
  const selectedData = valueSelected.map((item) => ({
    "Référence Fiscal": item.reference_fiscal,
   " Base Impôt": item.base_impot,
  " P1 ": item.periode1, 
   "P2" : item.periode2  ,
   "Année": item.annee ,
  "Reste à recouvrer": item.reste_a_payer , 
  "Transporteur": item.transporteur,
  "Type de payement" : item.type_payment,
  "Montant à payer": item.montant_a_payer,
  "Montant verser" : item.motant_verser,
  "code banque" : item.code_banque,
  "date de création" : item.date_creation,
  "numéro de chèque" : item.numero_cheque,
  "numéro impôt" :item.numero_impot,
  "numéro récépissé": item.numero_recepisse,
  "periode":item.periode,

    // ... add other properties you want to export
  }));

  const ws = XLSX.utils.json_to_sheet(selectedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SelectedData');
  XLSX.writeFile(wb, 'données.xlsx');
};

const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white'>
    Reste à recouvrer entre deux dates    
      </div>
        <div>
          <BackButton to="/ConsultationGestion"></BackButton>
        </div>
    </div>
      )
      return (
        <div  className='bg-[#212122] h-screen w-screen'>
            <Navbar content={NavbarContent}></Navbar>
     <div className='m-4'>
           <div className='bg-black p-4 flex justify-between rounded'>
     
      <div className='flex flex-row'>
      <div className='flex flex-col'>
      <Label text="Du "></Label>
      <Input type="date" className="mt-2"
      value={value.date_init}
      onChange={(e)=> setValue({...value , date_init: e.target.value})}
      ></Input>
      </div>
     <div className='flex flex-col ml-4'>
     <Label text="Au "></Label>
     <Input type="date"  className="mt-2"
     value={value.date_fin}
     onChange={(e)=> setValue({...value , date_fin: e.target.value})}
     ></Input>
     </div>
      </div>
      {selectedOption === false && (
  <div className='flex flex-col '>
    <Label text="Référence Fiscal "></Label>
    <Input
      type="text"
      className="mt-2"
      value={value.nif}
      onChange={(e) => setValue({ ...value, nif: e.target.value })}
    ></Input>
  </div>
)}

     </div>
      <div className='bg-black p-4 mt-2 flex justify-between rounded'>
      <div className='flex flex-col '>
      <Label text="Ce programme à été lancé le "></Label>
      <p className='text-white text-lg mt-2'>{formatDate(currentDateTime)}</p>
     
     </div>
     
     <div className='flex flex-col  '>
      <Label text="Reste à recouvrer "></Label>
      <p className='text-white text-xl mt-2'>{sumResteAPayer}</p>
     </div>
     </div>
     <div className='p-4 bg-black mt-2 rounded '>
       <p className='text-white text-xl font-semibold'>Impréssion régroupé par RF</p>
       <div className="mt-2">
  <label className="text-white">
    <input
      type="radio"
      value="Total"
      className='mr-2'
      checked={selectedOption === true}
      onChange={() => setSelectedOption(true)}
    />
    Total
  </label>
  <label className='text-white ml-4'>
    <input
      type="radio"
      value="ParRF"
      className='mr-2'
      checked={selectedOption === false}
      onChange={() => setSelectedOption(false)}
    />
    Par RF
  </label>
</div>
     </div>
     <div className='mt-2  flex justify-center '>
     <Table headers={headers} data={data} classTable="overflow-y-auto h-60 "  classNameTd="hover:bg-gray-200 " ></Table>
     </div>
     <div className='flex justify-between mt-2'>
     
       <Button type="submit" onClick={HandleData} children="Executer" ></Button>
       <Button children="Rafraîchir" onClick={()=> window.location.href = "/ResteRecouvrerDeuxDate"} ></Button>
       <Button  children="Vers Excel" onClick={exportToExcel} ></Button>
       <Button  children="Imprimer Mise en Demeure" onClick={ () => {window.location.href = "/TitrePerceptio"}} ></Button>
       <Button  children="Imprimer par nature Impot" onClick={() => {window.location.href="/ListeNatureImpot"}}></Button>
     </div>
        </div>
        </div>
      )
}

export default ResteRecouvrerDeuxDate