import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Label from '../../../components/title/label';
import axios from 'axios';

function PrevisonAnnuelle() {
   
  const [dataCode, setDataCode] = useState([]);
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prevision')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);


  const headers = ["Année" ,"Num_imp" , "Libella", "code_Prev", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", "Montant"];
  const data = [['none','none', 'none', 'none', 'none', 'none', 'none', 'none'],];
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour prévisions
    </div>
    <div>
      <BackButton to="/parametreParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen '>
    <Navbar content={NavbarContent}></Navbar>
    <div className=' m-4 flex justify-between  '>
      <div className='flex flex-row mt-4 '>
<Label text="Exercice"></Label>
<Input type="text" className="h-12 w-16 ml-2"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Mois"></Label>
<Input type="text" className="h-12 w-16 ml-2"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Prévision"></Label>
<Input type="text" className="h-12 w-16 ml-2"></Input>
      </div>
      <div className='flex justify-between mt-4'>
<Label text="Code impot"></Label>
<Input type="text" className="h-12 w-16 ml-2"></Input>
      </div>
     
      <div className='flex justify-between mt-4'>
<Label text="Montant Prev. en Ar."></Label>
<Input type="text" className="h-12 ml-2"></Input>
      </div>
  
    </div>
    <div className='flex m-4 justify-between  '>
<Button children="Enregistrer"></Button>
<Button children="Nouveau" ></Button>

    </div>
    <div className='m-4 ' >
<Table headers={headers} data={data} ></Table>

    </div>
   
  </div>
  )
}

export default PrevisonAnnuelle