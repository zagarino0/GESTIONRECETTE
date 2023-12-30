import React, { useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import { Button } from '../../../components/button/button';
import axios from 'axios';

function DelivranceDuplicataRecepisse() {
const [recepisse , setRecepisse] = useState([])
const [numero_recepisse , setNumero_recepisse] = useState('');

  const DataHandler =  (e) =>{
    e.preventDefault();
    const Recepisse ={
      numero_recepisse
      
    };
    
    
    try {
       axios.post('http://localhost:3500/recette/recepisse', Recepisse)
       .then((response) => setRecepisse(response.data))
       .catch((error) => console.error(error));
      console.log("récépissé " , recepisse);
    } catch(error){
  console.error("il y a une erreur " , error)
    }
      
  }
    const headers = ['N° Récepissé', 'RF', 'Raison social', 'P1', 'P2',"Impôt","Nature Impôt"];
    const formattedData = [
  ["none","none","none","none","none","none","none"],
    ];
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
        Visualisation
            </div>
            <div>
              <BackButton to="/saisiDeclarationRecette"></BackButton>
            </div>
        </div>
          )
      return (
        <div className='bg-[#212122] h-screen w-full'>
         <Navbar content={NavbarContent}></Navbar>
         <div className='flex justify-center '>
<div className='flex flex-col mt-14'>
<Table headers={headers} data={formattedData} ></Table>
<div className='flex justify-between'>
<div className='flex flex-col mt-2'>
        <Label text="Date"></Label>
       <Input type="date" ></Input>
       </div>
       <div className='flex flex-col mt-2 '>
        <Label text="N° Récépissé"></Label>
       <Input type="text" placeholder="N° Récépissé..."
       value={numero_recepisse}
       onChange={(e)=> setNumero_recepisse(e.target.value)}
       ></Input>
       </div>
       <div className='flex flex-col mt-2 '>
        <Label text="RF"></Label>
       <Input type="text" placeholder="RF..."></Input>
       </div>

</div>
<div className='flex justify-between mt-4'>
    <Button children="Afficher" onClick={DataHandler}></Button>
    <Button children="Grouper par RF"></Button>
    <Button children="Imprimer"></Button>
    <Button children="Rafraîchir"></Button>
</div>
</div>
</div>
        </div>
      )
    }

export default DelivranceDuplicataRecepisse