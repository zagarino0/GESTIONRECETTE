import React, { useState } from 'react'
import Modal from '../../../components/modals/Modal'
import { Navbar } from '../../../components/navbar/Navbar'
import { Title3 } from '../../../components/title/title'
import Checkbox from '../../../components/button/Checkbox'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import { useNavigate } from 'react-router-dom'

function SituationdeRecette(props) {
    const NavbarContent = (
        <div className='flex justify-between'>
        <div className='text-white font-semibold'>
          Situation de Recette Fiscal
            </div>
            <div>
              
            </div>
        </div>
          )
  let navigate = useNavigate();
  const [Options , setOptions ] = useState({
    Situation_de_Recette : false,
    Decade : false , 
    Bordeaux_transfert_Recette: false ,
    Extrait_Recette: false

  });
  const [Date , setDate] = useState('');

  const HandleImpression = () =>{

if(Options.Situation_de_Recette === true && Date === true){
navigate("/SituationRecetteJournalier")
}
if(Options.Situation_de_Recette === true && Date === false){
  navigate("/SituationRecetteEntreDeuxDate")
}
if(Options.Extrait_Recette === true && Date === true){
  navigate("/ExtraitRecetteJournalier")
}
if(Options.Extrait_Recette === true && Date === false){
  navigate("/ExtraitRecetteEntreDeuxDate")
}
if(Options.Decade === true && Date === true){
  navigate("/DecadeJournalier")
}
if(Options.Decade === true && Date === false){
  navigate("/DecadeEntreDeuxDate")
}
if(Options.Bordeaux_transfert_Recette === true && Date === true){
  navigate("/BordeauxTransfertRecetteJournalier")
}
if(Options.Bordeaux_transfert_Recette === true && Date === false){
  navigate("/BordeauxTransfertRecetteEntreDeuxDate")
}
  } 

  return (
    <div>
        <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
        <Navbar content={NavbarContent}></Navbar>
            <div className='flex justify-center items-center p-2'>
               <div className='bg-black w-[400px] h-[200px] p-2 '>
                 <Title3 text="Option"className="font-semibold ml-4"></Title3>
                 <Checkbox label="Situation de Recette" onChange={(checked)=> setOptions({...Options , Situation_de_Recette: checked})} checked={Options.Situation_de_Recette} className="mt-2"></Checkbox>
                 <Checkbox label="Decade" className="mt-2" onChange={(checked)=> setOptions({...Options , Decade: checked})} checked={Options.Decade}></Checkbox>
                 <Checkbox label="Bordeaux de transfert de Recette"onChange={(checked)=> setOptions({...Options , Bordeaux_transfert_Recette: checked})} checked={Options.Bordeaux_transfert_Recette} className="mt-2"></Checkbox>
                 <Checkbox label="Extrait de Recette" className="mt-2" onChange={(checked)=> setOptions({...Options , Extrait_Recette: checked})} checked={Options.Extrait_Recette}></Checkbox>
               </div>
            </div>
            <div className='flex justify-center items-center mt-4 p-2'>
               <div className='bg-black w-[400px] h-[120px] p-2 '>
                 <Title3 text="Date"className="font-semibold ml-4"></Title3>
                
<div className='flex flex-col'>
<label className='text-white mt-2'>
    <input
      type="radio"
      value="Journalière"
      className='mr-2'
      checked={Date === true }
      onChange={() => setDate(true)}
    />
    Journalière
  </label>
  <label className='text-white mt-2'>
    <input
      type="radio"
      value="Entre deux Date"
      className='mr-2'
      checked={Date === false}
      onChange={() => setDate(false)}
    />
    Entre deux Date
  </label>
</div>
  
               </div>
            </div>
            <div className='flex justify-between mt-4 p-8'>
{ Date === false && (
  <>
  <div className='flex flex-col '>
        <Label text="Du"></Label>
       <Input type="date" className="mt-1" ></Input>
       </div>
       <div className='flex flex-col  '>
        <Label text="Au"></Label>
       <Input type="date" className="mt-1"></Input>
       </div>
       

  </>
)}
{Date === true && (
  <>
  <div className='flex flex-col'>
        <Label text="Date"></Label>
       <Input type="date" className="mt-1" ></Input>
       </div>
  </>
)

}
</div>
<div className='flex justify-between   p-8'>
    <Button children="Imprimer" onClick={HandleImpression}></Button>
    <Button children="Quitter" onClick={props.quitter}></Button>
</div>
        </Modal>
    </div>
  )
}

export default SituationdeRecette