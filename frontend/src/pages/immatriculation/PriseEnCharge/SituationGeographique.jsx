import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Layout } from './Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../../components/modals/Modal';

function SituationGeographiqueIm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  const [Geograph, setGeograph] = useState([]);
  const [Data , setData] = useState([]);
  let navigate = useNavigate();
  const [isModalError, setIsModalError] = useState(false);
  const [isModalSucess, setIsModalSuccess] = useState(false);

 
   
  useEffect(() => {
    if (referenceFiscal) {
      axios.get(`http://localhost:3500/client/${referenceFiscal}`)
        .then((response) => {
          const data = response.data;
          console.log(data.commune)
          if ( data) {
            // Convert the object values to an array
    ;
           
            setGeograph(data);
            console.log('Data received:', data);
          } else {
            console.error('Invalid data format:', data);
            setIsModalError(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsModalError(true);
        });
    }
  }, [referenceFiscal]);
  
  

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
         setIsModalSuccess(true);
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
          setIsModalError(true);
        });
    }
  };
  

   // header Table components 
   const headers = ["Adresse",  "Fokontany de","Commune de","District de", "Region de" ];

   // data Table components  
 const DataGeograph = [
  [Geograph.adresse,Geograph.fokontany , Geograph.commune , Geograph.district, Geograph.region]
 ]   
   const BodyContent = (
       <div className='m-4'>
            
    <div className='p-4 bg-black mt-2 rounded-md'>
      <p className='text-white font-semibold text-xl text-center'>Situation Geographique</p>
    </div>
  
     <div className='mt-6 '>
   
     {/* <div className='flex flex-row'>
     <Label text="Taper ici une partie du nom du Fokontany" ></Label>
     <Input type="text"  className=" ml-2"></Input>
     <Button type="submit" children="Gestionnaire Collectivité" className="ml-2" ></Button>
     </div> */}
     <div className='mt-4 flex justify-center '>
         <Table headers={headers} data={DataGeograph}></Table>
         </div>
         {/* <div className='flex justify-between mt-2'>
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
     </div> */}
         <div className='flex mt-2 justify-end'>
         
           <Button type="submit" children="Prise en Charge" onClick={handlePriseEnCharge} ></Button>
         </div>
         </div>
 
       </div>
     )
     return (
       <div  className='bg-[#212122] h-screen w-screen'>
        <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
        <Modal isOpen={isModalError} onClose={()=> setIsModalError(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Il y a une erreur" className="text-xl"></Label>
<Button children="OK"  onClick={()=> setIsModalError(false)} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isModalSucess} onClose={()=> setIsModalSuccess(false)} className="w-[500px] h-[200px]">
          <div className='flex  justify-center'>
            <div className='flex flex-col mt-14'>
            <Label text="Donné prise en charge" className="text-xl"></Label>
<Button children="OK"  onClick={()=> navigate("/PriseChargeIm")} className="mt-4"></Button>
            </div>
          </div>
        </Modal>
       </div>
     )
}

export default SituationGeographiqueIm