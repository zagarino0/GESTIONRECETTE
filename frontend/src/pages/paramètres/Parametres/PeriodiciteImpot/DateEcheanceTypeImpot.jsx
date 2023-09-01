import React, { useEffect, useState } from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'
import axios from 'axios';
function DateEcheanceTypeImpot() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  // Utilisez useEffect pour effectuer la requête Axios à chaque changement de searchText
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/code/dateecheance/${searchText}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchText]);

 const headers = ['Code', 'Nature', 'Type', 'Date début Paiment', 'Date fin Paiment','Année'];
 const content = (
  <div>
  <div className='mt-8 m-4 text-white text-3xl'> 
    Paramètrage date d'échèance 
  </div>
<div className='flex flex-row m-4 mt-10'>
  <Label text="Année" className="mt-2"></Label>
  <Input
          type="text"
          placeholder="Année"
          className="ml-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
</div>

  <div className='mt-10 m-4' >
    
<Table headers={headers} data={data} ></Table>
      </div>
  </div>
 )
return (
 <Layout children={content}>

 </Layout>
  )
}

export default DateEcheanceTypeImpot