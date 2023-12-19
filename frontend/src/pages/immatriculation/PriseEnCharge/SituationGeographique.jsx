import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Layout } from './Layout';
import { useLocation } from 'react-router-dom';
import PasswordInput from '../../../components/input/PasswordInput';
import axios from 'axios';
import { ModalError, ModalErrorServer } from '../Modal';

function SituationGeographiqueIm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  const data_content = location.state?.data || {}; // Access the data passed from PriseCharge component
  const [Data, setData] = useState([]);
  const [code, setCode] = useState('');
  const [mdp, setMdp] = useState('');
  const [isModalError, setIsModalError] = useState(false);
  const [isModalErrorServer, setIsModalErrorServer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(referenceFiscal);
  console.log(data_content);
  useEffect(() => {
    if (referenceFiscal) {
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${referenceFiscal}`)
        .then((response) => {
          setData(response.data.assujetissements            );
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
      const updatedData = { reference_fiscal : referenceFiscal , prise_charge: true };
      setData(updatedData);
  
      // Send the updated data to the backend
      axios.post('http://localhost:3500/prisecharge', updatedData)
        .then((response) => {
          // Handle the response from the backend, if needed
         
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
        });
    }
  };
  

   // header Table components 
   const headers = [  "Fokontany de","Commune de","District de", "Region de" , "", ""];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none'],
  
 ];
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
    <div className='p-4 bg-black mt-2 rounded-md'>
      <p className='text-white text-xl text-center'>Situation Geographique</p>
    </div>
   { isAuthenticated === true && (
     <div className='mt-2 '>
   
     <div className='flex flex-row'>
     <Label text="Taper ici une partie du nom du Fokontany" ></Label>
     <Input type="text"  className=" ml-2"></Input>
     <Button type="submit" children="Gestionnaire Collectivité" className="ml-2" ></Button>
     </div>
     <div className='mt-2  '>
         <Table headers={headers} data={data} classTable="overflow-y-auto h-16" ></Table>
         </div>
         <div className='flex justify-between mt-2'>
     <Label text="Region de:" ></Label>
     <Input type="text" placeholder="Region" className="ml-6" ></Input>
     <Input type="text" placeholder="Code postal"  ></Input>
     </div>
     <div className='flex justify-between mt-2'>
     <Label text="District de:" ></Label>
     <Input type="text" placeholder="District" className="ml-6" ></Input>
     <Input type="text" placeholder="Code postal"  ></Input>
     </div>
     <div className='flex justify-between mt-2'>
     <Label text="Commune de:" ></Label>
     <Input type="text" placeholder="Commune" ></Input>
     <Input type="text" placeholder="Code postal"  ></Input>
     </div>
     <div className='flex justify-between mt-2'>
     <Label text="Fokontany de:" ></Label>
     <Input type="text" placeholder="Region" ></Input>
     <Input type="text" placeholder="Code postal"  ></Input>
     </div>
         <div className='flex mt-2 justify-end'>
         
           <Button type="submit" children="Prise en Charge" ></Button>
         </div>
         </div>
   )}
       </div>
     )
     return (
       <div  className='bg-[#212122] h-screen w-screen'>
        <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
       </div>
     )
}

export default SituationGeographiqueIm