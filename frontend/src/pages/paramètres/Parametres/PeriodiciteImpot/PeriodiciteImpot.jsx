import React, { useEffect, useState } from 'react'
import Table from '../../../../components/table/Table'
import Layout from './Layout'
import axios from 'axios';

function PeriodiciteImpotParametre() {
  const [dataCode, setDataCode] = useState([]);

  useEffect(() => {

    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/code/jourferie')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const headers = ['Date', 'Jour', 'Motif'];
  const data =  dataCode.map(item => [item.date, item.jour , item.motif]);
 const content = (
  <div>
  <div className='m-4 text-white text-3xl'> 
    Périodicité des impots
  </div>
  <div className='mt-4 m-4' >
<Table headers={headers} data={data} ></Table>
      </div>
  </div>
 )
return (
 <Layout children={content}>

 </Layout>
  )
}

export default PeriodiciteImpotParametre