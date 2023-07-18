import React from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'

function DateEcheanceTypeImpot() {
  const headers = ['Code', 'Nature', 'Type', 'Date début Paiment', 'Date fin Paiment'];
  const data = [
    ['none', 'none', 'none', 'none', 'none'],
   
  ];
 const content = (
  <div>
  <div className='mt-8 m-4 text-white text-3xl'> 
    Paramètrage date d'échèance 
  </div>
<div className='flex flex-row m-4 mt-10'>
  <Label text="Année" className="mt-2"></Label>
  <Input type="text" placeholder="Année" className="ml-4"></Input>
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