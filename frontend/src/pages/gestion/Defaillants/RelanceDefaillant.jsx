import React from 'react'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import ReactSelect from 'react-select';

function RelanceDefaillant() {
    // header Table components 
    const headers = [  " RF ", "Raison social [Nom et Prenom]", "Nom Commercial", "Adresse" ];

    // data Table components  
   const data = [
    ['none', 'none', 'none', 'none' ],
   
  ];
  const NavbarContent = (
      <div className='flex justify-between'>
      <div className='text-white'>
      Relance des défaillants    
        </div>
          <div>
            <BackButton to="/Defaillant"></BackButton>
          </div>
      </div>
        )
        return (
          <div  className='bg-[#212122] h-screen w-screen'>
              <Navbar content={NavbarContent}></Navbar>
       <div className='m-4'>
             <div className='bg-black p-4 flex flex-col'>
             <div className='flex justify-between'>
               <Label text="5-IRSA"></Label>
              <Label text="6-Impôt Synthétique" className="ml-4"></Label>
              <Label text="7-IRCM" className="ml-4"></Label>
              <Label text="22-TVA Mensuelle" className="ml-4"></Label>
              <Label text="24- DA [local]" className="ml-4"></Label>
              <Label text="6-Impôt de Licence BA" className="ml-4"></Label>
      
             </div>
                 <div className='flex justify-between mt-4'>
               <Label text="27-Taxes sur les App Auto"></Label>
              <Label text="32-TACAVA" className="ml-4"></Label>
              <Label text="34-Prel. Pdts Jeux" className="ml-4"></Label>
              <Label text="45-TSPJ Sport" className="ml-4"></Label>
              <Label text="61-Impôt sur les Revenus" className="ml-4"></Label>
              <Label text="65-Prél.Pd Alcoliques" className="ml-4"></Label>
      
             </div>
       </div>
        <div className='bg-black p-4 mt-2 flex  flex-row'>
        <div className='flex justify-between'>
        <Label text="Entrez votre choix "></Label>
        <Input type="text" className="w-16 h-10"></Input>
       </div>
         <div className='flex justify-between ml-2 '>
        <Label text="Date clôture de l'Exercice IR/IS "></Label>
        <ReactSelect className=''></ReactSelect>
       </div>
         <div className='flex justify-between ml-2 '>
        <Label text="Période "></Label>
         <ReactSelect className='ml-2'></ReactSelect>
        <ReactSelect className='ml-2'></ReactSelect>
       </div>
       <div className='flex justify-between ml-2 '>
        <Label text="P1 "></Label>
        <Input type="text" className="ml-2 w-16 h-10"></Input>
         <Label text="P2 " className="ml-2"></Label>
        <Input type="text"  className="ml-2 w-16 h-10"></Input>
         <Label text="Exercice/Année" className="ml-2"></Label>
        <Input type="text"  className="ml-2 w-16 h-10"></Input>
       
       </div>
        <Button type="submit" children="Obligation et Périodicités" className="ml-4 "></Button>
       </div>
        <div className='mt-2  flex justify-center'>
       <Table headers={headers} data={data} classTable="overflow-y-auto h-80" ></Table>
       </div>
       <div className='flex justify-between'>
         <Button type="submit" children="Exécuter " ></Button>
         <Button type="submit" children="Régime fiscaux "  ></Button>
         <Button type="submit" children="Imprimer [listing] " onClick={ () => {window.location.href = "/Listing"}} ></Button>
         <Button type="submit" children="Imprimer TVA" onClick={ () => {window.location.href = "/TVA"}} ></Button>         
         <Button type="submit" children="Imprimer Autres Impôts" onClick={() => {window.location.href="/AutreImpot"}}></Button>
         <Button type="submit" children="Imprimer IR-IS-DA " onClick={ () => {window.location.href = "/IRISDA"}} ></Button>
         <Button type="submit" children="Imprimer IRSA-IRCM" onClick={ () => {window.location.href = "/IRSAIRCM"}} ></Button>
         <Button type="submit" children="Quitter" onClick={ () => {window.location.href = "/Defaillant"}} ></Button>
       </div>
          </div>
          </div>
        )
}

export default RelanceDefaillant