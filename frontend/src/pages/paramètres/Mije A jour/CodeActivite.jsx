import React from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Table from '../../../components/table/Table'

function CodeActivite() {
  const headers = ['ID', 'Name', 'Email'];
  const data = [
    [1, 'John Doe', 'john@example.com'],
    [2, 'Jane Smith', 'jane@example.com'],
    [3, 'Mike Johnson', 'mike@example.com'],
  ];
  const NavbarContent = (
<div className='flex justify-between'>
<div className='text-white'>
Mise à jour code d'activité
    </div>
    <div>
      <BackButton to="/miseAJourParametre"></BackButton>
    </div>
</div>
  )
  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={NavbarContent}></Navbar>
      <div className='mt-24 bg-white' >
<Table headers={headers} data={data}></Table>
      </div>
    </div>
  )
}

export default CodeActivite