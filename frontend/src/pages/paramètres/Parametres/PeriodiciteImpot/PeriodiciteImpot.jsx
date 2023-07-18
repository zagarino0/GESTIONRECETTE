import React from 'react'
import Table from '../../../../components/table/Table'
import Layout from './Layout'

function PeriodiciteImpotParametre() {
  const headers = ['Date', 'Jour', 'Motif'];
  const data = [
    ['none', 'none', 'none'],
   
  ];
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