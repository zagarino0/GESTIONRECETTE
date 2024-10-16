import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Label from '../../../components/title/label';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import DateFormatConverter from '../../../components/input/DateFormatConvert';
import Images from '../../../assets/images.jpg';

function SituationRecetteImpression() {
    // Navbar 
    const Navbarcontent = (
        <div className='flex justify-between '>
            <div className='text-white font-semibold '>
                Situation de Recette
            </div>
            <div>
                <BackButton to="/SituationRecette"></BackButton>
            </div>
        </div>
    );

    const [recepisse, setRecepisse] = useState([]);
    const [searchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const navigate = useNavigate();
    const handleSendImpression = () => {
      
      const routeToNavigate = '/ImpressionSituationDeRecette';
      navigate(routeToNavigate, { state: {searchTerm , startDate, endDate, recepisse} });
      }

    useEffect(() => {
        // Récupérer les données depuis le backend
        axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
            .then((response) => setRecepisse(response.data))
            .catch((error) => console.error(error));

               // Mettre à jour la date actuelle au format "dd/mm/yyyy"
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR');
    setCurrentDate(formattedDate);
    }, []);

    // Fonction de filtrage
    const filteredData = recepisse.filter((item) => {
        const itemDate = new Date(item.date_creation);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            item.numero_recepisse &&
            item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!start || itemDate >= start) &&
            (!end || itemDate <= end)
        );
    });

    // Calcul des totaux par nature d'impôt
    function calculerTotalParBaseImpot(data) {
        const totals = {};

        data.forEach(entry => {
            const baseImpot = entry.base_impot;
            const montantAPayer = parseFloat(entry.montant_a_payer) || 0;

            if (baseImpot) {
                if (!totals[baseImpot]) {
                    totals[baseImpot] = 0;
                }
                totals[baseImpot] += montantAPayer;
            }
        });

        return totals;
    }

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
    };

    const totalParBaseImpot = calculerTotalParBaseImpot(filteredData);
    const formatDateToFrench = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
    };

    const printRef = useRef(null);

   {/** const downloadPDF = () => {
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
    }; */}

    const exportToExcel = () => {
        // Préparer les données pour Excel
        const excelData = [
            ["Nature Impôt", "Total cumulé"], // En-têtes
            ...Object.entries(totalParBaseImpot).map(([baseImpot, total]) => [baseImpot, total]),
            ["Total Général", Object.values(totalParBaseImpot).reduce((acc, curr) => acc + curr, 0)]
        ];

        // Créer une feuille de calcul
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        // Créer un nouveau classeur Excel
        const workbook = XLSX.utils.book_new();
        // Ajouter la feuille de calcul au classeur
        XLSX.utils.book_append_sheet(workbook, worksheet, "Recepisse Data");
        // Générer et télécharger le fichier Excel
        XLSX.writeFile(workbook, 'situation_recette.xlsx');
    };

    return (
        <div className='bg-[#212122] h-[1000px] w-full'>
            <Navbar content={Navbarcontent}></Navbar>

            <div className="flex flex-col p-4">
                <div className='flex flex-row '>
                    <div className='flex flex-col ml-2'>
                        <Label text="Du"></Label>
                        <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
                    </div>
                    <div className='flex flex-col ml-2'>
                        <Label text="Au"></Label>
                        <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
                    </div>
                </div>
                <div ref={printRef} className='bg-white p-8 m-4'>
          <div className='flex justify-between items-start'>
            <div className="text-center m-6">
              <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
              <p className='text-center'>Fitiavana-Tanindrazana-Fandrosoana </p>
              <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
            </div>
            <div className='flex flex-col '>   
               <img src={Images} alt="Logo" className="w-16 h-16 ml-80 " />
              <h4 className='ml-80'>Bureau de recette : <br /> Commune Urbaine Mahajanga </h4>

              <p className='ml-80'>Date : {currentDate}</p> {/* Affichage de la date actuelle */}
          
            </div>
        
            
          </div>

      

          <p className='text-center '>
            Journée du : {formatDateToFrench(startDate) || "JJ/MM/AAAA"} au  { formatDateToFrench(endDate) || "JJ/MM/AAAA"}
          </p>

          <table className='min-w-full mt-4'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border'>Nature de l'impôt</th>
                <th className='py-2 px-4 border'>Total cumulé (en Ariary)</th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(totalParBaseImpot).map(([baseImpot, total]) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={baseImpot}>
                                        <td className="py-3 px-6 text-left">{baseImpot}</td>
                                        <td className="py-3 px-6 text-left">{total}</td>

                                    </tr>
                                ))}
              <tr className='font-bold'>
                <td className='py-2 px-4 text-left text-3xl' colSpan='4'>TOTAL GENERAL = {Object.values(totalParBaseImpot).reduce((acc, curr) => acc + curr, 0)}</td>
              </tr>
            </tbody>
          </table>

          <div className=' mt-8'>
            <p className='text-right'>A Mahajanga, le {currentDate}</p> {/* Affichage de la date actuelle */}
            <p className='text-right'>Le Receveur Principal des Impôts</p>
          </div>
        </div>
                <div className='flex justify-between'>
                        <Button children="Imprimer" onClick={ handleSendImpression} className="mt-4"></Button>
                        <Button children="Exporter en Excel" onClick={exportToExcel} className="mt-4"></Button>
                    </div>
            </div>
        </div>
    );
}

export default SituationRecetteImpression;