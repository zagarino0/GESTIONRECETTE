import React from 'react'
import Input from '../../../../components/input/Input';
import Table from '../../../../components/table/Table';
import Label from '../../../../components/title/label';
import Layout from './Layout'

function DateEcheancePeriode() {
  const headers = ['Num', 'Libellé', 'Année', 'Période 1', 'Période 2', 'Date début', 'Date fin', 'Jours', 'Type', 'Payé Amande', 'Payé Pénalité', 'Valeur Amende', 'Taux Pénalité'];
  const data = [
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
   
  ];
 const content = (
  <div>
  <div className='mt-8 m-4 text-white text-3xl'> 
    Impôt sur les revenus salariaux
  </div>
<div className='flex justify-between m-4 mt-10 '>
  <Label text="Année" className="mt-2"></Label>
  <Input type="text" placeholder="Année" className="ml-4"></Input>
</div>
<div className='flex justify-between m-4 mt-10 '>
  <Label text="Code" className="mt-2"></Label>
  <Input type="text" placeholder="Code" className="ml-4"></Input>
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

export default DateEcheancePeriode