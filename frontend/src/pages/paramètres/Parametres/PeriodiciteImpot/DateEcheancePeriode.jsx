import React, { useEffect, useState } from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'
import axios from 'axios';
import {BsPencil} from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
function DateEcheancePeriode() {
  const [searchYear, setSearchYear] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [dataCode, setDataCode] = useState([]);
  const [dataCodeContent, setDataCodeContent] = useState([]);
  
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);

  useEffect(() => {
    // Effectuer la requête Axios avec le paramètre d'année lorsque searchYear change
    axios.get(`http://localhost:3500/code/dateecheance`)
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);
 
  useEffect(() => {
    // Effectuer la requête Axios avec le paramètre d'année lorsque searchYear change
    axios.get(`http://localhost:3500/code/revenusalariaux`)
      .then((response) => setDataCodeContent(response.data))
      .catch((error) => console.error(error));
  }, []);
  
  // Fusionner les deux tableaux lorsque les données sont disponibles
  const mergedData = [...dataCode, ...dataCodeContent];
  // Utilisez mergedData comme vous le souhaitez ici
  console.log('Données fusionnées :', mergedData);

  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/code/dateecheance/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
       // Reset the selection
       // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/dateecheance')
    .then((response) => setDataCode(response.data))
    .catch((error) => console.error(error));
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const data = mergedData.length > 0
  ? mergedData.map((item) => [
      item.numero_impot,
      item.libelle,
      item.annee,
      item.date_debut_paiement,
      item.date_fin_paiement,
      item.type,
      item.paye_amende,
      item.paye_penalite,
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

  const headers = [
    'Num', 'Libellé', 'Année', 'Période 1', 'Période 2', 'Date début', 
    'Date fin', 'Jours', 'Type', 'Payé Amande', 'Payé Pénalité', 
    'Valeur Amende', 'Taux Pénalité'
  ];

  

 
  const content = (
    <div>
     
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Année" className="mt-2"></Label>
        <Input
          type="text"
          placeholder="Année"
          className="ml-4"
         
        />
      </div>
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Code" className="mt-2"></Label>
        <Input
          type="text"
          placeholder="Code"
          className="ml-4"
          
        />
      </div>
      <div className='mt-10 m-4' >
        <Table headers={headers} data={data} ></Table>
      </div>
    </div>
  );
return (
 <Layout children={content}>

 </Layout>
  )
}

export default DateEcheancePeriode