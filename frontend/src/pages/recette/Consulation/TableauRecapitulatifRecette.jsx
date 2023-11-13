import React from 'react'
import { Button } from '../../../components/button/button'
import Input from '../../../components/input/Input'
import Label from '../../../components/title/label'
import { Navbar } from '../../../components/navbar/Navbar'
import Modal from '../../../components/modals/Modal'
import { Title3 } from '../../../components/title/title'

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
      <div className='flex justify-between p-8'>
      <Title3 text="RECETTE"></Title3>
      <Input type="text" className="h-10"></Input>
      </div>
    <div className='flex justify-between   p-8'>
    <Button children="Quitter" onClick={props.quitter}></Button>
    </div>
        </Modal>
    </div>
    )
    }
export default TableauRecapitulatifRecette