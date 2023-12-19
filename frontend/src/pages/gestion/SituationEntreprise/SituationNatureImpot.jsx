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
  const [Impot , setImpot] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        

        try {
          const response = await axios.post('http://localhost:3500/gestion', {
            reference_fiscal: searchTerm,
          });

          setData(response.data);
          setImpot(response.data.impots);
          console.log(Impot)
          console.log(Data);
          
        } catch (error) {
          console.error(error);
          
        }
      }
    };

    // Call the fetchData function when the searchTerm changes
    fetchData();
  }, [searchTerm , Data , Impot])

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
    const headers = [  "Date de regl.","Nature Impot","Nature Amende ", "Montant à payer" , "Total versé", "Reste à payer ", "Année"];
    const headerscontent = [  "Date de paiment","Impot","Nature Impot ", "Ppl" , "Année", "P1 ", "P2", "Montant à Payer", "Total Versé", "Reste", "N Quittance", "Abreviation", "Base Impot" , "Abreviation", "Chapitre", "Code banque", "Groupe Impot", "Numéro budget",  "Numéro chèque", "Numéro classe", "Numéro impot", "Numéro récépissé", "pcop", "Période", "Periode1", "Periode2", "Transporteur"];
    // data Table components 
    const data = Impot.map(item =>[item.date_creation , item.libelle , item.type_payment , item.montant_a_payer , item.montant_verser , item.reste_a_payer , item.annee ] )

    

      // const formattedData = dataCode.map(item => [item.code, item.libelle, item.nature ,
      //   <span
      //         key={item.code} // Make sure to use a unique key
      //         className='cursor-pointer'
      //         onClick={() => handleDelete(item.code)}
      //       >
      //         <RiDeleteBinLine />
      //       </span>,
      //         <span
      //          key={`edit-${item.code}`} // Make sure to use a unique key
      //          className='cursor-pointer'
      //          onClick={() => {
      //            setSelectedEditData(item);
      //            setIsModalOpenModifi(true);
      //          }}
      //        >
      //          <BsPencil />
      //        </span>,]);
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
            <Label text="Raison social " className="mt-4"></Label>
            <p className='text-xs ml-2 text-white '>
  {Data.raison_sociale
}
</p>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Nom commercial " className="mt-2"></Label>
            <p className='text-xs ml-2 text-white '>
  {Data.nom_commerciale

}
</p>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Adresse :" className="mt-2"></Label>
            <p className='text-xs ml-2 text-white '>
  {Data.adresse

}
</p>
          </div>
          <div className='flex mt-2 justify-between'>
            <Label text="Numéro Impot :" className="mt-2"></Label>
            <p className='text-xs ml-2 text-white '>
  {Data.adresse

}
</p>
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