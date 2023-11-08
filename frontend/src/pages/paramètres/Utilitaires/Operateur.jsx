import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button';
import Checkbox from '../../../components/button/Checkbox';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import Label from '../../../components/title/label';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import Select from '../../../components/input/SelectInput';
function Operateur() {
  const [dataCode, setDataCode] = useState([]);
  const [code , setCode ] = useState([]);
  const [nom , setNom ] = useState([]);
  const [prenom , setPrenom] = useState([]);
  const [fonction , setFonction] = useState('');
  const [compte , setCompte] = useState('');
  const [mdp , setMdp] = useState([]);
  const [recette_modification , setRecette_modification] = useState(false);
  const [recette_visualisation , setRecette_visualisation] = useState(false);
  const [recette_prise_charge , setRecette_prise_charge] = useState(false);
  const [gestion_prise_charge , setGestion_prise_charge] = useState(false);
  const [gestion_modification , setGestion_modification] = useState(false);
  const [gestion_debut_nif , setGestion_debut_nif] = useState([]);
  const [gestion_fin_nif  , setGestion_fin_nif] = useState([]);
  const [recette_creation , setRecette_creation] = useState(false);
  const [immatriculation_creation , setImmatriculation_creation] = useState(false);
  const [immatriculation_prise_charge ,setImmatriculation_prise_charge ] =useState(false);
  
  const handleCheckboxChangeModification = (event) => {
    const { checked } = event.target;
    setRecette_modification(checked);
  };

  const handleCheckboxChangeRecette_prise_charge = (event) => {
    const { checked } = event.target;
    setRecette_prise_charge(checked);
  };

  const handleCheckboxChangeGestion_prise_charge = (event) => {
    const { checked } = event.target;
    setGestion_prise_charge(checked);
  };
  const handleCheckboxChangeGestion_modification = (event) => {
    const { checked } = event.target;
    setGestion_modification(checked);
  };


  const handleCheckboxChangeCreation = (event) => {
    const { checked } = event.target;
    setRecette_creation(checked);
  };
  const handleCheckboxChangeVisualisation = (event) => {
    const { checked } = event.target;
    setRecette_visualisation(checked);
  };
  const handleCheckboxChangeCreation1 = (event) => {
    const { checked } = event.target;
    setImmatriculation_creation(checked);
  };
  const handleCheckboxChangePriseEnCharge = (event) => {
    const { checked } = event.target;
    setImmatriculation_prise_charge(checked);
  };
  
  const DataHandler =  (e) =>{
    e.preventDefault();
    const User ={
      code,
      nom,
      prenom,
      fonction,
      compte,
      mdp ,
      recette_modification,
      recette_creation,
      recette_visualisation,
      recette_prise_charge ,
      immatriculation_creation,
      immatriculation_prise_charge,
      gestion_prise_charge ,
      gestion_modification ,
      gestion_debut_nif,
      gestion_fin_nif,
      
    };
    
    console.log(User)
    try {
       axios.post('http://localhost:3500/user/register', User)
       .then((response) => setDataCode(response.data))
       .catch((error) => console.error(error));
      console.log("données ajoutées avec succès " , User);
      setIsModalOpen(false)
    } catch(error){
console.error("erreur lors de l'ajout de donnée" , error)
    }
      
}

const DataHandlerModifie = (e) => {
  e.preventDefault();

  if (selectedEditData) {
    const updatedUser = {
      code: selectedEditData.code,
      nom: selectedEditData.nom,
      prenom: selectedEditData.prenom,
      fonction: selectedEditData.fonction,
      compte: selectedEditData.compte,
      mdp: selectedEditData.mdp,
      recette_modification: selectedEditData.recette_modification,
      recette_creation: selectedEditData.recette_creation,
      recette_visualisation: selectedEditData.recette_visualisation,
      recette_prise_charge: selectedEditData.recette_prise_charge,
      gestion_modification: selectedEditData.gestion_modification,
      gestion_prise_charge: selectedEditData.gestion_prise_charge,
      gestion_debut_nif: selectedEditData.gestion_debut_nif,
      gestion_fin_nif: selectedEditData.gestion_fin_nif,
      immatriculation_creation: selectedEditData.immatriculation_creation,
      immatriculation_prise_charge: selectedEditData.immatriculation_prise_charge,
    };

    console.log(updatedUser);
    // Effectuez une requête de mise à jour au backend avec les données mises à jour
    axios
      .put(`http://localhost:3500/user/updateuser/${selectedEditData.id}`, updatedUser)
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error("Erreur lors de la mise à jour des données.", error));

    setIsModalOpenModifie(false); // Fermez le modal après la mise à jour
  }
};

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/user/all/')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenModifie, setIsModalOpenModifie] = useState(false);
  
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [ setSelectedData] = useState(null); 
  const handleDelete = (id) => {
    try {
      // Make the DELETE request to your backend API to delete the data by ID
      axios.delete(`http://localhost:3500/user/${id}`);
  
      // Update the list of data after successful deletion
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
      setSelectedData(null); // Reset the selection
  
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const headers = ["Code" ,"Nom " ,"Prénom" , "Fonction", "Saisie", "Modification", "Visualisation","Prise en charge"," Gest.Modification","Gest.Prise en charge", "Numéro 1", "Numéro 2", "Création", "prise en charge" , "" , ""];
  const formattedData = dataCode.map(item => [
    item.code,
    item.nom,
    item.prenom,
    item.fonction,
    <Checkbox value={item.recette_creation} />,
    <Checkbox value={item.recette_modification} />,
    <Checkbox value={item.recette_visualisation} />,
    <Checkbox value={item.recette_prise_charge} />,
    <Checkbox value={item.gestion_modification} />,
    <Checkbox value={item.gestion_prise_charge} />,
    item.gestion_debut_nif,
    item.gestion_fin_nif,
    <Checkbox value={item.immatriculation_creation} />,
    <Checkbox value={item.immatriculation_prise_charge} />,
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
        setIsModalOpenModifie(true);
      }}
    >
      <BsPencil />
    </span>,
  ]);
  
  const NavbarContent = (
    <nav className=" flex items-center justify-between  ">
 <div className='text-white'>
Opérateurs
  </div>
  
<BackButton to="/utilitaireParametre"></BackButton>
    
</nav>
)
const NavbarModal =(
  <div>
  <div className='text-white'>
Opérateurs
  </div>
  </div>
)
const options = [
  { value: 'Maire', label: 'Maire' },
  { value: 'Directeur financier', label: 'Directeur financier' },
  { value: 'Chef de service recette', label: 'Chef de service recette' },
  { value: 'Directeur de gestion', label: 'Directeur de gestion' },
  { value: 'Directeur de contrôle', label: 'Directeur de contrôle' },
  { value: 'Directeur de Recuvrement', label: 'Directeur de Recouvrement' },
  { value: 'Chef de division', label: 'Chef de division' },
  { value: 'Regisseur', label: 'Regisseur' },
  { value: 'Percepteur', label: 'Percepteur' },
  
  // Ajoutez vos options ici
];
const optionsCompte = [
  { value: 'BNQ', label: 'BNQ' },
  { value: 'Chef de division', label: 'Chef de division' },
  { value: 'Simple utilisateur', label: 'Simple utilisateur' },
  
  
  // Ajoutez vos options ici
];
  return (
    <div className='bg-[#212122] h-screen w-screen'>
    <Navbar content={NavbarContent}></Navbar>
    <div className='mt-24 m-4' >
<Table headers={headers} data={formattedData} ></Table>
    </div>
    <div className='m-4'>
      <Button children="Créer un utilisateur" onClick={() => setIsModalOpen(true)}></Button>
    </div>
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[1100px] h-[680px]">
  <form onSubmit={DataHandler} >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className='mt-2 m-4 flex flex-row bg-black '>
  <div className=' m-4 flex justify-between' >
<Label text=" Code Opérateur:" className="mt-2"></Label>
<Input type="text" placeholder="Votre code" className="ml-4 h-10"
 value={code}
 onChange={e => setCode(e.target.value)}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Mot de passe:" className="mt-2"></Label>
<Input type="password" placeholder="Mot de passe" className="ml-4 h-10"
value={mdp}
onChange={e => setMdp(e.target.value)}
></Input>
    </div>
  </div>
  <div className=' ml-4 mr-4 mt-2 flex justify-between' >
<Label text=" Nom :" className="mt-2 "

></Label>
<Input type="text"  className="ml-4 h-10"
value={nom}
onChange={e => setNom(e.target.value)}
></Input>
    </div>
    <div className=' ml-4 mr-4 mt-2 flex justify-between' >
<Label text=" Prénoms:" className="mt-2"></Label>
<Input type="text"  className="ml-4 h-10"
value={prenom}
onChange={e => setPrenom(e.target.value)}
></Input>
    </div>
    <div className=' ml-4 mr-4 mt-2 flex justify-between' >
<Label text=" Fonction:" className="mt-2"></Label>
 <Select
 options={options}
 value={fonction}
 onChange={e => setFonction(e.target.value)}
 className="h-12"
/>
    </div>
    <div className='mt-2 ml-4'>
<Label text="RECETTE"></Label>
<div className='flex flex-row '>
<Checkbox label="Création" className="m-4"
value={recette_creation}
onChange={handleCheckboxChangeCreation}
></Checkbox>
<Checkbox label="Modification" className="m-4"
value={recette_modification}
onChange={handleCheckboxChangeModification}
></Checkbox>
<Checkbox label="Vusialisation" className="m-4"
value={recette_visualisation}
onChange={handleCheckboxChangeVisualisation}
></Checkbox>
<Checkbox label="Prise en charge" className="m-4"
value={recette_prise_charge}
onChange={handleCheckboxChangeRecette_prise_charge}
></Checkbox>
</div>

<div className=' ml-4 mr-4 flex justify-between' >
<Label text=" Compte  :" className="mt-2"></Label>
<Select
 options={optionsCompte}
 value={compte}
 onChange={e => setCompte(e.target.value)}
 className="h-12"
/>
    </div>
<div className='mt-2 ml-4 m-2'>
<Label text=" GESTION" className="mt-2"></Label>
<div className='flex justify-between m-2 '>

<div>
<div className="flex flex-row">
<Checkbox label="Prise en charge" className="m-4"
value={gestion_modification}
onChange={handleCheckboxChangeGestion_modification}
></Checkbox>
<Checkbox label="Modification" className="m-4"
value={gestion_prise_charge}
onChange={handleCheckboxChangeGestion_prise_charge}
></Checkbox>
</div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF début :</label>
<Input type="text" placeholder="RF début"  className="ml-2 h-10"
value={gestion_debut_nif}
onChange={e => setGestion_debut_nif(e.target.value)}
></Input>
</div>
</div>
<div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF fin :</label>
<Input type="text" placeholder="RF fin"  className="ml-2 h-10"
value={gestion_fin_nif}
onChange={e => setGestion_fin_nif(e.target.value)}
></Input>
</div>
</div>
</div>
</div>
<div className='flex justify-between'>
  <Label text="IMMATRICULATION"></Label>
  <Checkbox label="Creation RF" className="m-4"
value={immatriculation_creation}
onChange={handleCheckboxChangeCreation1}
></Checkbox>
<Checkbox label="Prise en charge" className="m-4"
value={immatriculation_prise_charge}
onChange={handleCheckboxChangePriseEnCharge}
></Checkbox>
</div>
<div>

</div>
    </div>
  <div className='flex justify-between ml-4 mr-4'>
  

  <Button type="submit" children="Enregistrer" ></Button>
  <Button onClick={() => setIsModalOpen(false)} children="Quitter" ></Button>
  </div>
  </form>
</Modal>
<Modal isOpen={isModalOpenModifie} onClose={() => setIsModalOpenModifie(false)} className="w-[1100px] h-[680px]">
  <form onSubmit={DataHandler} >
  <Navbar content={NavbarModal} ></Navbar>
  
  <div className='mt-2 m-4 flex flex-row bg-black '>
  <div className=' m-4 flex justify-between' >
<Label text=" Code Opérateur:" className="mt-2"></Label>
<Input type="text" placeholder="Votre code" className="ml-4 h-10"
  value={selectedEditData ? selectedEditData.code : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      code: e.target.value,
    }))
  }
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Mot de passe:" className="mt-2"></Label>
<Input type="password" placeholder="Mot de passe" className="ml-4 h-10"
value={selectedEditData ? selectedEditData.mdp : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    mdp: e.target.value,
  }))
}
></Input>
    </div>
  </div>
  <div className=' m-4 flex justify-between' >
<Label text=" Nom :" className="mt-2 "

></Label>
<Input type="text"  className="ml-4 h-10"
value={selectedEditData ? selectedEditData.nom : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    nom: e.target.value,
  }))
}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Prénoms:" className="mt-2"></Label>
<Input type="text"  className="ml-4 h-10"
value={selectedEditData ? selectedEditData.prenom : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    prenom : e.target.value,
  }))
}
></Input>
    </div>
    <div className=' m-4 flex justify-between' >
<Label text=" Fonction:" className="mt-2"></Label>
 <Select
 options={options}
 value={selectedEditData ? selectedEditData.fonction : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      fonction : e.target.value,
    }))
  }
 className="h-12"
/>
    </div>
    <div className='mt-2 ml-4'>
<Label text="RECETTE"></Label>
<div className='flex flex-row '>
<Checkbox label="Création" className="m-4"
value={selectedEditData ? selectedEditData.recette_creation : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    recette_creation : e.target.checked ,
  }))
}
></Checkbox>
<Checkbox label="Modification" className="m-4"
value={selectedEditData ? selectedEditData.recette_modification : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    recette_modification : e.target.checked ,
  }))
}
></Checkbox>
<Checkbox label="Vusialisation" className="m-4"
value={selectedEditData ? selectedEditData.recette_visualisation : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    recette_visualisation : e.target.checked ,
  }))
}
></Checkbox>
<Checkbox label="Prise en charge" className="m-4"
value={selectedEditData ? selectedEditData.recette_prise_charge : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    recette_prise_charge : e.target.checked ,
  }))
}
></Checkbox>
</div>

<div className=' ml-4 mr-4 flex justify-between' >
<Label text=" Compte  :" className="mt-2"></Label>
<Select
 options={optionsCompte}
 value={selectedEditData ? selectedEditData.compte : ''}
  onChange={(e) =>
    setSelectedEditData((prevData) => ({
      ...prevData,
      compte: e.target.value,
    }))
  }
 className="h-12"
/>    </div>
<div className='mt-2 ml-4 m-2'>
<Label text=" GESTION" className="mt-2"></Label>
<div className='flex justify-between m-2 '>
<Checkbox label="Modification" className="m-4"
value={selectedEditData ? selectedEditData.gestion_modification : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    gestion_modification : e.target.checked ,
  }))
}
></Checkbox>
<Checkbox label="Prise en charge" className="m-4"
value={selectedEditData ? selectedEditData.gestion_prise_charge : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    gestion_prise_charge : e.target.checked ,
  }))
}
></Checkbox>
<div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF début :</label>
<Input type="text" placeholder="RF début"  className="ml-2 h-10"
value={selectedEditData ? selectedEditData.gestion_debut_nif : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    gestion_debut_nif: e.target.value,
  }))
}
></Input>
</div>
</div>
<div>
<div className='flex justify-between'>
<label className='text-white mt-2' >RF fin :</label>
<Input type="text" placeholder="RF fin"  className="ml-2 h-10"
value={selectedEditData ? selectedEditData.gestion_fin_nif : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    gestion_fin_nif: e.target.value,
  }))
}
></Input>
</div>
</div>
</div>
</div>
<div className='flex justify-between'>
  <Label text="IMMATRICULATION"></Label>
  <Checkbox label="Creation RF" className="m-4"
value={selectedEditData ? selectedEditData.immatriculation_creation : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    immatriculation_creation : e.target.checked ,
  }))
}
></Checkbox>
<Checkbox label="Prise en charge" className="m-4"
value={selectedEditData ? selectedEditData.immatriculation_prise_charge : ''}
onChange={(e) =>
  setSelectedEditData((prevData) => ({
    ...prevData,
    immatriculation_prise_charge : e.target.checked ,
  }))
}
></Checkbox>
</div>
<div>

</div>
    </div>
  <div className='flex justify-between ml-4 mr-4'>
  

  <Button type="submit" children="Enregistrer" onClick={DataHandlerModifie} ></Button>
  <Button onClick={() => setIsModalOpenModifie(false)} children="Quitter" ></Button>
  </div>
  </form>
</Modal>
  </div>
  )
}

export default Operateur