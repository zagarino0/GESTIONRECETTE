import React, { useEffect, useState } from 'react';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import Table from '../../../components/table/Table';
import { Button } from '../../../components/button/button';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
import Input from '../../../components/input/Input';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function EtatDetailleEncaissementCheque() {

  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
        Etat détaillé des encaissements (Espèce)
      </div>
      <div>
        <BackButton to="/SituationRecette"></BackButton>
      </div>
    </div>
  );

  const navigate = useNavigate();
  
  const [recepisse, setRecepisse] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Filtrage des données par référence fiscale, mode de paiement et date
  const filteredData = recepisse.filter((item) => {
    const referenceFiscal = item.reference_fiscal && item.reference_fiscal.toLowerCase().includes(searchTerm.toLowerCase());
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      referenceFiscal &&
      item.type_payment === "Espece" &&
      (!startDate || itemDate >= start) &&
      (!endDate || itemDate <= end)
    );
  });
    // Sélection de données
    const [DataSelected, setDataSelected] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  
    const handleTableRowClick = (rowIndex) => {
      if (selectedRowIndex === rowIndex) {
        // Désélectionner la ligne si elle est déjà sélectionnée
        setSelectedRowIndex(null);
        setDataSelected(null);
      } else {
        // Sélectionner la ligne
        setSelectedRowIndex(rowIndex);
        const selectedRowData = recepisse[rowIndex];
        setDataSelected(selectedRowData);
      }
    };
  
    useEffect(() => {
      // Stocker les données sélectionnées dans localStorage
      localStorage.setItem("selectedDataRecetteRegisseur", JSON.stringify(DataSelected));
      console.log(DataSelected);
    }, [DataSelected]);
    
  const headers = ['N° Récepissé', 'Référence Fiscal', 'Année', 'Période', 'Impôt', 'Nature Impôt', 'Montant à Payer', 'Montant Versé', 'Reste à Payer', 'Code Banque', 'Mode de Paiement'];
  const formattedData = filteredData.map(item => [
    item.numero_recepisse,
    item.reference_fiscal,
    item.annee,
    item.periode,
    item.numero_impot,
    item.base_impot,
    item.montant_a_payer,
    item.montant_verser,
    item.reste_a_payer,
    item.code_banque,
    item.type_payment
  ]);

  const exportToExcel = () => {
    const worksheetData = [
      headers, // En-têtes
      ...formattedData // Données formatées
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Encaissements Data");
    XLSX.writeFile(workbook, 'etat_detaille_encaissements.xlsx');
  };

  const handleSendImpression = () => {
    navigate('/ImpressionCheque', {
      state: { searchTerm, startDate, endDate }
    });
  };

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={Navbarcontent}></Navbar>

      <div className="flex flex-col p-4">
        <div className='flex flex-row'>
          <SearchInput
            value={searchTerm}
            className={"mt-8"}
            placeholder={"Rechercher par référence fiscale"}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Du</label>
            <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Au</label>
            <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="h-[400px] p-4">
          <div className="mb-8">
            <h2 className="text-xl text-center text-white font-bold">COMMUNE URBAINE DE MAHAJANGA</h2>
            <p className="text-white mt-4">Détail des encaissements pour la période sélectionnée.</p>
          </div>
          <Table headers={headers} data={formattedData} classTable={"h-[300px]"} />

          <div className='flex justify-between'>
            <Button onClick={handleSendImpression} className="mt-2">Voir détails</Button>
            <Button onClick={exportToExcel} className="mt-2">Exporter en Excel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtatDetailleEncaissementCheque;
