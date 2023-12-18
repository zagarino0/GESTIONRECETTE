import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../components/navbar/Navbar'
import BackButton from '../../../components/button/BackButton'
import Label from '../../../components/title/label'
import ReactSelect from 'react-select'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table'
import { Button } from '../../../components/button/button'
import axios from 'axios'

function SituationNatureImpot() {

  const [searchTerm, setSearchTerm] = useState('');
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      // Effectuer une requête API en utilisant Axios
      const updatedData = { "reference_fiscal" : searchTerm  };
      axios.post('http://localhost:3500/gestion' , updatedData)
        .then((response) => {
          setData(response.data);
        setIsLoading(false);
       console.log(Data)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);


    const Navbarcontent = (
        <div className='flex justify-between '>
          <div className='text-white '>
         Liste des déclaration déposées
         </div>
         <div>
 <BackButton to="/gestion"></BackButton>
         </div>
        </div>
     )

    // header Table components 
    const headers = [  "Date de regl.","Nature Impot","Nature Amende ", "Montant à payer" , "Total versé", "Reste à payer ", "Année", "", ""];
    const headerscontent = [  "Date de paiment","Impot","Nature Impot ", "Ppl" , "Année", "P1 ", "P2", "Montant à Payer", "Total Versé", "Reste", "N Quittance", "",""];
    // data Table components 
    const data = [
        ['none', 'none', 'none', 'none'],
       
      ];
      const dataContent = [
        ['none', 'none', 'none', 'none'],
       
      ];
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
        <Navbar content={Navbarcontent}></Navbar>
        <div className='flex flex-row ml-4 mt-2'>
          <div className='flex flex-row'>
            <Label text="Année Concernée :"></Label>
               <ReactSelect className='ml-4'></ReactSelect> 
          </div>
          <div className='flex flex-row ml-6'>
            <Label text="RF :"></Label>
            <Input type="text" className="ml-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
          </div>
        </div>
        <div className='flex flex-col ml-4 mt-2 bg-black p-4 mr-4'>
          <Label text="Renseignements Permanents "></Label>
          <div className='flex justify-between'>
            <Label text="Raison social :" className="mt-4"></Label>
            <Input type="text"></Input>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Nom commercial :" className="mt-2"></Label>
            <Input type="text"></Input>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Adresse :" className="mt-2"></Label>
            <Input type="text"></Input>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Numéro Impot :" className="mt-2"></Label>
            <ReactSelect className='ml-4'></ReactSelect> 
          </div>
        </div>

 { /**Table Details Paiments  */}
        <div className='ml-4 mt-4 mr-4'>
           <p className='text-white text-xl m-2'>Details Paiments</p>
               <Table headers={headers} data={data} classTable="overflow-y-auto h-16"></Table>
        </div>
        { /**Table Details RAR */}
        <div className='ml-4 mt-4 mr-4'>
           <p className='text-white text-xl m-2'>Details RAR</p>
               <Table headers={headerscontent} data={dataContent} classTable="overflow-y-auto h-16"></Table>
        </div>
        {/*button pour valider toute action */}
        <div className='flex justify-between mt-4 ml-4 mr-4'>
          <Button children="Visualisation par nature Impot"></Button>
          <Button children="Visualisation de tous Impot"></Button>
          <Button children="Imprimer" onClick={ () => {window.location.href = "/ImpressionImpot"}}></Button>
          <Button children="Vers Excel"></Button>
        </div>
    </div>
  )
}

export default SituationNatureImpot