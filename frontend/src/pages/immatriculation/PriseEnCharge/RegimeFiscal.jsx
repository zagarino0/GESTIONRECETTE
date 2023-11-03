import React from 'react'
import { Layout } from './Layout'
import { Button } from '../../../components/button/button'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { useLocation } from 'react-router-dom';
function RegimeFiscalIm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  console.log(referenceFiscal)
  const BodyContent = (
    <div className='m-4'>
  <div className='bg-black p-4 flex flex-row'>
 <div className='flex flex-row '>
  <Label text="Votre code :"></Label>
  <Input type="text" placeholder="Code " className="ml-4"></Input>
 </div>
 <div className='flex flex-row ml-4 '>
  <Label text="Votre Mot de passe :"></Label>
  <Input type="password" placeholder="Mot de passe" className="ml-4"></Input>
 </div>
 </div>
 <div className='p-4 bg-black mt-2 '>
   <p className='text-white text-xl text-center'>Regime Fiscal</p>
 </div>
 <div className='flex justify-between'>

  <div className=' h-[400px] w-[700px] p-2'>
<div className="flex justify-between">
<div>

</div>
<Label text="Période"></Label>
<Label text="Date début"></Label>
<Label text="Date fin"></Label>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Impot synthétique"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Impot ou les révenus"></Checkbox>
<Input type="text" placeholder="Période" className="w-40" ></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="IRSA"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="IRCM"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="DA[Local]"></Checkbox>
<Input type="text" placeholder="Période"  className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="TVA"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
</div>
  </div>
  <div className=' h-[400px] w-[700px] p-2'>
<div className="flex justify-between">
<div>

</div>
<Label text="Période"></Label>
<Label text="Date début"></Label>
<Label text="Date fin"></Label>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Licences de Vente des BA"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Prél. sur Produits de Jeux"></Checkbox>
<Input type="text" placeholder="Période" className="w-40" ></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Prél. sur BA et Alcolisé"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Taxes sur Appareils Auto."></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Taxes sur Contrats Assur."></Checkbox>
<Input type="text" placeholder="Période"  className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date"  className="ml-2 w-40"></Input>
</div>
<div className='flex justify-between mt-2'>
<Checkbox label="Taxe Spéc Jeunesse et Sport"></Checkbox>
<Input type="text" placeholder="Période" className="w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
<Input type="date" className="ml-2 w-40"></Input>
</div>
  </div>

 </div>
 <div className='flex justify-between mt-2'>
<div >
<Label text="2023" className="text-3xl"></Label>
</div>
<div>
<Checkbox label="Début d'activité"></Checkbox>
<Checkbox label="Rénouvellement"></Checkbox>
</div>
<div className="flex justify-between">
<Button type="submit" children="Nouveau" ></Button>
<Button type="submit" children="Enregistrer MAJ" className="ml-2"></Button>
</div>
 </div>
    </div>
  )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
     <Layout children={BodyContent} ></Layout>
    </div>
  )
}

export default RegimeFiscalIm