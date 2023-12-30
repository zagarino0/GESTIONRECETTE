import React from 'react'
import { AiFillPrinter, AiOutlineFileSearch } from 'react-icons/ai'
import { BsFillPlayFill, BsStopFill } from 'react-icons/bs'
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { MdViewInAr } from 'react-icons/md'

import { Navbar } from '../../../../components/navbar/Navbar'
import BackButton from '../../../../components/button/BackButton'
import Input from '../../../../components/input/Input'

function BordeauxTransfertRecetteEntreDeuxDate() {
        // Navbar 
        const Navbarcontent = (
            <div className='flex justify-between '>
              <div className='text-white font-semibold '>
              Bordeaux Transfert Recette Entre Deux Date
             </div>
             <div>
     <BackButton to="/SituationRecette"></BackButton>
             </div>
            </div>
         )
    
      return (
        <div className='bg-[#212122] h-screen w-screen'>
            <Navbar content={Navbarcontent}></Navbar>
            <div className='mr-4 mt-2 ml-4 bg-black p-4'>
            <div className="flex flex-row">
            <AiFillPrinter className="text-white text-5xl cursor-pointer"></AiFillPrinter>
            <Input type="text" placeholder="zoom" className="ml-4"></Input>
            <Input type="text" placeholder="Nombre impression" className="ml-4"></Input>
            <CgPlayTrackPrev className="text-white text-5xl cursor-pointer ml-4"></CgPlayTrackPrev>
            <BsFillPlayFill className="text-white text-5xl cursor-pointer ml-4"></BsFillPlayFill>
            <CgPlayTrackNext className="text-white text-5xl cursor-pointer ml-4"></CgPlayTrackNext>
            <BsStopFill className="text-white text-5xl cursor-pointer ml-4"></BsStopFill>
            <AiOutlineFileSearch className="text-white text-5xl cursor-pointer ml-4"></AiOutlineFileSearch>
            <MdViewInAr className="text-white text-5xl cursor-pointer ml-4"></MdViewInAr>
            </div>
            </div>
            <div className="flex justify-center p-4">
                
    
                <div className=" bg-white w-[1500px] h-[500px] ">
    
                </div>
            </div>
        </div>
      )
    }

export default BordeauxTransfertRecetteEntreDeuxDate