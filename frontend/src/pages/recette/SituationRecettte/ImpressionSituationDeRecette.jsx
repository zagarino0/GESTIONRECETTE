import React, { useMemo, useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { Navbar } from '../../../components/navbar/Navbar';
import BackButton from '../../../components/button/BackButton';
import { AiFillPrinter, AiOutlineFileSearch } from 'react-icons/ai';
import Input from '../../../components/input/Input';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { BsFillPlayFill, BsStopFill } from 'react-icons/bs';
import { MdViewInAr } from 'react-icons/md';

function ImpressionSituationDeRecette() {
  const [data, setData] = useState([]);
  const [printDateTime, setPrintDateTime] = useState('');

  useEffect(() => {
    fetchData(); // Appel initial des données
  }, []);

  const fetchData = async () => {
    try {
      const [col1Response, col2Response, col3Response, col4Response, col5Response, col6Response] = await Promise.all([
        axios.get('https://api.example.com/col1'), // URL de l'API pour la colonne 1
        axios.get('https://api.example.com/col2'), // URL de l'API pour la colonne 2
        axios.get('https://api.example.com/col3'), // URL de l'API pour la colonne 3
        axios.get('https://api.example.com/col4'), // URL de l'API pour la colonne 4
        axios.get('https://api.example.com/col5'), // URL de l'API pour la colonne 5
        axios.get('https://api.example.com/col6')  // URL de l'API pour la colonne 6
      ]);

      const mergedData = col1Response.data.map((item, index) => ({
        col1: item.value,
        col2: col2Response.data[index]?.value || '',
        col3: col3Response.data[index]?.value || '',
        col4: col4Response.data[index]?.value || '',
        col5: col5Response.data[index]?.value || '', 
        col6: col6Response.data[index]?.value || '',
      }));

      setData(mergedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handlePrint = () => {
    const printDate = new Date().toLocaleString('fr-FR'); // Date et heure actuelles au format local
    setPrintDateTime(printDate);

    const printContent = document.getElementById('printable-content').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Recharger la page pour restaurer les événements et le contenu d'origine
  };

  const columns = useMemo(
    () => [
      { Header: 'REF', accessor: 'col1' },
      { Header: 'MONTANT', accessor: 'col2' },
      { Header: 'Paiement', accessor: 'col3' },
      { Header: 'Banque', accessor: 'col4' },
      { Header: 'DATE', accessor: 'col5' },
      { Header: 'NOM', accessor: 'col6' },

    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  // Navbar
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white '>
        Impression Situation De Recette
      </div>
      <div>
        <BackButton to="/SituationRecette"></BackButton>
      </div>
    </div>
  );

  return (
    <div className='bg-[#212122] h-screen w-screen'>
      <Navbar content={Navbarcontent}></Navbar>
      <div className='mr-4 mt-2 ml-4 bg-black p-4'>
        <div className="flex flex-row">
          <AiFillPrinter className="text-white text-5xl cursor-pointer" onClick={handlePrint}></AiFillPrinter>
          <Input type="text" placeholder="zoom" className="ml-4"></Input>
          <Input type="text" placeholder="Nombre impression" className="ml-4"></Input>
          <CgPlayTrackPrev className="text-white text-5xl cursor-pointer ml-4"></CgPlayTrackPrev>
          <BsFillPlayFill className="text-white text-5xl cursor-pointer ml-4"></BsFillPlayFill>
          <CgPlayTrackNext className="text-white text-5xl cursor-pointer ml-4"></CgPlayTrackNext>
          <BsStopFill className="text-white text-5xl cursor-pointer ml-4"></BsStopFill>
          <AiOutlineFileSearch className="text-white text-5xl cursor-pointer ml-4"></AiOutlineFileSearch>
          <MdViewInAr className="text-white text-5xl cursor-pointer ml-4"></MdViewInAr>
        </div>
      </div>
      <div className="flex flex-row m-4">
        <div className='w-[500px]'>
        </div>
        <div id="printable-content" className="bg-white w-[1000px] h-[500px] p-4 overflow-auto">
          <img className="w-[100px] h-[100px] ml-8 mt-6" src="logomahajanga 1.png" alt="Logo" />
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <p>Mahajanga le, {printDateTime}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl text-center font-bold">COMMUNE URBAINE DE MAHAJANGA</h2>
            <p>Voici une description ou une introduction pour le tableau ci-dessous.</p>
          </div>
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {printDateTime && (
            <div className="mt-4">
              <p>Date d'impression : {printDateTime}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ImpressionSituationDeRecette;
