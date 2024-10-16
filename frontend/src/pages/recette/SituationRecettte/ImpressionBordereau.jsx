import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Table from '../../../components/table/Table';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
import Input from '../../../components/input/Input';
import Images from '../../../assets/images.jpg'

function ImpressionBordereau() {
    const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white font-semibold '>
            Impression BORDEREAU
          </div>
          <div>
            <BackButton to="/SituationRecette"></BackButton>
          </div>
        </div>
      );

    const [data, setData] = useState([]);
    const [recepisse, setRecepisse] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userCode, setUserCode] = useState('');


    // Récupérer les données depuis le backend
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
        .then((response) => {
          setUserCode(response.data); 
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données', error);
        });
      }, []);

      const printRef = useRef(null);
      
  const filteredData = recepisse.filter((item) => {
    const baseImpot = item.base_impot && item.base_impot.toLowerCase().includes(searchTerm.toLowerCase());
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      baseImpot &&
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });

  console.log(recepisse);


  const downloadPDF = () => {
    if (printRef.current) {
      const content = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

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
    
  return (
  <div className='bg-[#222122] h-[1000px] w-full'>
        <div className="flex justify-between items-center"></div>
        <Navbar content={Navbarcontent}></Navbar>
    <div>
    <div  ref={printRef} className="border p-8 w-full bg-white">
    <div className='flex justify-between items-start'>
            <div className="text-center m-6">
              <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
              <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
            </div> 
            <div>     
              <img src={Images} alt="Logo" className="w-16 h-16" />
              <h4>Bureau de recette : <br />Commune Urbaine Mahajanga</h4>
            </div>
       
            <div>
              <p>Code : {userCode}</p>
              <p>Date : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
      <h2 className="text-center font-bold text-lg">
        BORDEREAU DE VERSEMENT DE CHEQUES
      </h2>
      <p className="text-center">
        Effectué à nos Caisses par M. Le Receveur
      </p>
      <div className="text-center">
      <p className='text-center mt-2'>du {new Date(startDate).toLocaleDateString('fr-FR')} au {new Date(endDate).toLocaleDateString('fr-FR')}</p>
      </div>

      <table className="min-w-full mt-8 border border-black">
        <thead>
          <tr>
            <th className="border px-4 py-2">BANQUE</th>
            <th className="border px-4 py-2">N° CHEQUE</th>
            <th className="border px-4 py-2">ETABLISSEMENT PAYEUR</th>
            <th className="border px-4 py-2">MONTANT PARTIEL</th>
            <th className="border px-4 py-2">MONTANT CUMULÉ</th>
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

      <div className="mt-4">
        <p className="text-right">Sous-total: Ar</p>
        <p className="text-right font-bold">Total général:  Ar</p>
      </div>

      <div className="mt-6 text-right font-semibold">
  <p>Mahajanga le, {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
  <br />
    <p>Le Receveur </p>
  </div>
    </div>
    <div className='mt-4 mb-4'>
    <Button onClick={downloadPDF}>Imprimer</Button>
        </div>
    </div>
  </div>
  );
}

export default ImpressionBordereau;
