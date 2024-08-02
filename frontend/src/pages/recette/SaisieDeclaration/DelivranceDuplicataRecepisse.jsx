import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'
import { Button } from '../../../components/button/button';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input/Input';

function DelivranceDuplicataRecepisse() {
  const [recepisse, setRecepisse] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredRecepisse = recepisse.filter((item) => {
    // Filtrer par référence fiscale
    const referenceMatch = item.reference_fiscal && item.reference_fiscal.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrer par date de création
    const itemDate = new Date(item.date_creation);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch = (!start || itemDate >= start) && (!end || itemDate <= end);

    // Retourner vrai si les deux conditions sont satisfaites
    return referenceMatch && dateMatch;
  });

  const headers = ['N° Récepissé', 'Référence Fiscal', 'année', "Période", 'P1', 'P2', "Impôt", "Nature Impôt", "montant à payer", "montant à verser", "reste à payer", "Code Banque", "Mode de payment"];
  const formattedData = filteredRecepisse.map(item => [
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
    item.type_payment   
  ]);

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
    localStorage.setItem("selectedDataRecettePeriodique", JSON.stringify(DataSelected));
    console.log(DataSelected);
  }, [DataSelected]);

  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>Visualisation</div>
      <div>
        <BackButton to="/saisiDeclarationRecette" />
      </div>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-full'>
      <Navbar content={NavbarContent} />
      <div className='flex flex-col p-4'>
        <div className='flex flex-row'>
          <SearchInput onChange={(e) => setSearchTerm(e.target.value)} className={"mt-8"} />
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Du</label>
            <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='flex flex-col ml-2'>
            <label className='text-white '>Au</label>
            <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col mt-14 overflow-y-auto w-[1600px] '>
            <Table headers={headers} data={formattedData} onClick={handleTableRowClick} selectedRowIndex={selectedRowIndex} />
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <Button children="Imprimer" onClick={() => navigate('/ImpressionQuitance')} />
          <Button children="Modifier" onClick={() => navigate('/ModificationPeriodique')} />
          <Button children="Annuler" />
          <Button children="Rafraîchir" onClick={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
}

export default DelivranceDuplicataRecepisse;
