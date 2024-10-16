import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import { Navbar } from '../../../components/navbar/Navbar';
import axios from 'axios';
import BackButton from '../../../components/button/BackButton';
import SearchInput from '../../../components/input/SearchInput';
import Images from '../../../assets/images.jpg';

function ImpressionListreImpotSituation() {
    const Navbarcontent = (
        <div className='flex justify-between '>
            <div className='text-white '>
                Impression par Nature d'Impot Situation Entreprise
            </div>
            <div>
                <BackButton to="/SituationNatureImpot"></BackButton>
            </div>
        </div>
    );

    const [recepisse, setRecepisse] = useState([]);
    const [searchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
            .then((response) => setRecepisse(response.data))
            .catch((error) => console.error(error));
    }, []);

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

    function calculerTotalParBaseImpot(data) {
        const totals = {};

        data.forEach(entry => {
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

    const totalParBaseImpot = calculerTotalParBaseImpot(filteredData);

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

    const printRef = useRef(null);

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
        <div className='bg-[#212122] h-[930px] w-full'>
            <Navbar content={Navbarcontent}></Navbar>

            <div className="flex flex-col p-4">
                <div className='flex flex-row mb-6'>
                    <div className='flex flex-col ml-2'>
                        <Label text="Du"></Label>
                        <Input type='date' className="mt-4" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
                    </div>
                    <div className='flex flex-col ml-2'>
                        <Label text="Au"></Label>
                        <Input type='date' className="mt-4" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
                    </div>
                    <SearchInput className={"ml-2 mt-8"} placeholder={"Identifant..."}></SearchInput>
                </div>
                <div ref={printRef} className="mb-8 bg-white p-8 pt-4">
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
                        <p>Code :</p> {/* Code synchronisé */} 
                        <p>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
                    </div>

                    <div className="text-center">
                        <h2 className="font-bold text-2xl">LA LISTE DES NATURES D'IMPOTS</h2>
                    </div>

                    <table className='min-w-full mt-4'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-2 px-4 border'>Nature de l'impôt</th>
                                <th className='py-2 px-4 border'>Total cumulé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(totalParBaseImpot).map(([baseImpot, total]) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={baseImpot}>
                                    <td className="py-3 px-6 text-left">{baseImpot}</td>
                                    <td className="py-3 px-6 text-left">{total.totalResteAPayer}</td>
                                </tr>
                            ))}
                            <tr className='font-bold'>
                                <td className='py-2 px-4 text-left text-3xl' colSpan='4'>TOTAL GENERAL = {Object.values(totalParBaseImpot).reduce((acc, curr) => acc + curr.totalResteAPayer, 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                        <Button onClick={downloadPDF}>Imprimer</Button>
                </div>
            </div>
        </div>
    );
}

export default ImpressionListreImpotSituation;
