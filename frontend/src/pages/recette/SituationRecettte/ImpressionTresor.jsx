import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import Label from '../../../components/title/label'
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import axios from 'axios'
import ReactSelect from 'react-select';
import Images from'../../../assets/images.jpg'
function ImpressionTresor() {
      // Navbar 
      const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white font-semibold '>
          Impression état détaille  encaissement par nature Impot
         </div>
         <div>
 <BackButton to="/SituationRecette"></BackButton>
         </div>
        </div>
     )

     
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(''); 
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState('')
  const [userCode, setUserCode] =useState([]);
  const [selectedChoice, setSelectedChoice] = useState(''); // Par défaut "Décade"

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
    .then((response) => {
      setData(response.data); 
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données', error);
    });
    
    // Mettre à jour la date actuelle au format "dd/mm/yyyy"
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR');
    setCurrentDate(formattedDate);

  }, []);

  const filteredData = recepisse.filter((item) => {
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      item.numero_recepisse &&
      item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });

  console.log(recepisse);

  const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment", "Date de creation"];
  const formattedData = filteredData.map(item => [
    item.numero_recepisse,
    item.reference_fiscal,
    item.annee,
    item.periode,
    item.periode1,
    item.periode2,
    item.numero_impot,
    item.base_impot,
    item.montant_a_payer,
    item.montant_verser,
    item.reste_a_payer,
    item.code_banque,
    item.type_payment,
    <DateFormatConverter isoDate={item.date_creation}></DateFormatConverter>
  ]);
  const formatDateToFrench = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
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

  const Choix = [
    "Decade",
    "Situation de recette ",
    "Extrait de recette"

  ]

     return (
      <div className='bg-[#212122] h-full w-full'>
        <Navbar content={Navbarcontent}></Navbar>
  
        <div className="flex flex-col p-4">
          <div className='flex flex-row '>
            <SearchInput value={searchTerm} placeholder={"Numéro récepisse"} className={`mt-8`} onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
            <div className='flex flex-col ml-2'>
              <Label text="Du"></Label>
              <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
            </div>
            <div className='flex flex-col ml-2'>
              <Label text="Au"></Label>
              <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
            </div>
            <div className='flex flex-col ml-2'>
             <Label text="Choix"></Label>
             <ReactSelect
             options={Choix.map(item =>({
              value: item,
              label: item
             }))}   
             className="mt-4 w-40"
             onChange={(e) => setSelectedChoice(e.value)}
          
             ></ReactSelect>
            </div>
          </div>
          <div ref={printRef} className="h-full p-4 bg-white m-4 ">
          <div className="mb-8">
            <h2 className="text-2xl text-center  font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
            <p className=' text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h2 className="text-xl text-center  font-bold m-4">COMMUNE URBAINE DE MAHAJANGA</h2>

              <div> 
                <img src={Images} alt="Logo" className="w-16 h-16" />
              <h4 className='font-semibold'>Bureau de recette : <br /> Commune Urbaine Mahajanga </h4>
              {/**
              <p>Code : {userCode}</p> {/* Code synchronisé * */}
              <p className='mt-2'>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
            </div>
            </div>

          <h1 className="font-bold text-xl text-center">ÉTAT DÉTAILLÉ DES AVIS DE CRÉDIT PAR NATURE D'IMPOT</h1>
          <h1 className='text-center font-bold text-xl mt-4'>
            {selectedChoice.toUpperCase()}
          </h1>

          <p className='text-center '>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au  { formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p>

            <div className='flex justify-center'>
      <table className="min-w-full mt-8">
        <thead className="border-b bg-gray-200">
          <tr>
            <th className="border px-4 py-2">compte Budget</th>
            <th className="border px-4 py-2">Nature Impôt</th>
            <th className="border px-4 py-2">Montant Recette</th>
            <th className="border px-4 py-2">Total cumulé du mois</th>
            <th className="border px-4 py-2">Total cumulée de l'année</th>
          </tr>
        </thead>
        <tbody>
        {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.compte_budget}</td>
                <td className="border px-4 py-2">{item.base_impot}</td>
                <td className="border px-4 py-2">{ item.montant_a_verser}</td>
                <td className="border px-4 py-2">{item.periode2}</td>
                <td className="border px-4 py-2">{item.annee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-4">TOTAL GENERALE =</td>
            </tr>
          )}
        </tbody>
      </table>
    
            </div>
     <div className=' mt-8'>
            <p className='text-right'>A Mahajanga, le {currentDate}</p> {/* Affichage de la date actuelle */}
            <p className='text-right'>Le Receveur </p>
          </div>
          </div>  
                 <Button children="Imprimer" onClick={downloadPDF} className="mt-4 w-[100px]"></Button>
        </div>
      </div>
    );
}
export default ImpressionTresor