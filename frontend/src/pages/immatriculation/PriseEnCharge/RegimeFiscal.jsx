import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { Button } from '../../../components/button/button'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordInput from '../../../components/input/PasswordInput'
import axios from 'axios'
import { ModalError, ModalErrorServer } from '../Modal'
function RegimeFiscalIm() {
   
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  const data = location.state?.data || {}; // Access the data passed from PriseCharge component
  const [Data, setData] = useState([]);
  const [code, setCode] = useState('');
  const [mdp, setMdp] = useState('');
  const [isModalError, setIsModalError] = useState(false);
  const [isModalErrorServer, setIsModalErrorServer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  console.log(referenceFiscal);
  console.log(data);
  useEffect(() => {
    if (referenceFiscal) {
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${referenceFiscal}`)
        .then((response) => {
          setData(response.data.assujetissements);
          console.log('Data received:', response.data.assujetissements);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [referenceFiscal]);
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
          setIsAuthenticated(true);
        } else {
          setIsModalError(true);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
       
        setIsModalErrorServer(true);
      });
  };

  const handlePriseEnCharge = () => {
    // Perform data verification logic here
    if (referenceFiscal) {
      // Data is verified, set isDataVerified to true
      
  
      // Update the data object with the prise_charge property
  
          navigate(`/SituationGeographiqueIm?reference_fiscal=${referenceFiscal}`);
    }
  };
  
  const BodyContent = (
    <div className='m-4'>
       <ModalError isOpen={isModalError} onClose={()=> setIsModalError(false)} quitter={()=> setIsModalError(false)}></ModalError>
      <ModalErrorServer isOpen={isModalErrorServer} onClose={()=> setIsModalErrorServer(false)} quitter={()=> setIsModalErrorServer(false)}></ModalErrorServer>
  <div className='bg-black p-4 flex justify-between rounded-md'>
    <div className='flex flex-col w-[250px]'>
     <Label text="Votre code :"></Label>
     <Input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}} placeholder="Code... " className="mt-2 w-60" ></Input>
    </div>
    <div className='flex flex-col w-[250px] '>
     <Label text="Votre Mot de passe :"></Label>
     <PasswordInput value={mdp} onChange={(e)=>{setMdp(e.target.value)}} ></PasswordInput>
    </div>
    <div className='mt-8'>
      <Button children="s'identifier" onClick={handleLogin}></Button>
    </div>
    </div>
 <div className='p-4 bg-black mt-2 rounded-md '>
   <p className='text-white text-xl text-center'>Regime Fiscal</p>
 </div>
 {isAuthenticated === true && (
  <>
   <div className='flex  justify-between '>

<div className='  w-[700px] p-2'>
<div className="flex justify-between">
<div className='flex flex-col'>
<Checkbox label="Impot synthétique"></Checkbox>
<Checkbox label="Impot sur les révenus" className="mt-2"></Checkbox>
<Checkbox label="IRSA" className="mt-2" ></Checkbox>
<Checkbox label="IRCM" className="mt-2"></Checkbox>
<Checkbox label="DA[Local]"className="mt-2"></Checkbox>
<Checkbox label="TVA" className="mt-2"></Checkbox>
</div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>


</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>

</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
</div>

</div>

</div>
<div className='flex justify-between  w-[700px] p-2'>
<div className='flex flex-col'>
<Checkbox label="Licences de Vente des BA" ></Checkbox>
<Checkbox label="Prél. sur Produits de Jeux"className="mt-2"></Checkbox>
<Checkbox label="Prél. sur BA et Alcolisé"className="mt-2"></Checkbox>
<Checkbox label="Taxes sur Appareils Auto."className="mt-2"></Checkbox>
<Checkbox label="Taxes sur Contrats Assur."className="mt-2"></Checkbox>
<Checkbox label="Taxe Spéc Jeunesse et Sport"className="mt-2"></Checkbox>
</div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>


</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>

</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
</div>



</div>
</div>
<div className='flex justify-between mt-2 '>
<div >
<Label text="2023" className="text-3xl"></Label>
</div>
<div>
<Checkbox label="Début d'activité"></Checkbox>
<Checkbox label="Rénouvellement"></Checkbox>
</div>
<div className="flex justify-between">
<Button type="submit" children="Suivant" onClick={handlePriseEnCharge} ></Button>
</div>
</div>
  </>
)}
    </div>
  )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
     <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
    </div>
  )
}

export default RegimeFiscalIm