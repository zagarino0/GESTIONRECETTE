import React from 'react'
import { Button } from '../../../components/button/button';
import Input from '../../../components/input/Input';
import Label from '../../../components/title/label';
import Table from '../../../components/table/Table';
import { Layout } from './Layout';
import { useLocation } from 'react-router-dom';
import PasswordInput from '../../../components/input/PasswordInput';

function SituationGeographiqueIm() {
  const location = useLocation(); 
   // header Table components 
   const headers = [  "Fokontany de","Commune de","District de", "Region de" , "", ""];

   // data Table components  
  const data = [
   ['none', 'none', 'none', 'none'],
  
 ];
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
    <div className='p-4 bg-black mt-2 rounded-md'>
      <p className='text-white text-xl text-center'>Situation Geographique</p>
    </div>
    <div className='mt-2 '>
   
<div className='flex flex-row'>
<Label text="Taper ici une partie du nom du Fokontany" ></Label>
<Input type="text"  className=" ml-2"></Input>
<Button type="submit" children="Gestionnaire Collectivité" className="ml-2" ></Button>
</div>
<div className='mt-2  '>
    <Table headers={headers} data={data} classTable="overflow-y-auto h-16" ></Table>
    </div>
    <div className='flex justify-between mt-2'>
<Label text="Region de:" ></Label>
<Input type="text" placeholder="Region" className="ml-6" ></Input>
<Input type="text" placeholder="Code postal"  ></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="District de:" ></Label>
<Input type="text" placeholder="District" className="ml-6" ></Input>
<Input type="text" placeholder="Code postal"  ></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Commune de:" ></Label>
<Input type="text" placeholder="Commune" ></Input>
<Input type="text" placeholder="Code postal"  ></Input>
</div>
<div className='flex justify-between mt-2'>
<Label text="Fokontany de:" ></Label>
<Input type="text" placeholder="Region" ></Input>
<Input type="text" placeholder="Code postal"  ></Input>
</div>
    <div className='flex mt-2 justify-between'>
    <Button type="submit" children="Enregistrer MAJ"></Button>
      <Button type="submit" children="Nouveau" ></Button>
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

export default SituationGeographiqueIm