import React, { useEffect, useState } from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Button } from '../../../../components/button/button';
import { Navbar } from '../../../../components/navbar/Navbar';
import Modal from '../../../../components/modals/Modal';
import ReactSelect from 'react-select';
import Checkbox from '../../../../components/button/Checkbox';
function DateEcheancePeriode() {
  const [searchYear, setSearchYear] = useState('');
  //const [searchCode, setSearchCode] = useState('');
  const [ setDataCode] = useState([]);
 // const [filteredData, setFilteredData] = useState([]);
  const [dataCodeContent, setDataCodeContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [numero_impot , setNumero_impot] = useState('');
  const [paye_impot , setPaye_impot ] = useState('');
  const [paye_penalite , setPaye_penalite] = useState('');
  const [paye_amende , setPaye_amende] = useState('');
  const [valeur_amende , setValeur_amende] = useState('');
  const [taux_penalite , setTaux_penalite] = useState('');
  const [dataCodeImpot, setDataCodeImpot] = useState([]);
  //const [selectedExercice, setSelectedExercice] = useState(null); 


//checkbox event
const handleCheckboxChangePaye_amende = (event) => {
  const { checked } = event.target;
  setPaye_amende(checked);
};

const handleCheckboxChangePaye_penalite = (event) => {
  const { checked } = event.target;
  setPaye_penalite(checked);
};


 //code Impot
 const [selectedNumeroImpot, setSelectedNumeroImpot] = useState(null);
 const [selectedNumeroImpotModifi, setSelectedNumeroImpotModifi] = useState(null);
 const [selectedNumeroImpotSearch, setSelectedNumeroImpotSearch] = useState(null);
 



  useEffect(() => {
    // Effectuer la requête Axios avec le paramètre d'année lorsque searchYear change
    axios.get(`http://localhost:3500/code/revenusalariaux`)
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectChange = (selectedOption) => {
    // Mettre à jour l'état avec le numéro d'impôt sélectionné
    setSelectedNumeroImpot(selectedOption.value);
    setNumero_impot(selectedOption.value);
    
  };
  

  const handleSelectChangeSearch = (selectedOption) => {
    // Mettre à jour l'état avec le numéro d'impôt sélectionné
    setSelectedNumeroImpotSearch(selectedOption.value);
    setNumero_impot(selectedOption.value); // Ajoutez cette ligne
  };
  
  useEffect(() => {
    // Effectuer la requête Axios avec les paramètres d'année et de numéro d'impôt lorsque searchYear ou numero_impot change
    axios.get(`http://localhost:3500/code/revenusalariaux/${searchYear}`)
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, [searchYear]);
  
  useEffect(() => {
    // Effectuer la requête Axios avec les paramètres d'année et de numéro d'impôt lorsque searchYear ou numero_impot change
    axios.get(`http://localhost:3500/code/revenusalariaux/${selectedNumeroImpotSearch}`)
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, [ selectedNumeroImpotSearch]);
  



  const handleSelectChangeModifi = (selectedOption) => {
    // Mettre à jour l'état avec le numéro d'impôt sélectionné
    setSelectedNumeroImpotModifi(selectedOption.value);
    setSelectedEditData((prevData) => ({
      ...prevData,
      numero_impot : selectedOption.value,
    }));
    
  };
  
   // Rechercher le libellé correspondant au numéro d'impôt sélectionné
 const selectedLibelle = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpot);
 const selectedLibelleModifi = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpotModifi);
 const selectedLibelleSearch = dataCodeImpot.find((item) => item.numero_impot === selectedNumeroImpotSearch);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/impot')
      .then((response) => setDataCodeImpot(response.data))
      .catch((error) => console.error(error));
  }, []);
  


  
  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/revenusalariaux/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
       // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/revenusalariaux')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const DataHandler =  (e) =>{
    e.preventDefault();
    const Data ={
   
      numero_impot,
      paye_impot,
      paye_penalite,
      valeur_amende,
      taux_penalite
         
    };
    
    console.log(Data)
    try {
       axios.post('http://localhost:3500/code/revenusalariaux', Data)
       .then((response) => setDataCodeContent(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , Data);
      setNumero_impot('');
      setTaux_penalite('');
      setIsModalOpen(false);
    } catch(error){
  console.error("erreur lors de l'ajout de donnée" , error)
    }
      
  }

  
    
  console.log(dataCodeContent)
  const data = dataCodeContent.length > 0
  ? dataCodeContent.map((item) => [
      item.numero_impot,
      item.libelle,
      item.annee,
      item.p1,
      item.p2,
      item.date_debut_paiement,
      item.date_fin_paiement,
      item.jour,
      item.type,
      <Checkbox value={item.paye_amende} />,
      <Checkbox value={item.paye_penalite} />,
      item.valeur_amende,
      item.taux_penalite,
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

/*// Créez une fonction de filtrage
const filterDataByExercice = () => {
  if (selectedExercice) {
    const filtered = data.filter((item) => item[6] === selectedExercice.value);
    setFilteredData(filtered);
  } else {
    setFilteredData(data);
  }
};

// Utilisez cette fonction dans un useEffect avec selectedExercice comme dépendance
useEffect(() => {
  filterDataByExercice();
}, [selectedExercice]);
*/
  const headers = [
    'Num', 'Libellé', 'Année', 'Période 1', 'Période 2', 'Date début', 
    'Date fin', 'Jours', 'Type', 'Payé Amande', 'Payé Pénalité', 
    'Valeur Amende', 'Taux Pénalité', '', ''
  ];

  
  const NavbarModal =(
    <div className='text-white'>
    Date écheance par période
  </div>
  
  )
 
  const content = (
    <div>
     
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Année" className="mt-2"></Label>
        <Input
          type='text'
          placeholder='Année'
          className='ml-4'
          value={searchYear}
          onChange={(e) => {
            setSearchYear(e.target.value);
          }}
        />
      </div>
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Code" className="mt-2"></Label>
        <p className='text-white text-xl m-4'>{selectedLibelleSearch ? selectedLibelleSearch.libelle : ''}</p>
      <ReactSelect
    options={dataCodeImpot.map((item) => ({
      value: item.numero_impot,
      label: item.numero_impot,
    }))}
    value={dataCodeImpot.find((option) => option.value === selectedNumeroImpotSearch)}
   onChange={handleSelectChangeSearch}
   
   className="m-4 w-40"
 />
        

      </div>
      <Button children="Ajouter une information" onClick={() => setIsModalOpen(true)} className="m-4" ></Button>
      <div className='mt-10 m-4' >
      {data.length > 0 ? (
        <Table headers={headers} data={data}></Table>
      ) : (
        <p className='text-white text-xl'>Aucun résultat trouvé </p>
      )}
      </div>
      <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[620px] h-[520px]">
        <form onSubmit={DataHandler}>
    <Navbar content={NavbarModal} ></Navbar>
    <div className=' m-4 flex justify-between' >
<Label text=" Numéro Impot :" className="mt-2"></Label>
<ReactSelect
  options={dataCodeImpot.map((item) => ({
    value: item.numero_impot,
    label: item.numero_impot,
  }))}
  value={dataCodeImpot.find((option) => option.value === numero_impot)}
  onChange={handleSelectChange}
  className="ml-4 w-40"
/>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Payé Impot :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={paye_impot}
 onChange={(e)=> setPaye_impot(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Checkbox label="Payé Pénalité" className="m-4"
value={paye_penalite}
onChange={handleCheckboxChangePaye_penalite}
></Checkbox>
<Checkbox label="Payé Amende" className="m-4"
value={paye_amende}
onChange={handleCheckboxChangePaye_amende}
></Checkbox>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Valeur Amande :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={valeur_amende}
 onChange={(e)=> setValeur_amende(e.target.value)}
 ></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taux Pénalité :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
 value={taux_penalite}
 onChange={(e)=> setTaux_penalite(e.target.value)}
 ></Input>
    </div> 
    <p className='text-white text-xl m-4'>{selectedLibelle ? selectedLibelle.libelle : ''}</p>
    <div className="flex justify-between p-4">

  <Button children="Enregistrer"
 type='submit'
  ></Button>
  <Button onClick={() =>  setIsModalOpen(false)} children="Quitter"  ></Button>
  </div>
  </form>
    </Modal>
    <Modal  isOpen={isModalOpenModifi} onClose={() => setIsModalOpenModifi(false)} className="w-[620px] h-[520px]">
    <Navbar content={NavbarModal} ></Navbar>
    <div className=' m-4 flex justify-between' >
<Label text=" Numéro Impot :" className="mt-2"></Label>
<ReactSelect
    options={dataCodeImpot.map((item) => ({
      value: item.numero_impot,
      label: item.numero_impot,
    }))}
   value={dataCodeImpot.find((option) => option.value === selectedEditData?.numero_impot)}
   onChange={handleSelectChangeModifi}
   
   className="m-4 w-40"
 />

    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Payé Impot :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={selectedEditData ? selectedEditData.paye_impot : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      paye_impot: e.target.value,
    }))
  }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Payé Pénalité :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={selectedEditData ? selectedEditData.paye_penalite : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      paye_penalite : e.target.value,
    }))
  }
 ></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Valeur Amande :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={selectedEditData ? selectedEditData.valeur_amende : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      valeur_amende: e.target.value,
    }))
  }
 ></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Taux Pénalité :" className="mt-2"></Label>
<Input type="text"  className="ml-4"
  value={selectedEditData ? selectedEditData.taux_penalite : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      taux_penalite: e.target.value,
    }))
  }
 ></Input>
    </div> 
    <p className='text-white text-xl m-4'>{selectedLibelleModifi ? selectedLibelleModifi.libelle : ''}</p>
    <div className="flex justify-between p-4">

  <Button children="Modifier"
 onClick={async () => {
  try {
    // Make the PUT/PATCH request to update the data in the database
    await axios.put(
      `http://localhost:3500/code/revenusalariaux/${selectedEditData.id}`,
      selectedEditData
    );
      // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/code/revenusalariaux')
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
  );
return (
 <Layout children={content}>

 </Layout>
  )
}

export default DateEcheancePeriode