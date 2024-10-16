import React, { useEffect, useRef, useState } from 'react';
import Input from '../../../components/input/Input';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import { Button } from '../../../components/button/button';
import Table from '../../../components/table/Table';
import SearchInput from '../../../components/input/SearchInput';
import Label from '../../../components/title/label';
import DateFormatConverter from '../../../components/input/DateFormatConvert';
import axios from 'axios';
import ReactSelect from 'react-select';
import Images from '../../../assets/images.jpg';

function ListeNatureImpot() {
    // Navbar
    const Navbarcontent = (
        <div className='flex justify-between '>
            <div className='text-white font-semibold '>Impression par Impôt</div>
            <div>
                <BackButton to="/Gestion"></BackButton>
            </div>
        </div>
    );

    const [recepisse, setRecepisse] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userCode, setUserCode] = useState('');
    const [selectedChoice, setSelectedOption] = useState('Décadaire'); // Par défaut "Décade"
    const [data, setData] = useState([]);

    useEffect(() => {
        // Récupérer les données depuis le backend
        axios
            .get('http://localhost:3500/recette/getEnregistrementdeclaration')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données', error);
            });

        // Récupérer le code utilisateur depuis le backend
        axios
            .get('http://localhost:3500/recette/getUserCode')
            .then((response) => setUserCode(response.data.code))
            .catch((error) => console.error(error));
    }, []);

    // Fonction pour calculer les totaux par base impôt
    function calculerTotalParBaseImpot(data) {
        const totals = {};

        data.forEach((entry) => {
            const baseImpot = entry.base_impot;
            const montantAPayer = parseFloat(entry.montant_a_payer) || 0;
            const resteAPayer = parseFloat(entry.reste_a_payer) || 0;

            if (baseImpot) {
                if (!totals[baseImpot]) {
                    totals[baseImpot] = { totalMontantAPayer: 0, totalResteAPayer: 0 };
                }
                totals[baseImpot].totalMontantAPayer += montantAPayer;
                totals[baseImpot].totalResteAPayer += resteAPayer;
            }
        });

        return totals;
    }

    // Filtrer les données en fonction de la recherche et des dates
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

    const totalParBaseImpot = calculerTotalParBaseImpot(filteredData);

    const headers = [
        'N° Récepissé',
        'Référence Fiscal',
        'année',
        'Période',
        'P1',
        'P2',
        'Impôt',
        'Nature Impôt',
        'montant à payer',
        'montant à verser',
        'reste à payer',
        'Code Banque',
        'Mode de payment',
        'Date de creation'
    ];

    const formattedData = filteredData.map((item) => [
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
        <DateFormatConverter isoDate={item.date_creation} />
    ]);

    // Impression
    const printRef = useRef(null);

    const downloadPDF = () => {
        if (printRef.current) {
            const content = printRef.current.innerHTML;
            const originalContent = document.body.innerHTML;

            // Ajouter une feuille de style pour l'impression
            const printStyle = document.createElement('style');
            printStyle.innerHTML = '@media print { body { visibility: hidden; } .print-content { visibility: visible; } }';
            document.head.appendChild(printStyle);

            document.body.innerHTML = `<div class="print-content">${content}</div>`;

            window.print();

            // Supprimer la feuille de style après l'impression
            document.head.removeChild(printStyle);

            // Restaurer le contenu original après l'impression
            document.body.innerHTML = originalContent;
            window.location.reload();
        }
    };

    return (
        <div className='bg-[#222122] h-[900px] w-full'>
            <Navbar content={Navbarcontent}></Navbar>
            <div className="bg-[#212122] flex flex-col p-4">
                <div className="flex flex-col h-full p-4">
                    <div ref={printRef} className="mb-8 bg-white p-6">
                        <div className="text-center m-6">
                            <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
                            <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA</p>
                            <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
                        </div>

                        <div>
                            <img src={Images} alt="Logo" className="w-16 h-16" />
                            <h4>Bureau de recette : <br /> Commune Urbaine Mahajanga </h4>
                        </div>

                        <div>
                            <p>Code : {userCode}</p> {/* Code synchronisé */}
                            <p>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
                        </div>

                        <div className="text-center">
                            <h2 className="font-bold text-2xl">GESTION DE LA CONSULTATION LA LISTE DES NATURES D'IMPOTS</h2>
                        </div>

                        <table className='min-w-full mt-4'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border'>Nature de l'impôt</th>
                <th className='py-2 px-4 border'>Reste à recouuvrer</th>
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
                    </div>
                    <div>
                        <Button onClick={downloadPDF}>Imprimer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListeNatureImpot;
