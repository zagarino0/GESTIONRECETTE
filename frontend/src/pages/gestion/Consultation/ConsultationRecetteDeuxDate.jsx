import React, {  useEffect, useState } from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import Checkbox from '../../../components/button/Checkbox';
import ReactSelect from 'react-select';
import axios from 'axios';
function ConsultationRecetteDeuxDate() {
  // code Impot 
  const [dataCodeImpot, setDataCodeImpot] = useState([]);
  const [Response , setResponse] = useState([]);
  //const [selectedOption, setSelectedOption] = useState("Total");
  const [selectedNumeroImpot, setSelectedNumeroImpot] = useState(null);
  const [code_impot , setCode_impot]= useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [value , setValue] = useState({
    
    date_init:"",
    date_fin:"",
    numero_impot:""
  });

 //code Impot

 useEffect(() => {

  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/impot')
    .then((response) => setDataCodeImpot(response.data))
    .catch((error) => console.error(error));
}, []);


//nature impot 
// Rechercher le libellé correspondant au numéro d'impôt sélectionné
const selectedLibelle = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpot);

  const HandleData = async  (e) => {
    e.preventDefault();
    const baseUrl = `http://localhost:3500/gestion`;
    try {
      const response = await axios.post(`${baseUrl}/recette`, {
        date_init: value.date_init,
        date_fin: value.date_fin,
        numero_impot: value.numero_impot
      });
      const BetweenToDate = response.data;
      setResponse(BetweenToDate);
    } catch (error) {
      console.error(`l'erreur est`, error);
    }
  }
  
  

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
      
   // header Table components 
   const headers = [  "Référence Fiscal","Base impôt"," P1", "P2", "Année", "Reste à payer" ,"transporteur", "Type payement" , "Montant à payer" , "Montant verser", "Code banque", "Date de création", "numéro chèque" , "numéro impôt" , "numéro récépissé" ,"Période" ,"Séléction"];

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
  
  const handleSelectChange = (selectedOption) => {
    // Mettre à jour l'état avec le numéro d'impôt sélectionné
    setSelectedNumeroImpot(selectedOption.value);
    setCode_impot(selectedOption.value);
    
    setSelected(selectedOption);
    
  };
  
  // Créez une fonction de filtrage
const filterDataImpot= () => {
  if (selected) {
    const filtered = data.filter((item) => item[13] === selected.value);
    setFilteredData(filtered);
   console.log("filter",filtered)
    
  } else {
    setFilteredData(data);
    console.log("data",data)
    
  }
};

useEffect(() => {
  filterDataImpot();
}, [selected]);

 const NavbarContent = (
     <div className='flex justify-between'>
     <div className='text-white'>
     Consultation recette entre deux dates    
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
            <div className='bg-black p-4 flex '>
     <div className='flex flex-col'>
     <Label text="Du "></Label>
       <Input type="date" className="mt-2" 
       value={value.date_init}
       onChange={(e)=> setValue({...value , date_init: e.target.value})}
       ></Input>
     </div>
       <div className='flex flex-col ml-4'>
       <Label text="Au " ></Label>
       <Input type="date"  className="mt-2"
       value={value.date_fin}
       onChange={(e)=> setValue({...value , date_fin: e.target.value})}
       ></Input>
       </div>
       <Button type="submit" onClick={HandleData} children="Executer" className="h-12 mt-8 ml-4" ></Button>
      </div>
       <div className='bg-black p-4 mt-2 flex  justify-between'>
       <div className='flex flex-col '>
       <Label text="Numéro impôt "></Label>
       <ReactSelect
   options={dataCodeImpot.map((item) => ({
    value: item.numero_impot,
    label: item.numero_impot,
  }))}
  value={selected}
  onChange={handleSelectChange}
   
   className="mt-2 w-40"
 />
 <p className='text-white text-lg mt-2'>{selectedLibelle ? selectedLibelle.libelle : 'Aucune sélection'}</p>
      </div>
      <div className='flex flex-row  mt-6 '>
    <Checkbox label="Tous impôt"className="ml-4"></Checkbox>
     <Checkbox label="Code N° impôt"className="ml-4"></Checkbox>
     <Checkbox label="Par nature d'impôt"className="ml-4"></Checkbox>
      </div>
      <div className='flex flex-col ml-4 '>
       <Label text="Montant "></Label>
       <p className='text-white text-xl mt-2'>{sumResteAPayer}</p>
      </div>
      </div>
      <div className='p-4 bg-black mt-2  flex justify-between'>
  
     <Checkbox label="Classement par date de dépôt"className="ml-4"></Checkbox>
     <Checkbox label="Classement par ordre croissant [Montant Versé]"className="ml-4"></Checkbox>
     <Checkbox label="Classement par ordre décroissant [Montant Versé]"className="ml-4"></Checkbox>
        
      </div>
      <div className='mt-2  flex justify-center'>
      <Table headers={headers} data={data} classTable="overflow-y-auto h-80" ></Table>
      </div>
      <div className='flex justify-between mt-2'>
        <Button type="submit" children="Imprimer " onClick={ () => {window.location.href = "/MontantNatureImpot"}} ></Button>
        <Button type="submit" children="Quitter" onClick={() => {window.location.href="/ConsultationGestion"}}></Button>
      </div>
         </div>
         </div>
       )
}

export default ConsultationRecetteDeuxDate