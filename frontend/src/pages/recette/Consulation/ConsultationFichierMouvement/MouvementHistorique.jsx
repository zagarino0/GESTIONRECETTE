import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../components/button/button';
import Input from '../../../../components/input/Input';
import Label from '../../../../components/title/label';
import Table from '../../../../components/table/Table';
import axios from 'axios';
import DateFormatConverter from '../../../../components/input/DateFormatConvert';
import SearchInput from '../../../../components/input/SearchInput';

function MouvementHistorique() {
    const location = useLocation();
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Récupérer les données depuis le backend
        axios.get('http://localhost:3500/recette/history')
            .then((response) => setHistory(response.data))
            .catch((error) => console.error(error));
    }, []);

    const filteredData = history.filter((item) => {
        const itemDate = new Date(item.date_creation);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const matchesSearchTerm = item.numero_recepisse && item.numero_recepisse.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStartDate = start ? itemDate >= start : true;
        const matchesEndDate = end ? itemDate <= end : true;

        return matchesSearchTerm && matchesStartDate && matchesEndDate;
    });

    const headers = ['N° Récepissé', "date de Création", "Motif"];
    const formattedData = filteredData.map(item => [
        item.numero_recepisse,
        <DateFormatConverter isoDate={item.date_creation} />,
        item.motif
    ]);

    const contentChildren = (
        <div className='flex justify-center items-center '>
            <div className='flex flex-col p-4 '>
                <div className='flex flex-row'>
                    <SearchInput className={"mt-8"} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className='flex flex-col ml-2'>
                        <Label text="Du"></Label>
                        <Input type='date' className="mt-4" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className='flex flex-col ml-2'>
                        <Label text="Au"></Label>
                        <Input type='date' className="mt-4" onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                <div className='flex justify-center mt-4 '>
                    <Table headers={headers} data={formattedData} classTable="overflow-y-auto " />
                </div>
                <div className='flex justify-between  mt-4'>
                    <Button children="Imprimer" onClick={() => { /* Action pour imprimer les résultats */ }} />
                </div>
            </div>
        </div>
    );

    return (
        <div className='bg-[#212122]  h-full w-full'>
            <Layout currentPath={location.pathname} children={contentChildren}></Layout>
        </div>
    );
}

export default MouvementHistorique;
