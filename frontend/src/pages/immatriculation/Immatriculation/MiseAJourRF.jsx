import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import Table from '../../../components/table/Table'
import { Button } from '../../../components/button/button'
import axios from 'axios'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BsPencil } from 'react-icons/bs'

function MiseAJourRF() {
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [isModalOpenModifi, setIsModalOpenModifi] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/client')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  // delete prevision annuelle
const handleDelete = (id) => {
  try {
    // Make the DELETE request to your backend API to delete the data by ID
    axios.delete(`http://localhost:3500/client/${id}`);

    // Update the list of data after successful deletion
    setDataCode((prevData) => prevData.filter((data) => data.id !== id));
     // Reset the selection
     // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/client')
  .then((response) => setDataCode(response.data))
  .catch((error) => console.error(error));
    console.log(`Data with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

  const headers = ['RF', 'Raison social', 'P1', 'P2', 
                   'Année', 'Reste à recouvrer', 'Nature' , 'nom commerciale',
                   'type', 'forme juridique', 'regime fiscal',
   'date agrement', 'reference agrement', 'periode grace', 'date creation',
   'capital', 'activite', 'precision activite', 'date demande modif',
   'date attribution nif', 'registre commerce', 'date registre',
   'numero statistique', 'delivree le', 'date_debut_exe', 'date_cloture_exe',
   'resident', 'exportateur', 'importateur', 'rib', 'region', 'district',
   'commune', 'fokontany', 'adresse', 'nombre salarie', 'proprietaire'
   , 'type demande', 'date_acte', 'date_accord', 'titre','',''
  ];
  const data = dataCode.length > 0
  ? dataCode.map((item) => [
      item.nif,
      item.raison_social,
      item.p1,
      item.p2,
      item.annee,
      item.reste_a_recouvrer,
      item.nature,
      item.nom_commerciale,
      item.type,
      item.forme_juridique,
      item.regime_fiscal,
      item.date_agrement,
      item.reference_agrement,
      item.periode_grace,
      item.date_reaction,
      item.capital, item.activite , item.precision_activite, item.date_demande_modif , item.date_attribution_nif ,item.registre_commerce,
      item.date_registre , item.numero_statistique , item.delivree_le , item.date_debut_exe , item.date_cloture_exe,
      item.resident , item.exportateur , item.importateur ,item.rib , item.region , item.discrit , item.commune, item.fokontany,
      item.adresse , item.nombre_salaire , item.proprietaire , item.type_demande , item.date_acte , item.date_accord , item.titre      
      ,
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
    const Navbarcontent = (
       <div className='flex justify-between '>
         <div className='text-white '>
        Mise à jour RF
        </div>
        <div>
<BackButton to="/immatriculation"></BackButton>
        </div>
       </div>
    )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
        <Navbar content={Navbarcontent}></Navbar>
       <div className='flex justify-center items-center bg-black mt-8 m-4 p-4'>
       <div className='flex flex-row'>
          <div className='flex justify-between'>
            <Label text="Du :" className="mt-2"></Label>
            <Input type="date" className="ml-4"></Input>
          </div>
          <div className='flex justify-between ml-4'>
            <Label text="Au :" className="mt-2"></Label>
            <Input type="date" className="ml-4"></Input>
          </div>
        </div>
       </div>
       <div className='m-4 mt-12'>
        <div className='flex flex-row'>
          <Label text="Ce programme a été lancé le :"></Label>
          <p className='text-white ml-4 mt-1'>Date</p>
          <Label text="à :" className="ml-4"></Label>
          <p className='ml-4 text-white mt-1'>Heure</p>
          <div className='flex justify-between ml-10 '>
            <Label text="RF :" ></Label>
            <Input type="text" className="ml-4"></Input>
          </div>
          <div className='flex justify-between ml-4 '>
            <Label text="Reste à recouvrer :" ></Label>
            <Input type="text" className="ml-4"></Input>
          </div>
        </div>
        <div className='mt-12 bg-black p-4'>
<Label text="Impression regroupé par RF "></Label>
<div className='flex flex-row mt-4'>
<Checkbox label="Total"></Checkbox>
<Checkbox label="Par RF" className="ml-4"></Checkbox>
</div>
        </div>
        <div className=' mt-8' >
<Table headers={headers} data={data} classTable="overflow-y-auto h-40" ></Table>
      </div>
      <div className='flex justify-between mt-8'>
        <Button children="Executer"></Button>
        <Button children="Rafraîchir"></Button>
        <Button children="Vers Excel"></Button>
        <Button children="Impression Mise en demeure"></Button>
        <Button children="Impression par Nature d'împot"></Button>
      </div>
       </div>
    </div>
  )
}

export default MiseAJourRF