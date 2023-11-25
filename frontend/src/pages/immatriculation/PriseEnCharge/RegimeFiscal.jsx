import React from 'react'
import { Layout } from './Layout'
import { Button } from '../../../components/button/button'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { useLocation } from 'react-router-dom';
import PasswordInput from '../../../components/input/PasswordInput'
function RegimeFiscalIm() {
   
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceFiscal = searchParams.get('reference_fiscal');
  console.log(referenceFiscal)
  const BodyContent = (
    <div className='m-4'>
  <div className='bg-black p-4 flex justify-between rounded-md'>
    <div className='flex flex-col w-[250px]'>
     <Label text="Votre code :"></Label>
     <Input type="text" placeholder="Code... " className="mt-2" ></Input>
    </div>
    <div className='flex flex-col w-[250px] '>
     <Label text="Votre Mot de passe :"></Label>
     <PasswordInput ></PasswordInput>
    </div>
    <div className='mt-8'>
      <Button children="s'identifier"></Button>
    </div>
    </div>
 <div className='p-4 bg-black mt-2 rounded-md '>
   <p className='text-white text-xl text-center'>Regime Fiscal</p>
 </div>
 <div className='flex  justify-between'>

  <div className=' h-[400px] w-[700px] p-2'>
<div className="flex justify-between">
<div className='flex flex-col'>
  <Checkbox label="Impot synthétique"></Checkbox>
  <Checkbox label="Impot ou les révenus"></Checkbox>
  <Checkbox label="IRSA"></Checkbox>
  <Checkbox label="IRCM"></Checkbox>
  <Checkbox label="DA[Local]"></Checkbox>
  <Checkbox label="TVA"></Checkbox>
  </div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Input type="text" placeholder="Période" className="w-40 mt-2" ></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période"  className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Input type="date"  className=" w-40 mt-2"></Input>
<Input type="date"  className=" w-40 mt-2"></Input>
<Input type="date"  className=" w-40 mt-2"></Input>
<Input type="date" className=" w-40 mt-2"></Input>
<Input type="date"  className=" w-40 mt-2"></Input>
<Input type="date" className="w-40 mt-2"></Input>
</div>

</div>

  </div>
<div className='flex flex-col'>
<Checkbox label="Licences de Vente des BA"></Checkbox>
<Checkbox label="Prél. sur Produits de Jeux"></Checkbox>
<Checkbox label="Prél. sur BA et Alcolisé"></Checkbox>
<Checkbox label="Taxes sur Appareils Auto."></Checkbox>
<Checkbox label="Taxes sur Contrats Assur."></Checkbox>
<Checkbox label="Taxe Spéc Jeunesse et Sport"></Checkbox>
</div>
<div className='flex flex-col'>
<Label text="Période"></Label>
<Input type="text" placeholder="Période" className="w-40 mt-2" ></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période"  className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
<Input type="text" placeholder="Période" className="w-40 mt-2"></Input>
</div>
<div className='flex flex-col'>
<Label text="Date début"></Label>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
</div>
<div className='flex flex-col'>
<Label text="Date fin"></Label>
<Input type="date"  className="mt-2 w-40"></Input>
<Input type="date"  className="mt-2 w-40"></Input>
<Input type="date"  className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
<Input type="date"  className="mt-2 w-40"></Input>
<Input type="date" className="mt-2 w-40"></Input>
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
     <Layout currentPath={location.pathname} children={BodyContent} ></Layout>
    </div>
  )
}

export default RegimeFiscalIm