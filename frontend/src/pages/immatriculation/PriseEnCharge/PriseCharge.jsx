import React , { useState, useEffect }from 'react'
import { Layout } from './Layout'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import axios from 'axios';

function PriseCharge() {
    const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchTerm) {
     // console.log(searchTerm)
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${searchTerm}`)
        .then((response) => {
          setData(response.data);
         
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);
    const contentChildren =(
        <div>
                <div className='flex flex-col pr-4 pl-4 py-2'>
                     
           <div >        
           <div className=" flex flex-row">
<Label text="RF" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
{data.length > 0 ? data[0].nif : 'Aucune donnée'}
</p>
<Label text="N° Statistique" className="ml-8 text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
           </div>
<div className='flex justify-between '>
<div className='flex flex-col w-[500px]'>
<div className="flex justify-between mt-1">
<Label text="Raison social" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
{data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Nom Commercial" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  {data.length > 0 ? data[0].nom_commercial : 'Aucune donnée'}
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Adresse" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px] text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Activité principal"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Forme juridique" className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="N° téléphone"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>
</div>
<div className='flex flex-col w-[500px]'>

<div className="flex justify-between mt-2">
<Label text="Regime Fiscal"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Début exercice"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Fin exercice"className="text-[15px]"></Label>
<p className='text-xl ml-2 text-white text-[15px]'>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
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
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
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
<div className='mt-2 flex justify-between'>
<div className='flex flex-row'>
<Label text="RF"></Label>
<Input type="text" placeholder="RF" className="ml-4 h-10"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
></Input>
</div>
<div className='flex flex-row'>
<Label text="N° Statistique"></Label>
<Input type="text" placeholder="N° Statistique" className="ml-4 h-10"></Input>
</div>
<div className='flex flex-row'>
<Label text="N° CIN"></Label>
<Input type="text" placeholder="N° CIN" className="ml-4 h-10"></Input>
</div>
<Button children="Prise en Charge"></Button>
</div>
      
        </div>
        
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