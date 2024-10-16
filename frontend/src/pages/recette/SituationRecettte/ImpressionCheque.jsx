import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/button/button';
import BackButton from '../../../components/button/BackButton';
import { Navbar } from '../../../components/navbar/Navbar';
import SearchInput from '../../../components/input/SearchInput';
import Label from '../../../components/title/label';
import axios from 'axios';
import Input from '../../../components/input/Input';
import Images from '../../../assets/images.jpg';

function ImpressionEtatDetailleEncaissementEspece() {
  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>Impression situation de la recette</div>
      <BackButton to="/SituationRecette" />
    </div>
  );

  const [data, setData] = useState([]);
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // Recherche par numéro de récepissé
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');


  useEffect(() => {
    // Récupération des données d'enregistrements
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));

    // Formatage de la date actuelle
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR');
    setCurrentDate(formattedDate);
  }, []);

  // Filtrer les données par numéro de récepissé et date
  const filteredData = recepisse.filter((item) => {
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      // Filtre par numéro de récepissé
      item.numero_recepisse &&
      item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase()) &&

      // Filtre par dates
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });

  // Calcul de la somme totale des montants versés
  const totalGeneral = filteredData.reduce((acc, item) => acc + parseFloat(item.montant_verser || 0), 0);
  const TotalGeneral = filteredData.reduce((acc, item) => acc + parseFloat(item.montant_a_payer || 0), 0);
  // Format de la date pour affichage en français
  const formatDateToFrench = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
  };

  const printRef = useRef(null);

  // Fonction pour générer et imprimer le PDF
  const downloadPDF = () => {
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      const printStyle = document.createElement('style');
      printStyle.innerHTML = '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
      document.head.appendChild(printStyle);

      document.body.innerHTML = `<div class="print-content">${content}</div>`;
      window.print();

      document.head.removeChild(printStyle);
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className='bg-[#212122] w-full'>
      <Navbar content={NavbarContent} />
      <div className="flex flex-col p-4">
        <div className='flex flex-row'>
          {/* Recherche par numéro de récepissé */}
          <SearchInput value={searchTerm} placeholder="Numéro récepissé" className='mt-8' onChange={(e) => setSearchTerm(e.target.value)} />
          
          <div className='text-back flex flex-col ml-2'>
            <Label text="Du" />
            <Input type='date' className="mt-4 font-semibold" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='flex flex-col ml-2'>
            <Label text="Au" />
            <Input type='date' className="mt-4 font-semibold" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="p-8 bg-white w-full" ref={printRef}>
        <div className='flex justify-between items-start'>
          <div className="text-center m-6">
            <h2 className="text-2xl font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
            <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA</p>
            <h1 className="text-3xl font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
          </div>
          <div className='ml-80'>
            <img src={Images} alt="Logo" className="w-16 h-16" />
            <h4>Bureau de recette : <br />Commune Urbaine Mahajanga</h4>
          </div>

          <div>
            <p>Code :</p>
            <p>Date : {currentDate}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <h1 className="font-bold text-3xl">ÉTAT DÉTAILLÉ DES AVIS DE CRÉDIT PAR CHEQUE</h1>
          <p className='text-center'>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au {formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p>
        </div>

        <table className="min-w-full mt-8 border border-black">
          <thead className="border-b bg-gray-200">
            <tr>
              <th className="border px-4 py-2">BANQUE</th>
              <th className="border px-4 py-2">N°CHEQUE</th>
              <th className="border px-4 py-2">ETABLISSEMENT PAYEUR</th>
              <th className="border px-4 py-2">MONTANT PARTIEL</th>
              <th className="border px-4 py-2">MONTANT CUMULEE</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.code_banque}</td>
                  <td className="border px-4 py-2">{item.numero_cheque}</td>
                  <td className="border px-4 py-2">{item.etablissement_payeur}</td>
                  <td className="border px-4 py-2">{item.montant_verser}</td>
                  <td className="border px-4 py-2">{item.montant_a_payer}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucun avis de crédit trouvé</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Affichage du total général */}
        <div className="font-semibold text-xl mt-8 flex justify-between">
          <p>TOTAL GENERAL MONTANT PARTIEL: {totalGeneral.toLocaleString()} Ar</p>
          <p>TOTAL GENERAL MONTANT CUMULEE: {TotalGeneral.toLocaleString()} Ar</p>
        </div>

        <div className="mt-8">
          <p className='text-right'>À Mahajanga, le {currentDate}</p>
          <p className='text-right'>Le Receveur</p>
        </div>
      </div>

      <Button onClick={downloadPDF} className="mt-4">Imprimer</Button>
    </div>
  );
}

export default ImpressionEtatDetailleEncaissementEspece;
