import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table';
import { Title3 } from '../../../components/title/title';
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Checkbox from '../../../components/button/Checkbox';
import ReactSelect from 'react-select';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
function VisualisationResteRecouvrer() {
  const [recepisse , setRecepisse] = useState([])

  const [searchTerm , setSearchTerm] = useState('');
  
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);
  
  const filteredData = recepisse.filter((item) => 
    item.numero_recepisse && item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
  
  console.log(recepisse)
      const headers = ['N° Récepissé', 'Référence Fiscal',  'année', "Période", 'P1', 'P2',"Impôt","Nature Impôt" , "montant à payer" , "montant à verser" , "reste à payer" , "Code Banque" , "Mode de payment"];
      const formattedData =  filteredData.map(item => [
        item.numero_recepisse, 
        item.reference_fiscal, 
        item.annee, 
        item.periode, 
        item.periode1, 
        item.periode2, 
        item.numero_impot,
        item.base_impot ,
        item.montant_a_payer ,
        item.montant_verser , 
        item.reste_a_payer ,
        item.code_banque ,
        item.type_payment   
      ]);
  
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
          Visualisation et Exportation des Recettes à Recouvres
            </div>
            <div>
             <BackButton to="/ResteRecovreRecette"></BackButton> 
            </div>
        </div>
          )
  return (
    <div className='bg-[#212122]  h-full w-full'>
    <Navbar content={NavbarContent} ></Navbar>
    <div className='ml-4 mt-4'>
     <SearchInput  onChange={(e) => setSearchTerm(e.target.value)} ></SearchInput>
    </div>
    <div className='flex justify-center mt-4 p-4'>
    <Table headers={headers} data={formattedData} classTable="overflow-y-auto h-40" ></Table>
    </div>
    <div className='m-4 flex justify-between'>
     <Title3 text="Référence fiscal" ></Title3>
     <Title3 text="Nom et Prénom" className="ml-4"></Title3>
     <Title3 text="Type d'impôt" className="ml-4"></Title3>    
    </div>
    <div className='flex justify-between'>
    <div className='flex flex-col w-[200px] m-4'>
    <div className='flex flex-col'>
    <Label text="Reste à payer"></Label>
    <Input type="text" placeholder="Reste à payer..." className="mt-1"></Input>
    </div>
    <div className='mt-4'>
        <Checkbox label="à payé ou versé"></Checkbox>
    </div>
    <div className='flex flex-col mt-4'>
    <Label text="Total Verser"></Label>
    <Input type="text" placeholder="Total verser..." className="mt-1"></Input>
    </div>
    <div className='flex flex-col mt-4'>
    <Label text="Reste à recouvrer"></Label>
    <Input type="text" placeholder="Reste à recouvrer..." className="mt-1"></Input>
    </div>
    </div>
    
    <div className='flex flex-col w-[200px] m-4'>
    <div className='flex flex-col'>
    <Label text="Numéro chèque"></Label>
    <Input type="text" placeholder="Numéro chèque..." className="mt-1"></Input>
    </div>
    
    <div className='flex flex-col mt-4'>
    <Label text="Numéro de compte"></Label>
    <Input type="text" placeholder="Numéro de compte..." className="mt-1"></Input>
    </div>
    <div className='flex flex-col mt-4'>
    <Label text="Code banque"></Label>
    <ReactSelect className='mt-1'></ReactSelect>
    </div>
    </div>
    <div className='flex flex-col w-[200px] m-4'>
    <div className='flex flex-col'>
    <Label text="Nom de la banque"></Label>
    <Input type="text" placeholder="Nom de la banque..." className="mt-1"></Input>
    </div>
    
    <div className='flex flex-col mt-4'>
    <Label text="Référence Ordre de Virement"></Label>
    <Input type="text" placeholder="Référence O.V..." className="mt-1"></Input>
    </div>
    <div className='flex flex-col mt-4'>
    <Label text="Date O.V"></Label>
    <ReactSelect className='mt-1'></ReactSelect>
    </div>
    </div>
    <div className='fex flex-col m-4 w-[200px]'>
     <Label text="Mode de paiment"></Label>
     <Checkbox label="Espèce" className="mt-4"></Checkbox>
     <Checkbox label="Chèque" className="mt-4"></Checkbox>
     <Checkbox label="Virement" className="mt-4"></Checkbox>
     <Checkbox label="Autre" className="mt-4"></Checkbox>
     
    </div>
    </div>
    <div className='flex flex-row m-4'>
        <Label text="Ppl Recep. N"></Label>
        <Input type="text" className="w-28 ml-4"></Input>
        <Checkbox label="Créance" className="ml-4"></Checkbox>
        <Input type="text" className="ml-4 w-28"></Input>
        <Checkbox label="Récepissé" className="ml-4"></Checkbox>
        <Input type="text" className="ml-4 w-28"></Input>
        <Checkbox label="RF" className="ml-4"></Checkbox>
        <Input type="text" className="ml-4 w-28"></Input>
        <Checkbox label="Tous non payé" className="ml-4"></Checkbox>

    </div>
    <div className='bg-[#212122] flex justify-between m-4'>
     <Button children="Afficher"></Button>
     <Button children="En caisse"></Button>
     <Button children="Vers Excel"></Button>
     <Button children="Lettre de Rélance"></Button>
    </div>
    </div>
  )
}

export default VisualisationResteRecouvrer