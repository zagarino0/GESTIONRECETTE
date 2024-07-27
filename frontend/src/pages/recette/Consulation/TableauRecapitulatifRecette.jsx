import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import { Title3 } from '../../../components/title/title'
import axios from 'axios'

function TableauRecapitulatifRecette(props) {
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
          Visualisation situation de recette
            </div>
            <div>
              
            </div>
        </div>
          )

      
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
        <div className='flex justify-between mt-4 p-8'>
    <div className='flex flex-col '>
        <Label text="Date du"></Label>
       <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1" ></Input>
       </div>
       <div className='flex flex-col  '>
        <Label text="Au"></Label>
       <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1"></Input>
       </div>
       
    </div>
      <div className='flex justify-between p-8'>
      <Title3 text="RECETTE"></Title3>
      <Input type="text" value={totalMontantVerser} className="h-10"></Input>
      </div>
    <div className='flex justify-between   p-8'>
    <Button children="Quitter" onClick={props.quitter}></Button>
    </div>
        </Modal>
    </div>
    )
    }
export default TableauRecapitulatifRecette