import React from 'react'
import { LinkButton } from '../../../components/button/LinkButton'
import { Layout } from '../Layout'
import Majunga from "../../../assets/majunga.jpg"
function ConsultationRF() {
    const contentChildren =(
        <div className='flex p-8 justify-center items-center'>
            <div>
                <img src={Majunga} alt="majunga" className='w-[700px] h-[540px] bg-cover'/>
            </div>
            <div className='mt-16 ml-12'>
            <div className='w-96 mt-16 text-white text-3xl '>
                Consultation RF
            </div>
        <div className='mt-12'>
            <div className='w-96'>
            <LinkButton to="/" text="Reherche RF et/ou Consultation" ></LinkButton>
            
            </div>
        </div>
        </div>
        </div>
    
        )
      return (
     <div  className='bg-[#212122] h-screen w-screen'>
        <Layout children={contentChildren}></Layout>
     </div>
      )
    }

export default ConsultationRF