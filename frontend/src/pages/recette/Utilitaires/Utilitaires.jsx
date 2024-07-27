import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../../components/button/button';
import * as XLSX from 'xlsx';

function UtilitairesRecette() {
  const location = useLocation();
  const [recepisse, setRecepisse] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = recepisse.filter((item) => {
      const itemDate = new Date(item.date_creation);
      return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
    });

    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FilteredData');
    XLSX.writeFile(wb, 'filtered_data.xlsx');
  };

  const contentChildren = (
    <div className='flex justify-center items-center '>
      <div className='flex flex-col'>
        <div className='text-white text-3xl text-center m-2 mt-40'>
          Utilitaires
        </div>
        <div className='flex flex-col ml-28 '>
          <Button children="Copie du fichier impôt" onClick={() => setShowModal(true)} className="mt-4 w-96"></Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Layout currentPath={location.pathname} children={contentChildren}></Layout>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">Rechercher entre deux dates</h2>
            <div className='flex flex-col'>
              <label className='mb-2'>Du</label>
              <input
                type="date"
                className="mb-4 p-2 border"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label className='mb-2'>Au</label>
              <input
                type="date"
                className="mb-4 p-2 border"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button children="Exporter" onClick={handleFilter} className="mt-2"></Button>
              <Button children="Fermer" onClick={() => setShowModal(false)} className="mt-2"></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UtilitairesRecette;
