import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../../components/button/button'
import Table from '../../../../components/table/Table'
import SearchInput from '../../../../components/input/SearchInput'
import { Navbar } from '../../../../components/navbar/Navbar'
import BackButton from '../../../../components/button/BackButton'
import DateFormatConverter from '../../../../components/input/DateFormatConvert'
import Images from '../../../../assets/images.jpg'
import axios from 'axios'


function ImpressionConsultationRegisseur() {
      // Navbar 
      const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white font-semibold '>
          Impression consultation de regisseur
         </div>
         <div>
 <BackButton to="/consultationRegisseur"></BackButton>
         </div>
        </div>
     )

     const [dataSelected, setDataSelected] = useState ([]);
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userCode, setUserCode] = useState('');
   const [selectedChoice, setSelectedOption] = useState('Décadaire'); // Par défaut "Décade"
   const [currentDate, setCurrentDate] = useState('');
   const [data, setData] = useState([]);
   
     // Utiliser l'effet pour récupérer les données depuis le localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("selectedDataRecettePeriodique");
    if (storedData) {
      setDataSelected(JSON.parse(storedData)); // Récupérer les données du localStorage
    }
  }, []);

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
    .then((response) => {
      setData(response.data); 
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données', error);
    });

       // Récupérer le code utilisateur depuis le backend
    axios.get('http://localhost:3500/recette/getUserCode')
    .then((response) => setUserCode(response.data.code))
    .catch((error) => console.error(error));

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


    // Gestion de la sélection d'option
  {/**  const handleOptionChange = (selectedOption) => {
      setSelectedOption(selectedOption.value);
    }; */}

     return (
      <div className='bg-[#22122] h-full w-[1770px]'>
        <Navbar content={Navbarcontent}></Navbar>
  
        <div className=" bg-[#212122] flex flex-col p-4">
          {/**<div className='flex flex-row '>
            <SearchInput value={searchTerm} placeholder={"Numéro récepisse"} className={`mt-8`} onChange={(e) => setSearchTerm(e.target.value)}></SearchInput>
            <div className='text-back flex flex-col ml-2'>
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

             onChange={handleOptionChange}
             className="mt-4 w-40"
             ></ReactSelect>
            </div>
          </div> */}

            <div  className="flex flex-col  h-full p-4">
            <div ref={printRef} className="mb-8 w-[1700px] bg-white p-6"> 
  <div className="text-center m-6">
    <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
            <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
  </div>
       
            <div className='font-semibold'>
              <img src={Images} alt="Logo" className="w-16 h-16" />
              <h4>Bureau de recette : <br /> Commune Urbaaine Mahajanga </h4>
            </div>
            
            <div>
              <p>Code : {userCode}</p> {/* Code synchronisé */}
              <p>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
            </div>

  <div className="text-center">
    <h2 className="font-bold text-2xl">CONSULTATION REGISSEURE</h2>
    
{/**
 * <p className='text-center'>par</p>   
 *  <h1 className='text-center font-bold text-xl'>
            {selectedChoice.toUpperCase()}
          </h1>
            <p className='text-center'>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au {formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p>
 */}
  
  </div>

  <table className="min-w-full bg-white border border-black mb-4 mt-4">
    <thead>
      <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
        <th className="border border-black px-4 py-2">N°récepissé</th>
        <th className="border border-black px-4 py-2">Référence fiscal</th>
        <th className="border border-black px-4 py-2">Année</th>
        <th className="border border-black px-4 py-2">Periode</th>
        <th className="border border-black px-4 py-2">P1</th>
        <th className="border border-black px-4 py-2">P2</th>
        <th className="border border-black px-4 py-2">Impôt</th>
        <th className="border border-black px-4 py-2">Nature d'impôt</th>
        <th className="border border-black px-4 py-2">Montant à payer en Ariary</th>
        <th className="border border-black px-4 py-2">Montant à verser en Ariary</th>
        <th className="border border-black px-4 py-2">Montant reste à payer en Ariary </th>
        <th className="border border-black px-4 py-2">Code Banque</th>
        <th className="border border-black px-4 py-2">Monde de payment </th>
        <th className="border border-black px-4 py-2">Date de création </th>
      </tr>
    </thead>
    <tbody>
    {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.numero_recepisse}</td>
                <td className="border px-4 py-2">{item.reference_fiscal}</td>
                <td className="border px-4 py-2">{item.annee}</td>
                <td className="border px-4 py-2">{item.periode}</td>
                <td className="border px-4 py-2">{item.periode1} Ar</td>
                <td className="border px-4 py-2">{item.periode2}</td>
                <td className="border px-4 py-2">{item.numero_impot}</td>
                <td className="border px-4 py-2">{item.base_impot}</td>
                <td className="border px-4 py-2">{item.montant_a_payer}</td>
               <td className='border px-4 py-2'>{item.montant_verser}</td>
               <td className='border px-4 py-2'>{item.reste_a_payer}</td>
               <td className='border px-4 py-2'>{item.code_banque}</td>
               <td className='border px-4 py-2'>{item.type_payment}</td>
               <td className='border px-4 py-2'>{item.date_creation}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">Aucun avis de crédit trouvé</td>
            </tr>
          )}
    </tbody>
  </table>

  <div className="mt-4 text-left">
    <p className="font-bold">TOTAL GENERAL =</p>
  </div>

  <div className="mt-6 text-right font-semibold">
  <p>Mahajanga le, {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
  <br />
    <p>Le Receveur Principal,</p>
  </div>
            </div>
            </div>
          <div className='text-left'>
          <Button  children="Imprimer" onClick={downloadPDF} className="w-[120px] mt-2 m-6"></Button>
          </div>
        </div>
      </div>
    );
}
export default ImpressionConsultationRegisseur