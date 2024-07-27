import React, { useEffect, useState } from 'react'
import { Title2 } from '../../../components/title/title'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import axios from 'axios'

function ConsultationMontant(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
      <div className='text-white font-semibold'>
        CHEQUE/ESPECE
      </div>
      <div></div>
    </div>
  );

  const [recepisse, setRecepisse] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
      .then((response) => setRecepisse(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredRecepisse = recepisse.filter(item => {
    const itemDate = new Date(item.date_creation);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return itemDate >= start && itemDate <= end;
  });

  const calculateTotal = (type) => {
    return filteredRecepisse
      .filter(item => item.type_payment.trim().toLowerCase() === type.toLowerCase())
      .reduce((total, item) => total + parseFloat(item.montant_verser), 0);
  };

  const totalMontantAnnuler = recepisse
    .filter(item => item.annulation === true)
    .reduce((total, item) => total + parseFloat(item.montant_verser), 0);

  const totalMontantVerserVirement = calculateTotal("virement");
  const totalMontantVerserEspece = calculateTotal("espece");
  const totalMontantVerserCheque = calculateTotal("cheque");
  const totalMontantVerserAutre = calculateTotal("autre");
  const totalMontantVerserBar = calculateTotal("bar");
  const totalMontantVerserTresor = calculateTotal("trésor");
  const totalMontantVerserDepot = calculateTotal("dépot");

  const totalMontantVerser = totalMontantVerserVirement + totalMontantVerserEspece + totalMontantVerserCheque + totalMontantVerserAutre + totalMontantVerserBar + totalMontantVerserTresor + totalMontantVerserDepot - totalMontantAnnuler;
  


  return (
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
        <Navbar content={NavbarContent}></Navbar>
        <div className='flex justify-between m-4'>
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
            <Label text="Montant Chèque" className='mt-4'></Label>
            <Label text="Montant Espèce" className="mt-4"></Label>
            <Label text="Montant Virement" className="mt-4"></Label>
            <Label text="Montant Bar" className="mt-4"></Label>
            <Label text="Montant Trésor" className="mt-4"></Label>
            <Label text="Montant Dépot" className="mt-4"></Label>
            <Label text="Autre" className="mt-4"></Label>
            <Label text="Montant Annulation" className="mt-4"></Label>
            <Label text="Total" className="mt-4"></Label>
          </div>
          <div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserCheque} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserEspece} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserVirement} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserBar} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserTresor} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserDepot} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerserAutre} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantAnnuler} className="ml-2 font-semibold"></Title2>
            </div>
            <div className='flex flex-row mt-2'>
              <Title2 text={totalMontantVerser} className="ml-2 font-semibold"></Title2>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default ConsultationMontant;
