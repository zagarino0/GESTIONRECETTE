import React , { useState, useEffect }from 'react'
import { Layout } from './Layout'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import axios from 'axios';

function PriseCharge() {
    const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ setIsDataVerified] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${searchTerm}`)
        .then((response) => {
          setData(response.data);
        setIsLoading(false);
       
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);

  const handlePriseEnCharge = () => {
    // Perform data verification logic here
    if (searchTerm) {
      // Data is verified, set isDataVerified to true
      setIsDataVerified(true);
  
      // Update the data object with the prise_charge property
      const updatedData = { ...data, prise_charge: true };
      setData(updatedData);
  
      // Send the updated data to the backend
      axios.post('http://localhost:3500/prisecharge', updatedData)
        .then((response) => {
          // Handle the response from the backend, if needed
          console.log('Verification data sent successfully');
        })
        .catch((error) => {
          console.error('Error sending verification data:', error);
        });
    }
  };
  
  
    const contentChildren =(
        <div>
          {isLoading ? (
 <div className='flex justify-center mt-4'>
 <Label className="text-3xl" text="Aucun resultat"></Label>
 </div>
) : (
                <div className='flex flex-col pr-4 pl-4 py-2'>
                     
           <div >        
           <div className=" flex flex-row">
<Label text="RF" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
{data.nif }
</p>
<Label text="N° Statistique" className="ml-8 text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  { data.numero_statistique }
</p>
           </div>
<div className='flex justify-between '>
<div className='flex flex-col w-[500px]'>
<div className="flex justify-between mt-1">
<Label text="Raison social" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
{ data.raison_sociale}
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Nom Commercial" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  { data.nom_commerciale }
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Adresse" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  {data.adresse }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Activité principal"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  { data.activite }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Forme juridique" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  { data.forme_juridique}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Type"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  { data.type }
</p>
</div>
</div>
<div className='flex flex-col w-[500px]'>

<div className="flex justify-between mt-2">
<Label text="Regime Fiscal"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  { data.regime_fiscal }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Début exercice"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.date_debut_exe }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Fin exercice"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  { data.date_cloture_exe}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="RCS"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="N° agrément"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.reference_agrement }
</p>
</div>
</div>
    </div>
    <Label text="Actionnaires" className="text-2xl font-bold mt-2"></Label>
    <div className='flex justify-between mt-2'>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Nom acti.1"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nom acti.2"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nom acti.3"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nom acti.4"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
</div>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Nom acti.5"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nom acti.6"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nom acti.7"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Adresse"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] '>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
</div>
 
    </div>

      
        </div>
        
        </div>
       
)}
<div className='m-2 flex justify-between'>
<div className='flex flex-row'>
<Label text="RF"></Label>
<Input type="text" placeholder="RF" className="ml-4 h-10"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
></Input>
</div>

<Button children="Prise en Charge" onClick={handlePriseEnCharge}></Button>

</div>
     </div>
        )
      return (
     <div  className='bg-[#212122] h-screen w-screen'>
        <Layout children={contentChildren}></Layout>
     </div>
      )
}


export default PriseCharge