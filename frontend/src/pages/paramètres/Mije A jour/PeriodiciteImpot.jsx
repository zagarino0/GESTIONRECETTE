import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import axios from 'axios';
import { BsPencil } from 'react-icons/bs'
import Label from '../../../components/title/label';
import Input from '../../../components/input/Input';
import Modal from '../../../components/modals/Modal';
import { RiDeleteBinLine } from 'react-icons/ri'
import LayoutPeriodicite from './LayoutPeriodicite';

const PeriodiciteImpot = ({ currentPath }) => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCode, setDataCode] = useState([]);
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [cloture, setCloture] = useState('');
  const [numero, setNumero] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3500/code/datecloture')
      .then((response) => setDataCode(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/code/datecloture/${id}`);
      setDataCode((prevData) => prevData.filter((data) => data.id !== id));
      console.log(`Data with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const DataHandler = async (e) => {
    e.preventDefault();
    const Cloture = { numero, cloture };
    try {
      await axios.post('http://localhost:3500/code/datecloture', Cloture);
      console.log("Données ajoutées avec succès", Cloture);
      setCloture('');
      setNumero('');
      const response = await axios.get('http://localhost:3500/code/datecloture');
      setDataCode(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de données", error);
    }
  };

  const headers = ["N° Auto", "Cloture", "Suppression", "Modification"];
  const formattedData = dataCode.map(item => [
    item.numero,
    item.cloture,
    <span key={item.id} className='cursor-pointer' onClick={() => handleDelete(item.id)}>
      <RiDeleteBinLine />
    </span>,
    <span key={`edit-${item.id}`} className='cursor-pointer' onClick={() => {
      setSelectedEditData(item);
      setIsModalOpen(true);
    }}>
      <BsPencil />
    </span>
  ]);

  const NavbarModal = (
    <div className='text-white'>
      Date de clôture
    </div>
  );

  const contentChildren = (
    <div>
      <div className='mt-24 flex bg-[#212122] justify-center p-4'>
        <form onSubmit={DataHandler}>
          <div className='flex flex-col mr-4'>
            <Input type="text" className="h-12" placeholder="N° Auto"
              value={numero}
              onChange={e => setNumero(e.target.value)}
            />
            <Input type="text" className="h-12 mt-4" placeholder="Date de clôture"
              value={cloture}
              onChange={e => setCloture(e.target.value)}
            />
            <Button children="Ajouter" type="submit" className="h-12 mt-4" />
          </div>
        </form>
        <Table headers={headers} data={formattedData} className='w-[1100px]' headerClassName="sticky-header" />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[600px] h-[260px]">
        <Navbar content={NavbarModal} />
        <div className='m-4 flex justify-between'>
          <Label text="N° Auto :" className="mt-2" />
          <Input type="text" className="ml-4 w-60"
            value={selectedEditData ? selectedEditData.numero : ''}
            onChange={(e) =>
              setSelectedEditData((prevData) => ({
                ...prevData,
                numero: e.target.value,
              }))
            }
          />
        </div>
        <div className='m-4 flex justify-between'>
          <Label text="Date de Clôture :" className="mt-2" />
          <Input type="text" className="ml-4 w-60"
            value={selectedEditData ? selectedEditData.cloture : ''}
            onChange={(e) =>
              setSelectedEditData((prevData) => ({
                ...prevData,
                cloture: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex justify-between p-4">
          <Button children="Modifier"
            onClick={async () => {
              try {
                await axios.put(
                  `http://localhost:3500/code/datecloture/${selectedEditData.id}`,
                  selectedEditData
                );
                const response = await axios.get('http://localhost:3500/code/datecloture');
                setDataCode(response.data);
                setIsModalOpen(false);
                setSelectedEditData(null);
                console.log('Data updated successfully.');
              } catch (error) {
                console.error('Error updating data:', error);
              }
            }}
          />
          <Button onClick={() => setIsModalOpen(false)} children="Quitter" />
        </div>
      </Modal>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <LayoutPeriodicite children={contentChildren} currentPath={location.pathname} />
    </div>
  );
}

export default PeriodiciteImpot;
