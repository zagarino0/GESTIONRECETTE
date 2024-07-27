import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';

function ConsultationDetailRecette() {
  const [recepisse , setRecepisse] = useState([])

const [searchTerm , setSearchTerm] = useState('');

useEffect(() => {
  // Récupérer les données depuis le backend
  axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
    .then((response) => setRecepisse(response.data))
    .catch((error) => console.error(error));
}, []);

const filteredData = recepisse.filter((item) => 
  item.reference_fiscal && item.reference_fiscal.toLowerCase().includes(searchTerm.toLowerCase())
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

  
    const printRef = useRef(null);
  // Impression
  const downloadPDF = () => {
    // Use querySelector to get the table element
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
  
      // Ajoutez une feuille de style pour l'impression
      const printStyle = document.createElement('style');
      printStyle.innerHTML =
        '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
      document.head.appendChild(printStyle);
  
      document.body.innerHTML = `<div class="print-content">${content}</div>`;
  
      window.print();
  
      // Supprimez la feuille de style après l'impression
      document.head.removeChild(printStyle);
  
      // Restaurez le contenu original après l'impression
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

    const NavbarContent = (
      <div className='flex justify-between'>
      <div className='text-white font-semibold'>
      Visualisation
          </div>
          <div>
            <BackButton to="/consultationRecette"></BackButton>
          </div>
      </div>
        )
    return (
      <div className='bg-[#212122] h-screen w-full'>
       <Navbar content={NavbarContent}></Navbar>
       <div className='flex flex-col  p-4'>
       <SearchInput onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
<div className=' flex justify-center'>
<div ref={printRef} className='flex flex-col mt-14 overflow-y-auto w-[1600px] '>
<Table headers={headers} data={formattedData} 

></Table>


</div>
</div>
<div className='flex justify-between mt-4'>
  <Button children="Imprimer" onClick={downloadPDF}></Button>

  <Button children="Rafraîchir" onClick={()=>window.location.reload()}></Button>
</div>
</div>
      </div>
      )
    }
export default ConsultationDetailRecette