import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../components/input/Input'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import { Button } from '../../../components/button/button'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import Label from '../../../components/title/label'
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import axios from 'axios'
import ReactSelect from 'react-select';
import Images from '../../../assets/images.jpg'
function TitrePerceptio() {
      // Navbar 
      const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white font-semibold '>
             Titre Perception
         </div>
         <div>
 <BackButton to="/Gestion"></BackButton>
         </div>
        </div>
     )

 
     const [data, setData] = useState([]);
     const [userCode, setUserCode] = useState('');
     const [totalMontantAPayer, setTotalMontantAPayer] = useState(0);
     const [totalMontantVerser, setTotalMontantVerser] = useState(0);
     const [totalResteAPayer, setTotalResteAPayer] = useState(0);
   
     // Fonction pour calculer la somme d'une colonne spécifique
     const calculateTotalMontantAPayer = (data) => {
       let total = 0;
       for (let i = 0; i < data.length; i++) {
         total += data[i].montant_a_payer;
       }
       return total.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
     };
   
     const calculateTotalMontantVerser = (data) => {
       let total = 0;
       for (let i = 0; i < data.length; i++) {
         total += data[i].montant_verser;
       }
       return total.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
     };
   
     const calculateTotalResteAPayer = (data) => {
       let total = 0;
       for (let i = 0; i < data.length; i++) {
         total += data[i].reste_a_payer;
       }
       return total.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
     };
   
     useEffect(() => {
       // Récupérer les données depuis le backend
       axios.get('http://localhost:3500/recette/getEnregistrementdeclaration')
         .then((response) => {
           setData(response.data);
   
           // Calculer les totaux pour chaque colonne
           const totalMontantAPayer = calculateTotalMontantAPayer(response.data);
           const totalMontantVerser = calculateTotalMontantVerser(response.data);
           const totalResteAPayer = calculateTotalResteAPayer(response.data);
   
           setTotalMontantAPayer(totalMontantAPayer);
           setTotalMontantVerser(totalMontantVerser);
           setTotalResteAPayer(totalResteAPayer);
         })
         .catch((error) => {
           console.error('Erreur lors de la récupération des données', error);
         });
   
       // Récupérer le code utilisateur depuis le backend
       axios.get('http://localhost:3500/recette/getUserCode')
         .then((response) => setUserCode(response.data.code))
         .catch((error) => console.error(error));
     }, []);
   
     const printRef = useRef(null);
   
     const downloadPDF = () => {
       if (printRef.current) {
         const content = printRef.current.innerHTML;
         const originalContent = document.body.innerHTML;
   
         // Ajouter des styles pour l'impression
         const printStyle = document.createElement('style');
         printStyle.innerHTML = `
           @media print {
             body { visibility: hidden; }
             .print-content { visibility: visible; }
             .print-content * {
               font-size: 12px; /* Ajuster la taille de la police pour l'impression */
               color: black; /* Couleur du texte pour l'impression */
             }
           }
         `;
         document.head.appendChild(printStyle);
   
         document.body.innerHTML = `<div class="print-content">${content}</div>`;
         window.print();
         document.head.removeChild(printStyle);
         document.body.innerHTML = originalContent;
         window.location.reload();
       }
     };
   
     return (
       <div className='bg-[#22122] h-full w-[1770px]'>
         <Navbar content={Navbarcontent}></Navbar>
         <div className=" bg-[#212122] flex flex-col p-4">
           <div className="flex flex-col h-full p-4">
             <div ref={printRef} className="mb-8 w-[1700px] bg-white p-6">
               <div className="text-center m-6">
                 <h2 className="text-2xl text-center font-bold">REPOBLIKAN'NY MADAGASIKARA</h2>
                 <p className='text-center'>FITIAVANA-TANINDARZANA-FANDROSOANA </p>
                 <h1 className="text-3xl text-center font-bold m-6">COMMUNE URBAINE DE MAHAJANGA</h1>
               </div>
   
               <div> 
                 <img src={Images} alt="Logo" className="w-16 h-16" />
                 <h4>Bureau de recette : Commune Urbaine Mahajanga A</h4>
               </div>
              
               <div>
                 <p>Code : {userCode}</p> {/* Code synchronisé */}
                 <p>Date : {new Date().toLocaleDateString('fr-FR')}</p> {/* Affichage de la date actuelle */}
               </div>
   
               <div className="text-center">
                 <h2 className="font-bold text-2xl">GESTION DE LA CONSULTATION TITRE PAR LA PERCEPTION</h2>
               </div>
   
               <table className="min-w-full bg-white border border-black mb-4 mt-4">
                 <thead>
                   <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
                     <th className="border border-black px-4 py-2">N°récepissé</th>
                     <th className="border border-black px-4 py-2">Référence fiscal</th>
                     <th className="border border-black px-4 py-2">Année</th>
                     <th className="border border-black px-4 py-2">Periode</th>
                     <th className="border border-black px-4 py-2">P1</th>
                     <th className="border border-black px-4 py-2">P2</th>
                     <th className="border border-black px-4 py-2">Impôt</th>
                     <th className="border border-black px-4 py-2">Nature d'impôt</th>
                     <th className="border border-black px-4 py-2">Montant à payer en Ariary</th>
                     <th className="border border-black px-4 py-2">Montant à verser en Ariary</th>
                     <th className="border border-black px-4 py-2">Montant reste à payer en Ariary </th>
                     <th className="border border-black px-4 py-2">Code Banque</th>
                     <th className="border border-black px-4 py-2">Mode de payment</th>
                     <th className="border border-black px-4 py-2">Date de création</th>
                   </tr>
                 </thead>
                 <tbody>
                   {data.length > 0 ? (
                     data.map((item, index) => (
                       <tr key={index}>
                         <td className="border px-4 py-2">{item.numero_recepisse}</td>
                         <td className="border px-4 py-2">{item.reference_fiscal}</td>
                         <td className="border px-4 py-2">{item.annee}</td>
                         <td className="border px-4 py-2">{item.periode}</td>
                         <td className="border px-4 py-2">{item.periode1}</td>
                         <td className="border px-4 py-2">{item.periode2}</td>
                         <td className="border px-4 py-2">{item.numero_impot}</td>
                         <td className="border px-4 py-2">{item.base_impot}</td>
                         <td className="border px-4 py-2">{item.montant_a_payer.toLocaleString('fr-FR',{ minimumFractionDigits: 2 })}</td>
                         <td className='border px-4 py-2'>{item.montant_verser.toLocaleString('fr-FR',{ minimumFractionDigits: 2 })}</td>
                         <td className='border px-4 py-2'>{item.reste_a_payer.toLocaleString('fr-FR',{ minimumFractionDigits: 2 })}</td>
                         <td className='border px-4 py-2'>{item.code_banque}</td>
                         <td className='border px-4 py-2'>{item.type_payment}</td>
                         <td className='border px-4 py-2'>{item.date_creation}</td>
                       </tr>
                     ))
                   ) : (
                     <tr>
                       <td colSpan="14" className="text-center py-4">Aucun avis de crédit trouvé</td>
                     </tr>
                   )}
                 </tbody>
               </table>
   
               <div className="mt-4 text-left">
                   <h3 className=' mt-8 font-bold'>TOTAL GENERAL :</h3>
                   <p><strong>Montant à Payer :</strong> {totalMontantAPayer} Ar</p>
                   <p><strong>Montant Versé :</strong> {totalMontantVerser} Ar</p>
                   <p><strong>Reste à Payer :</strong> {totalResteAPayer} Ar</p>
               </div>
   
              
             </div> 
             <div>
                 <Button onClick={downloadPDF}>Imprimer</Button>
               </div>
           </div>
         </div>
       </div>
     );
}
export default TitrePerceptio