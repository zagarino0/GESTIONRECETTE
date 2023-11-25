import React from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import BackButton from '../../../components/button/BackButton'
import { Title2 } from '../../../components/title/title'
import SearchInput from '../../../components/input/SearchInput'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'

function SaisiAvisCredit() {

    // header Table components 
    const headers = [  "Num","réf. Bordereau","Date", "Montant Crédit" , "Total virement", "Crédit restant", "Date valeur", "Banque"];
        // header Table components 
        const headers2 = [  "Id","réf. avis","réf. O.V", "RF" , "Raison social", "Montant"];

    // data Table components  
   const data = [
    ['none', 'none', 'none', 'none' , 'none', 'none', 'none', 'none'],
   
  ];
  const data2 = [
    ['none', 'none', 'none', 'none' , 'none', 'none'],
   
  ];
  const NavbarContent =(
    <div className='flex justify-between' >
<Label text="Saisie/Visualisation des Avis de crédits" className="font-semibold"></Label>
<BackButton to="/AvisCredit"></BackButton>
    </div>
  )
  return (
    <div className='bg-[#212122]  h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='flex justify-center mt-4'>
    <div className='flex flex-col'>
    <div className='bg-black p-4 flex justify-center w-[1000px] rounded'>
        <Title2 text="Bordéreau des avis de crédits" className="font-semibold"></Title2>
      </div>
      <div className='flex justify-between mt-4'>
      <div className='flex flex-col '>
       <Title2 text="Bordeau N"></Title2>
       <Title2 text="Du" className="mt-6"></Title2>
       <Title2 text="Banque" className="mt-6"></Title2>
       <Title2 text="Date Valeur" className="mt-6"></Title2>
      </div>
      <div className='flex flex-col '>
        <SearchInput type="text" placeholder="Bordeau N..."></SearchInput>
        <SearchInput type="date" className="mt-2"></SearchInput>
        <SearchInput type="text" placeholder="Banque..." className=" mt-2"></SearchInput>
        <SearchInput type="date"  className="mt-2"></SearchInput>
      </div>
      <div className='flex flex-col '>
       <Title2 text="Montant Total"></Title2>
       <Title2 text="Nontant Exporté" className="mt-8"></Title2>
       <Title2 text="Montant Restant" className="mt-6"></Title2>
      
      </div>
      <div className='flex flex-col'>
        <Input type="text" placeholder="Montant Total..."></Input>
        <Input type="text" className="mt-2" placeholder="Nontant Exporté..."></Input>
        <Input type="text" className="mt-2" placeholder="Montant Restant..."></Input>
      </div>
      <div className='flex flex-col'>
       <Button children="Nouveau"></Button>
       <Button children="Enregistrer" className="mt-2"></Button>
       <Button children="Modifier" className="mt-2"></Button>
      </div>
      </div>
      <div className='w-[1000px] mt-4'>
      <Table headers={headers} data={data}  classTable="overflow-y-auto h-28" ></Table>
      </div>
      <div className='bg-black p-4 flex justify-center w-[1000px] rounded mt-4'>
        <Title2 text="Bordéreau des avis de crédits" className="font-semibold"></Title2>
      </div>
      <div className='flex justify-between mt-4'>
<div className='flex flex-col '>
<Title2 text="Réf. B.C.M."></Title2>
<Title2 text="Réf. O.V" className="mt-6"></Title2>
<Title2 text="RF" className="mt-6"></Title2>
<Title2 text="Raison social" className="mt-6"></Title2>
</div>
<div className='flex flex-col'>
<SearchInput type="text" placeholder="Réf. B.C.M..."  ></SearchInput>
<SearchInput type="text" placeholder="Réf. O.V..." className="mt-2" ></SearchInput>
<SearchInput type="text" placeholder="RF..." className="mt-2" ></SearchInput>
<SearchInput type="text" placeholder="Raison social..." className="mt-2"></SearchInput>
</div>
<div className='flex flex-col'>
<Title2 text="Montant virement"></Title2>
<Title2 text="Centre Gest."className="mt-6"></Title2>
</div>
<div className='flex flex-col'>
<Input type="text" placeholder="Montant virement..."></Input>
<Input type="text" placeholder="Centre Gest..." className="mt-2"></Input>
</div>
<div className='flex flex-col'>
<Button children="Nouveau"></Button>
<Button children="Enregistrer" className="mt-2"></Button>
<Button children="Modifier" className="mt-2"></Button>
</div>
      </div>
      <div className='w-[1000px] mt-4 overflow-y-auto h-24'>
      <Table headers={headers2} data={data2}  className=" w-[1000px] " ></Table>
      </div>
    </div>
      </div>
      </div>
  )
}

export default SaisiAvisCredit