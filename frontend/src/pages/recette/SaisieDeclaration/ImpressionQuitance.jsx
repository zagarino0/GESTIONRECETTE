import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../components/button/button'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'

function ImpressionQuitance() {
    const RecettePeriodique = localStorage.getItem("selectedDataRecettePeriodique");
    const Recette = JSON.parse(RecettePeriodique );
    console.log(Recette)
    
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
    
        return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
      };

      // impression 
  const printRef = useRef(null);

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
       Impression
            </div>
            <div>
              <BackButton to="/DelivranceDuplicataRecepisse"></BackButton>
            </div>
        </div>
          )
      
      return (
        <div className='bg-[#212122] h-screen w-full'>
         <Navbar content={NavbarContent}></Navbar>
         <div className='flex flex-col  p-4'>
<div className=' flex justify-center'>
<div ref={printRef} className='bg-white w-[1200px] h-[500px] rounded mt-4 p-4'>
<div className='flex justify-between'>
<div>
    <h1 className='text-2xl border-b-2 border-[#959824]'>Direction General Des Impots</h1>
    
    <h1 className='text-xl border-b-2 border-[#959824]'>Centre Fiscal</h1>

    <h1 className='mt-8 '>Centre Fiscal Mahajanga</h1>
    <h1 className='mt-2 '>Duplicata délivré le {formatDate(currentDateTime)}</h1>

</div>
<div>
    <h1 className='text-2xl border-b-2 border-[#959824] font-semibold'>REPOBLIKAN'I MADAGASIKARA</h1>
     <h2 className='text-sm border-b-2 border-[#959824]'>Fitiavana-Tanindrazana-Fandrosoana</h2>
     <div className='mt-8'>
        <h2 className='text-sm'>N° : </h2>
     </div>
</div>

</div>
<div className='flex justify-center'>
<div className='flex flex-col'>
<h1 className='text-xl font-semibold '>RECEPISSE DE DECLARATION</h1>
<div className='mt-2 flex flex-row '>
<h1 className='text-xl '>N° : {Recette.numero_recepisse}</h1>
<h1 className='text-xl ml-4'>Code : </h1>
</div>
<div>
    <h1 className='text-md mt-2'>L'agent soussigné , certifie avoir reçu de l'entreprise :</h1>
</div>
</div>
</div>
<div className='flex justify-between  mt-2'>
    <div className='flex flex-col'>
     <h1 className='text-md'>la déclaration suivante :</h1>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md '>Impôt :</h1>
    <h1 className='text-md ml-4'>{Recette.base_impot}</h1>
    </div>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md '>Année :</h1>
    <h1 className='text-md ml-4'>{Recette.annee}</h1>
    </div>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md '>Montant payé :</h1>
    <h1 className='text-md ml-4'>{Recette.montant_verser}</h1>
    </div>
    </div>
    <div className='flex flex-col'>
    <div className='flex flex-row'>
    <h1 className='text-md'>N° Identification fiscal :</h1>
    <h1 className='text-md ml-4'>{Recette.reference_fiscal}</h1>
    </div>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md '>Periode :</h1>
    <h1 className='text-md ml-4'>{Recette.periode}</h1>
    </div>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md '>Mode de paiement :</h1>
    <h1 className='text-md ml-4'>{Recette.type_payment}</h1>
    </div>
    <div className='flex flex-row mt-2'>
    <h1 className='text-md'> Fait à.....................</h1>
    <h1 className='text-md ml-4'>le.....................</h1>
    </div>
    </div>
</div>
<div className='mt-4 flex justify-center'>
<h1 className='text-md '>Cachet et Signature</h1>
</div>
</div>
</div>
<div className='flex justify-between mt-4'>
    <Button children="Imprimer" onClick={downloadPDF} ></Button>

    <Button children="Rafraîchir" onClick={()=>window.location.reload()}></Button>
</div>
</div>
        </div>
      )
    }

export default ImpressionQuitance