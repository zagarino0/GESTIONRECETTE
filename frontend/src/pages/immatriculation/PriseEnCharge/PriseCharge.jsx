import React , { useState, useEffect }from 'react'
import { Layout } from './Layout'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import axios from 'axios';
import Checkbox from '../../../components/button/Checkbox'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function PriseCharge() {
  const location = useLocation(); 
  const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      // Effectuer une requête API en utilisant Axios
      axios.get(`http://localhost:3500/client/${searchTerm}`)
        .then((response) => {
          setData(response.data);
          console.log(data)
        setIsLoading(false);
       
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);

  const handlePriseEnCharge = () => {
    // Perform data verification logic here
    if (searchTerm) {
      // Data is verified, set isDataVerified to true
      
  
      // Update the data object with the prise_charge property
  
          navigate(`/RegimeFiscalIm?reference_fiscal=${searchTerm}`);
    }
  };
  
  
    const contentChildren =(
        <div>
          <div className='m-4 flex justify-between'>
<div className='flex flex-col w-[300px]'>
<Label text="Référence Fiscal" ></Label>
<Input type="text" placeholder="Référence Fiscal..." className=" h-10 mt-2"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
></Input>
</div>

<Button children="Suivant" onClick={handlePriseEnCharge} className="h-12 mt-8"></Button>

</div>
          {isLoading ? (
 <div className='flex justify-center mt-4'>
 <Label className="text-3xl" text="Aucun resultat"></Label>
 </div>
) : (
                <div className='flex flex-col pr-4 pl-4 py-2'>
                     
           <div >        
           <div className=" flex flex-row">

<Label text="RF" className="text-xs"></Label>
<p className='text-xs ml-2 text-white text-[15px] text-[15px]'>

{data.reference_fiscal }
</p>
<Label text="RF" ></Label>
<p className='text-xs ml-2 text-white '>

{data.nif }
</p>
<Label text="N° Statistique" className="ml-8 "></Label>
<p className='text-xs ml-2 text-white '>
  { data.numero_statistique }
</p>
           </div>
<div className='flex justify-between '>
<div className='flex flex-col w-[500px]'>
<div className="flex justify-between mt-1">
<Label text="Raison social" className=""></Label>
<p className='text-xs ml-2 text-white '>
{ data.raison_sociale}
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Nom Commercial" className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.nom_commerciale }
</p>
</div>
<div className="flex justify-between mt-1">
<Label text="Adresse" className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.adresse }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Activité principal"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.activite }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Forme juridique" className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.forme_juridique}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Type"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.type }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Précision activitée"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.precision_activite }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Capital"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.capital }
</p>
</div>
</div>
<div className='flex flex-col w-[500px]'>

<div className="flex justify-between mt-2">
<Label text="Regime Fiscal"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.regime_fiscal }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Début exercice"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_debut_exe }
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="Fin exercice"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.date_cloture_exe}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="RCS"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.length > 0 ? data[0].raison_sociale : 'Aucune donnée'}
</p>
</div>

<div className="flex justify-between mt-2">
<Label text="N° agrément"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.reference_agrement }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date agrementt"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_agrement }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Periode grace"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.periode_grace }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date creation"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_creation }
</p>
</div>
</div>
    </div>
   
    <div className='flex justify-between mt-2'>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Titre"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.titre }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date accord"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_accord }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date acte"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_acte }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Type demande"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.type_demande }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Proprietaire"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.proprietaire }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Nombre salarie"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.nombre_salarie }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Rib"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.rib }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Resident"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.resident }
</p>
</div>
</div>
<div className="w-[500px] flex flex-col">
<div className="flex justify-between mt-2">
<Label text="Delivree le"className=""></Label>
<p className='text-xs ml-2 text-white '>
  { data.delivree_le }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Exportateur"className=""></Label>
<p className='text-xs ml-2 text-white '>
<Checkbox value={data.exportateur}></Checkbox>
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Importateur"className=""></Label>
<p className='text-xs ml-2 text-white '>
  <Checkbox value={data.importateur}></Checkbox>
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date registre" className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.date_registre }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Registre commerce"className=""></Label>
<p className='text-xs ml-2 text-white '>
  {data.registre_commerce }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Precision activite"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.precision_activite }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date demande modif"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.date_demande_modif }
</p>
</div>
<div className="flex justify-between mt-2">
<Label text="Date attribution RF"className=""></Label>
<p className='text-xs ml-2 text-white  '>
  { data.date_attribution_nif }
</p>
</div>
</div>
 
    </div>

      
        </div>
        
        </div>
       
)}

     </div>
        )
      return (
     <div  className='bg-[#212122] h-full w-full'>
        <Layout currentPath={location.pathname} children={contentChildren}></Layout>
     </div>
      )
}


export default PriseCharge