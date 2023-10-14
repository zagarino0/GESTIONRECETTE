import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';
import axios from 'axios';
import ReactSelect from 'react-select';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import Modal from '../../../components/modals/Modal';
function PrevisonAnnuelle() {
   
  const [dataCode, setDataCode] = useState([]);
  const [dataCodeImpot, setDataCodeImpot] = useState([]);
  const [dataCodeTypePresvision, setDataCodeTypePresvision] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [code_impot , setCode_impot]= useState('');
  const [annee , setAnnee] =useState('')
  const [type_prevision , setType_prevision]= useState('');
  const [montant_prevision ,setMontant_prevision]= useState('');
  const[mois , setMois]= useState('');

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prevision')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  //type de prévision 
  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/typeprevision')
      .then((response) => setDataCodeTypePresvision(response.data))
      .catch((error) => console.error(error));
  }, []);

 //code Impot
 const [selectedNumeroImpot, setSelectedNumeroImpot] = useState(null);
 const [selectedNumeroImpotModifi, setSelectedNumeroImpotModifi] = useState(null);
 useEffect(() => {

  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/impot')
    .then((response) => setDataCodeImpot(response.data))
    .catch((error) => console.error(error));
}, []);

const handleSelectChange = (selectedOption) => {
  // Mettre à jour l'état avec le numéro d'impôt sélectionné
  setSelectedNumeroImpot(selectedOption.value);
  setCode_impot(selectedOption.value);
  
};

const handleSelectChangeModifi = (selectedOption) => {
  // Mettre à jour l'état avec le numéro d'impôt sélectionné
  setSelectedNumeroImpotModifi(selectedOption.value);
  setSelectedEditData((prevData) => ({
    ...prevData,
    code_impot : selectedOption.value,
  }));
  
};


// Fonction pour ajouter une prévision
  const handleAddPrevision = () => {
    const newPrevision = {
      annee,
      code_impot,
      type_prevision,
      montant_prevision,
      mois,
    };

    // Envoyer les données au backend pour l'ajout
    axios.post('http://localhost:3500/prevision', newPrevision)
      .then((response) => {
        // Mise à jour de la liste des prévisions après l'ajout réussi
        setDataCode([...dataCode, response.data]);
        console.log("données ajoutées avec succès " , newPrevision);
        // Réinitialiser les champs de saisie
        setAnnee('');
        setCode_impot('');
        setType_prevision('');
        setMontant_prevision('');
        setMois('');
      })
      .catch((error) => console.error(error));
  };

 // Rechercher le libellé correspondant au numéro d'impôt sélectionné
 const selectedLibelle = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpot);
 const selectedLibelleModifi = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpotModifi);

// opition du mois 
const options = [
  { value: 'Janvier', label: 'Janvier'},
  { value: 'Fevrier', label: 'Fevrier' },
  { value: 'Mars', label: 'Mars' },
  { value: 'Avril', label: 'Avril' },
  { value: 'Mai', label: 'Mai' },
  { value: 'Juin', label: 'Juin' },
  { value: 'Juillet', label: 'Juillet' },
  { value: 'Aout', label: 'Aout' },
  { value: 'Septembre', label: 'Septembre' },
  { value: 'Octobre', label: 'Octobre' },
  { value: 'Novembre', label: 'Novembre' },
  { value: 'Decembre', label: 'Decembre' },
  
  // Ajoutez vos options ici
]; 

// delete prevision annuelle
const handleDelete = (id) => {
  try {
    // Make the DELETE request to your backend API to delete the data by ID
    axios.delete(`http://localhost:3500/prevision/${id}`);

    // Update the list of data after successful deletion
    setDataCode((prevData) => prevData.filter((data) => data.id !== id));
     // Reset the selection
     // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/prevision')
  .then((response) => setDataCode(response.data))
  .catch((error) => console.error(error));
    console.log(`Data with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

console.log(dataCode);

  const headers = ["Année" ,"Num_imp" , "Libella", "code_Prev", "Mois","Montant", "", ""];
  const data = dataCode.length > 0
  ? dataCode.map((item) => [
      item.annee,
      item.code_impot,
      item.libelle,
      item.type_prevision,
       item.mois,
     
      item.montant_prevision,
      <span
        key={item.id}
        className='cursor-pointer'
        onClick={() => handleDelete(item.id)}
      >
        <RiDeleteBinLine />
      </span>,
      <span
        key={`edit-${item.id}`}
        className='cursor-pointer'
        onClick={() => {
          setSelectedEditData(item);
          setIsModalOpenModifi(true);
        }}
      >
        <BsPencil />
      </span>
    ])
  : [];
  const NavbarModal =(
    <div className='text-white'>
    Mise à jour prévisions
  </div>
  
  )
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour prévisions
    </div>
    <div>
      <BackButton to="/parametreParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen '>
    <Navbar content={NavbarContent}></Navbar>
    <form onSubmit={handleAddPrevision}>
    <div className=' m-4 flex justify-between  '>
     
      <div className='flex flex-row mt-4 '>
<Label text="Exercice"></Label>
<Input type="text" className="h-12 w-40 ml-2"
value={annee}
onChange={(e)=> setAnnee(e.target.value)}
></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Mois"></Label>
<ReactSelect
  options={options}
  value={options.find((option) => option.value === mois)}
  onChange={(selectedOption) => setMois(selectedOption.value)}
  
  className="ml-4 w-40"
/>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Prévision"></Label>
<ReactSelect
  options={dataCodeTypePresvision.map((item) => ({
    value: item.type_prevision,
    label: item.type_prevision,
  }))}
  
  value={dataCodeTypePresvision.find((option) => option.value === type_prevision)}
  onChange={(selectedOption) => setType_prevision(selectedOption.value)}
  
  className="ml-4 w-40"
/>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Code impot"></Label>
<ReactSelect
  options={dataCodeImpot.map((item) => ({
    value: item.numero_impot,
    label: item.numero_impot,
  }))}
  value={dataCodeImpot.find((option) => option.value === code_impot)}
  onChange={handleSelectChange}
  className="ml-4 w-40"
/>
      </div>
     
      <div className='flex justify-between mt-4'>
<Label text="Montant Prev. en Ar."></Label>
<Input type="text" className="h-12 w-60 ml-2"
value={montant_prevision}
onChange={(e)=> setMontant_prevision(e.target.value)}
></Input>
      </div>
      
    </div>
    <div className='flex m-4 justify-between  '>
    <Button type="submit" children="Enregistrer"></Button>
      
<p className='text-white text-2xl'>{selectedLibelle ? selectedLibelle.libelle : ''}</p>



    </div>
    <div className='m-4 ' >
<Table headers={headers} data={data} ></Table>

    </div>
    </form>  
    <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[620px] h-[580px]">
    <Navbar content={NavbarModal} ></Navbar>
    <div className=' m-4 flex justify-between' >
<Label text=" Exercice :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.annee : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     annee: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Montant Prevision en Ar. :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={selectedEditData ? selectedEditData.montant_prevision : ''}
 onChange={(e) =>
   setSelectedEditData((prevData) => ({
     ...prevData,
     montant_prevision: e.target.value,
   }))
 }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Mois :" className="mt-2"></Label>
   <ReactSelect
   options={options}
   value={options.find((option) => option.value === selectedEditData?.mois)}
   onChange={(selectedOption) => {
     setSelectedEditData((prevData) => ({
       ...prevData,
       mois: selectedOption.value,
     }));
   }}
   className="m-4 w-40"
 />

    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Prévision :" className="mt-2"></Label>
   <ReactSelect
   options={dataCodeTypePresvision.map((item) => ({
    value: item.type_prevision,
    label: item.type_prevision,
  }))}
  
  value={
    selectedEditData
      ? dataCodeTypePresvision.find(
          (option) => option.value === selectedEditData.type_prevision
        )
      : null
  }
  onChange={(selectedOption) => {
    setSelectedEditData((prevData) => ({
      ...prevData,
      type_prevision: selectedOption.value,
    }));
  }}
   className="m-4 w-40"
 />

    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Code impot :" className="mt-2"></Label>
   <ReactSelect
    options={dataCodeImpot.map((item) => ({
      value: item.numero_impot,
      label: item.numero_impot,
    }))}
   value={dataCodeImpot.find((option) => option.value === selectedEditData?.code_impot)}
   onChange={handleSelectChangeModifi}
   
   className="m-4 w-40"
 />

    </div> 
    <p className='text-white text-xl m-4'>{selectedLibelleModifi ? selectedLibelleModifi.libelle : ''}</p>
    <div className="flex justify-between p-4">

  <Button children="Modifier"
   onClick={async () => {
    try {
      // Make the PUT/PATCH request to update the data in the database
      await axios.put(
        `http://localhost:3500/prevision/${selectedEditData.id}`,
        selectedEditData
      );
        // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prevision')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      // Update the edited data in dataCode
      setDataCode((prevData) =>
        prevData.map((data) =>
          data.id === selectedEditData.id ? selectedEditData : data
        )
      );

      setIsModalOpenModifi(false);
      setSelectedEditData(null);
      console.log('Data updated successfully.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }}
  ></Button>
  <Button onClick={() =>  setIsModalOpenModifi(false)} children="Quitter"  ></Button>
  </div>
    </Modal>
  </div>
  )
}

export default PrevisonAnnuelle