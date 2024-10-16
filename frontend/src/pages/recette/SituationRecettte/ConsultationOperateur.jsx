import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modals/Modal';
import { Navbar } from '../../../components/navbar/Navbar';
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import { Button } from '../../../components/button/button';
import ReactSelect from "react-select";
import { Title2, Title3 } from '../../../components/title/title';
import axios from 'axios';
import SearchInput from '../../../components/input/SearchInput';

function ConsultationOperateur(props) {
    const NavbarContent = (
        <div className='flex justify-between'>
            <div className='text-white font-semibold'>
                CHEQUE/ESPECE
            </div>
            <div></div>
        </div>
    );

    const [recepisse, setRecepisse] = useState([]);
    const [regisseur, setRegisseur] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [codeOperateur, setCodeOperateur] = useState(''); // Nouveau state pour le code opérateur

    useEffect(() => {
        // Récupérer les données depuis le backend
        axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
            .then((response) => setRecepisse(response.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        // Récupérer les données depuis le backend
        axios.get('http://localhost:3500/recette/getAllEnregistrementDeclarationNonPeriodique')
            .then((response) => setRegisseur(response.data))
            .catch((error) => console.error(error));
    }, []);

    const filteredRecepisse = recepisse.filter(item => {
        const itemDate = new Date(item.date_creation);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const matchesCodeOperateur = codeOperateur ? item.code_operateur?.toLowerCase().includes(codeOperateur.toLowerCase()) : true;
        return itemDate >= start && itemDate <= end && matchesCodeOperateur;
    });

    const filteredRegisseur = regisseur.filter(item => {
        const itemDate = new Date(item.date_creation);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const matchesCodeOperateur = codeOperateur ? item.code_operateur?.toLowerCase().includes(codeOperateur.toLowerCase()) : true;
        return itemDate >= start && itemDate <= end && matchesCodeOperateur;
    });

    const calculateTotalsAndCounts = (data) => {
        const results = {};
        data.forEach(item => {
            const typePayment = item.type_payment.trim().toLowerCase();
            const montantVerser = parseFloat(item.montant_verser) || 0;

            if (!results[typePayment]) {
                results[typePayment] = { total: 0, count: 0 };
            }
            results[typePayment].total += montantVerser;
            results[typePayment].count += 1;
        });
        return results;
    };

    const recepisseTotals = calculateTotalsAndCounts(filteredRecepisse);
    const regisseurTotals = calculateTotalsAndCounts(filteredRegisseur);

    const totalMontantAnnuler = recepisse
        .filter(item => item.annulation === true)
        .reduce((total, item) => total + parseFloat(item.montant_verser), 0);

    const totalMontantAnnulerRegisseur = regisseur
        .filter(item => item.annulation === true)
        .reduce((total, item) => total + parseFloat(item.montant_verser), 0);

    const totalMontantVerser = Object.values(recepisseTotals).reduce((acc, curr) => acc + curr.total, 0) - totalMontantAnnuler;
    const totalMontantVerserRegisseur = Object.values(regisseurTotals).reduce((acc, curr) => acc + curr.total, 0) - totalMontantAnnulerRegisseur;

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
                <Navbar content={NavbarContent}></Navbar>
                <div className='flex justify-between m-4'>
                    <div className='flex flex-col'>
                        <Label text="Code Opérateur"></Label>
                        <SearchInput 
                            className={"mt-1"} 
                            value={codeOperateur} 
                            onChange={(e) => setCodeOperateur(e.target.value)} 
                            placeholder="Rechercher par code opérateur"
                        ></SearchInput>
                        <Title3 text="Type de paiement" className="mt-2"></Title3>
                    </div>
                    <div className='flex justify-between '>
                        <div className='flex flex-col '>
                            <Label text="Du"></Label>
                            <Input type="date" className="mt-1" value={startDate} onChange={(e) => setStartDate(e.target.value)}></Input>
                        </div>
                        <div className='flex flex-col ml-4  '>
                            <Label text="Au"></Label>
                            <Input type="date" className="mt-1" value={endDate} onChange={(e) => setEndDate(e.target.value)}></Input>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between m-4 '>
                    <div className='flex flex-col'>
                        <Label text="Chèque" ></Label>
                        <Label text="Espèce" className="mt-2"></Label>
                        <Label text="Virement" className="mt-2"></Label>
                        <Label text="Bar" className="mt-2"></Label>
                        <Label text="Autre" className="mt-2"></Label>
                    </div>
                    <div>
                        {["cheque", "espece", "virement", "bar", "autre"].map(type => (
                            <div className='flex flex-row mt-2' key={type}>
                                <Title2 text={`Montant: ${recepisseTotals[type]?.total || 0}`}></Title2>
            
                            </div>
                        ))}
                    </div>
                    <div>
                        {["cheque", "espece", "virement", "bar", "autre"].map(type => (
                            <div className='flex flex-row mt-2' key={type}>
                                <Title2 text={`Nombre: ${recepisseTotals[type]?.count || 0}`}></Title2>                              
                            </div>
                        ))}
                    </div>
                </div>

                <div className='p-4 rounded flex justify-center bg-black '>
                    <Label text="Recette" className="font-bold"></Label>
                </div>
                <div className='flex justify-between m-4 '>
                    <div className='flex flex-col'>
                        <Label text="Montant total Chèque" className="mt-2" ></Label>
                        <Label text="Montant total Espèce" className="mt-2"></Label>
                        <Label text="Montant total Virement" className="mt-2"></Label>
                        <Label text="Montant total Bar" className="mt-4"></Label>
                        <Label text="Montant total Autre" className="mt-4"></Label>
                        <Label text="Montant total Annulation" className="mt-4"></Label>
                    </div>
                    <div>
                        {["cheque", "espece", "virement", "bar", "autre"].map(type => (
                            <div className='flex flex-row mt-1' key={type}>
                                <Title2 text={`Montant: ${recepisseTotals[type]?.total || 0}`} className="ml-2 font-semibold"></Title2>
                            </div>
                        ))}
                        <div className='flex flex-row mt-1'>
                            <Title2 text={`Montant Annulation: ${totalMontantAnnuler}`} className="ml-2 font-semibold"></Title2>
                        </div>
                    </div>
                    <div>
                        {["cheque", "espece", "virement", "bar", "autre"].map(type => (
                            <div className='flex flex-row mt-1' key={type}>
                                <Title2 text={`Nombre: ${recepisseTotals[type]?.count || 0}`} className="ml-2 font-semibold"></Title2>
                            </div>
                        ))}
                        <div className='flex flex-row mt-1'>
                            <Title2 text={`Nombre Annulation: ${recepisse.filter(item => item.annulation).length}`} className="ml-2 font-semibold"></Title2>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between m-4'>
                    <div>
                        <Button children="Quitter" onClick={props.quitter}></Button>
                    </div>
                </div>
                <div className='flex justify-between m-4 mb-8'>
                    <div></div>
                    <div className='flex flex-row'>
                        <Title2 text="Total"></Title2>
                        <Title2 text={`Nombre: ${recepisse.length}`} className="ml-2 font-semibold"></Title2>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ConsultationOperateur;
