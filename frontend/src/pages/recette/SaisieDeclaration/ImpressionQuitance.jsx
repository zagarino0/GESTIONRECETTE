import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import Images from '../../../assets/images.jpg';

function ImpressionQuitance() {
  const [dataSelected, setDataSelected] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const printRef = useRef(null);

  // Utiliser l'effet pour récupérer les données depuis le localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("selectedDataRecettePeriodique");
    if (storedData) {
      setDataSelected(JSON.parse(storedData)); // Récupérer les données du localStorage
    }
  }, []);

  // Mettre à jour la date actuelle chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Formater la date
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fonction pour l'impression
  const downloadPDF = () => {
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      // Ajouter un style d'impression
      const printStyle = document.createElement('style');
      printStyle.innerHTML =
        '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
      document.head.appendChild(printStyle);

      document.body.innerHTML = `<div class="print-content">${content}</div>`;
      window.print();

      document.head.removeChild(printStyle);

      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>Impression</div>
      <div>
        <BackButton to="/DelivranceDuplicataRecepisse" />
      </div>
    </div>
  );

  if (!dataSelected) {
    return (
      <div className='bg-[#212122] h-screen'>
        <Navbar content={NavbarContent} />
        <div className='flex justify-center items-center h-full'>
          <p className='text-white'>Aucune donnée sélectionnée pour l'impression.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#212122] '>
      <Navbar content={NavbarContent} />
      <div className='flex flex-col p-4'>
        <div className='flex justify-center'>
          <div ref={printRef} className='bg-white w-[1200px] h-[600px] rounded mt-4 p-4'>
            <div className='text-center'>
              <h1 className='text-2xl font-semibold'>REPOBLIKAN'I MADAGASIKARA</h1>
              <h2 className='text-sm'>Fitiavana-Tanindrazana-Fandrosoana</h2>
            </div>
            <div className='justify-between'>
              <div>
                <img src={Images} alt="Logo" className="w-16 h-16 ml-4" />
                <h1 className='text-1xl'>Commune urbaine de Mahajanga</h1>
                <h1 className='mt-2'>Duplicata délivré le {formatDate(currentDate)}</h1>
              </div>
              <div className='mt-8'>
                <h2 className='text-sm font-bold'>N° : {dataSelected.numero_recepisse}</h2>
              </div>
            </div>

            <div className='flex justify-center'>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-semibold'>RECEPISSE DE DECLARATION</h1>
                <div className='mt-2 flex flex-row'>
                  <h1 className='text-xl'>N° :</h1>
                  <h1 className='text-xl ml-4 font-bold'>{dataSelected.numero_recepisse}</h1>
                </div>
                <div>
                  <h1 className='text-md mt-2'>L'agent soussigné certifie avoir reçu de l'entreprise :</h1>
                </div>
              </div>
            </div>

            <div className='flex justify-between mt-2'>
              <div className='flex flex-col'>
                <h1 className='text-md'>La déclaration suivante :</h1>
                <div className='flex flex-row mt-2 font-semibold'>
                  <h1 className='text-md'>Impôt :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.base_impot}</h1>
                </div>
                <div className='flex flex-row mt-2 font-semibold'>
                  <h1 className='text-md'>Année :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.annee}</h1>
                </div>
                <div className='flex flex-row mt-2 font-semibold'>
                  <h1 className='text-md'>Montant payé :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.montant_verser}</h1>
                </div>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-row font-semibold'>
                  <h1 className='text-md'>N° Identification fiscal :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.reference_fiscal}</h1>
                </div>
                <div className='flex flex-row mt-2 font-semibold'>
                  <h1 className='text-md'>Période :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.periode}</h1>
                </div>
                <div className='flex flex-row mt-2 font-semibold'>
                  <h1 className='text-md'>Mode de paiement :</h1>
                  <h1 className='text-md ml-4'>{dataSelected.type_payment}</h1>
                </div>
                <br />
                <div className='flex flex-row mt-2 '>
                  <h1 className='text-md'>Fait à Mahajanga</h1>
                  <h1 className='text-md ml-4'>le {formatDate(currentDate)}</h1>
                </div>
              </div>
            </div>

            <div className='mt-4 flex justify-center'>
              <h1 className='text-md'>Cachet et Signature</h1>
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <Button children="Imprimer" onClick={downloadPDF} />
          <Button children="Rafraîchir" onClick={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
}

export default ImpressionQuitance;
