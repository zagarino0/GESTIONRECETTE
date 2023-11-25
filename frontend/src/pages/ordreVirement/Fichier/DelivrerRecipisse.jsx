import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Label from '../../../components/title/label'
import Table from '../../../components/table/Table';
import { Title2 } from '../../../components/title/title';
import Input from '../../../components/input/Input';
import { Button } from '../../../components/button/button';

function DelivrerRecipisse() {
        // header Table components 
        const headers = [  "Année","P1","P2", "N° Impot" , "Nat Impot", "Ppl", "Montant à payer", "Total versé", "Reste_ar", "N° Quittance", "Date Paiement"];

        // data Table components  
       const data = [
        ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
       
      ];
  const NavbarContent =(
    <div className='flex justify-between' >
<Label text="Visualisation" className="font-semibold"></Label>
<BackButton to="/Fichier"></BackButton>
    </div>
  )
  return (
    <div className='bg-[#212122]  h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='flex justify-center items-center mt-8'>
  <div className='flex flex-col'>
  <Table headers={headers} data={data} ></Table>
  <div className='flex justify-between mt-8'>
  <div className='flex flex-col'>
  <Title2 text="Date O.V"></Title2>
  <Input type="date" className="mt-2"></Input>
  </div>
  <div className='flex flex-col'>
  <Title2 text="N° Récépissé (J.T.R.O.V)"></Title2>
  <Input type="text" className="mt-2"></Input>
  </div>
  <div className='flex flex-col'>
  <Title2 text="Référence Fiscal"></Title2>
  <Input type="text" className="mt-2"></Input>
  </div>
  <div className='flex flex-col'>
  <Title2 text="Ref. Avis de Crédit"></Title2>
  <Input type="text" className="mt-2"></Input>
  </div>
  <div className='flex flex-col'>
  <Title2 text="Date AC."></Title2>
  <Input type="date" className="mt-2"></Input>
  </div>
  </div>
  <div className='flex justify-between mt-8'>
 <Button children="Afficher"></Button>
 <Button children="Non Exporter"></Button>
 <Button children="Rafraîchir"></Button>
 <Button children="Expoter"></Button>
  </div>
  </div>
      </div>
    </div>
  )
}

export default DelivrerRecipisse