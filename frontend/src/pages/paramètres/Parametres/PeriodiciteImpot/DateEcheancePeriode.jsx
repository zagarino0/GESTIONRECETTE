import React, { useEffect, useState } from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'
import axios from 'axios';

function DateEcheancePeriode() {
  const headers = [
    'Num', 'Libellé', 'Année', 'Période 1', 'Période 2', 'Date début', 
    'Date fin', 'Jours', 'Type', 'Payé Amande', 'Payé Pénalité', 
    'Valeur Amende', 'Taux Pénalité'
  ];

  const [searchYear, setSearchYear] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Effectuez la requête à votre API avec les paramètres de recherche
        const response = await axios.get(
          `URL_DE_VOTRE_API?year=${searchYear}&code=${searchCode}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchYear, searchCode]);
 
  const content = (
    <div>
      <div className='mt-8 m-4 text-white text-3xl'> 
        Impôt sur les revenus salariaux
      </div>
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Année" className="mt-2"></Label>
        <Input
          type="text"
          placeholder="Année"
          className="ml-4"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
      </div>
      <div className='flex justify-between m-4 mt-10 '>
        <Label text="Code" className="mt-2"></Label>
        <Input
          type="text"
          placeholder="Code"
          className="ml-4"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
      </div>
      <div className='mt-10 m-4' >
        <Table headers={headers} data={data} ></Table>
      </div>
    </div>
  );
return (
 <Layout children={content}>

 </Layout>
  )
}

export default DateEcheancePeriode