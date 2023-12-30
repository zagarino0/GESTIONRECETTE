import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { Button } from '../../../components/button/button'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ModalError, ModalErrorServer } from '../Modal'
import Table from '../../../components/table/Table'
function RegimeFiscalIm() {
   
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  const data = location.state?.data || {}; // Access the data passed from PriseCharge component
  const [Data, setData] = useState([]); 
  const [isModalError, setIsModalError] = useState(false);
  const [isModalErrorServer, setIsModalErrorServer] = useState(false);
  const[Assujetissement , setAssujetissement] = useState([]);
  const navigate = useNavigate();

  console.log(referenceFiscal);
  
  useEffect(() => {
    if (referenceFiscal) {
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${referenceFiscal}`)
        .then((response) => {
          const Data= response.data;
          setData(Data);
          console.log('Data received:', Data);
          const assujetissements = response.data.assujetissements
          console.log("assujetissements :" , assujetissements)
          setAssujetissement(assujetissements)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [referenceFiscal]);
  
  const handlePriseEnCharge = () => {
    // Perform data verification logic here
    if (referenceFiscal) {
      // Data is verified, set isDataVerified to true
      
  
      // Update the data object with the prise_charge property
  
          navigate(`/SituationGeographiqueIm?reference_fiscal=${referenceFiscal}`);
    }
  };
  
   // header Table components 
   const headers = [  "Imposition","Date début","Date Fin", "Date assujetissement" , "Période 1", "Période 2" , "année" , "actif" , "Périodicité" , "etat" , "exonere"];

   // data Table components  
  const dataAssujetissement = Assujetissement.map((item) =>[ item.imposition , item.date_debut , item.date_exe , item.date_assujetissement , item.period_1 , item.period_2 , item.annee , item.actif , item.periodicite , item.etat , item.exonere])
  const BodyContent = (
    <div className='m-4'>
       <ModalError isOpen={isModalError} onClose={()=> setIsModalError(false)} quitter={()=> setIsModalError(false)}></ModalError>
      <ModalErrorServer isOpen={isModalErrorServer} onClose={()=> setIsModalErrorServer(false)} quitter={()=> setIsModalErrorServer(false)}></ModalErrorServer>
  
 <div className='p-4 bg-black mt-2 rounded-md '>
   <p className='text-white text-xl text-center font-semibold'>Regime Fiscal</p>
 </div>
 
  <>
   <div className='flex  flex-col '>
{/* 
<div className='  w-[700px] p-2'>
<div className="flex justify-between">
<div className='flex flex-col mt-10'>
  <Checkbox label="Impot synthétique" checked={Assujetissement.imposition === "Impot synthétique" } />
  <Checkbox label="Impot sur les révenus" className="mt-2" checked={ Assujetissement.imposition === "Impot sur les révenus"} />
  <Checkbox label="IRSA" className="mt-2" checked={Assujetissement.imposition ==="IRSA"} />
  <Checkbox label="IRCM" className="mt-2" checked={Assujetissement.imposition ==="IRCM"} />
  <Checkbox label="DA[Local]" className="mt-2" checked={Assujetissement.imposition === "DA[Local]"}/>
  <Checkbox label="TVA" className="mt-2" checked={Assujetissement.imposition === "TVA"} />
</div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Label text="Période" className="mt-6"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>


</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Label text="Date début" className="mt-6"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>

</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Label text="Date fin" className="mt-6"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
</div>

</div>

</div>
<div className='flex justify-between  w-[700px] p-2'><div className='flex flex-col mt-10'>
  <Checkbox label="Licences de Vente des BA" checked={Assujetissement?.imposition?.includes("Licences de Vente des BA")} />
  <Checkbox label="Prél. sur Produits de Jeux" className="mt-2" checked={Assujetissement?.imposition?.includes("Prél. sur Produits de Jeux")} />
  <Checkbox label="Prél. sur BA et Alcolisé" className="mt-2" checked={Assujetissement?.imposition?.includes("Prél. sur BA et Alcolisé")} />
  <Checkbox label="Taxes sur Appareils Auto." className="mt-2" checked={Assujetissement?.imposition?.includes("Taxes sur Appareils Auto.")} />
  <Checkbox label="Taxes sur Contrats Assur." className="mt-2" checked={Assujetissement?.imposition?.includes("Taxes sur Contrats Assur.")} />
  <Checkbox label="Taxe Spéc Jeunesse et Sport" className="mt-2" checked={Assujetissement?.imposition?.includes("Taxe Spéc Jeunesse et Sport")} />
</div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Label text="Période" className="mt-6"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-4"></Label>
<Label text="Période" className="mt-2"></Label>
<Label text="Période" className="mt-2"></Label>


</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Label text="Date début" className="mt-6"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-4"></Label>
<Label text="Date début" className="mt-2"></Label>
<Label text="Date début" className="mt-2"></Label>

</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Label text="Date fin" className="mt-6"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-4"></Label>
<Label text="Date fin" className="mt-2"></Label>
<Label text="Date fin" className="mt-2"></Label>
</div>


</div>
</div>
<div className='flex justify-between mt-2 '>
<div >
<Label text="2023" className="text-3xl"></Label>
</div>
<div>
<Checkbox label="Début d'activité"></Checkbox>
<Checkbox label="Rénouvellement"></Checkbox>
</div> */}

<div className='flex justify-center mt-8'>
<Table headers={headers} data={dataAssujetissement} ></Table>
</div>
<div className="flex justify-end">
<Button type="submit" children="Suivant" onClick={handlePriseEnCharge} ></Button>
</div>
</div>
  </>


    </div>
  )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
     <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
    </div>
  )
}

export default RegimeFiscalIm