
import Modal from '../../../components/modals/Modal'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Input from '../../../components/input/Input'
import { Button } from '../../../components/button/button'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function ReleveCheque(props) {
  const NavbarContent = (
    <div className='flex justify-between'>
    <div className='text-white font-semibold'>
      Relevé de Chèque
        </div>
        <div>
          
        </div>
    </div>
      )
      const [recepisse, setRecepisse] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const navigate = useNavigate();
      const handleSendImpression = () => {
        
        const routeToNavigate = '/ImpressionBordereau';
        navigate(routeToNavigate, { state: {searchTerm , startDate, endDate, recepisse} });
        }

return (
<div>
    <Modal isOpen={props.isOpen} onClose={props.onClose} className={props.className}>
    <Navbar content={NavbarContent}></Navbar>
    <div className='flex justify-between mt-4 p-8'>
<div className='flex flex-col '>
    <Label text="Date du"></Label>
   <Input type="date" className="mt-1" ></Input>
   </div>
   <div className='flex flex-col  '>
    <Label text="Au"></Label>
   <Input type="date" className="mt-1"></Input>
   </div>
   
</div>
  
<div className='flex justify-between   p-8'>
<Button children="voir details" onClick={handleSendImpression}></Button>
<Button children="Quitter" onClick={props.quitter}></Button>
</div>
    </Modal>
</div>
)
}

export default ReleveCheque