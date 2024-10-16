import React , { useState, useEffect }from 'react'
import { Layout } from './Layout'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import SearchInput from '../../../components/input/SearchInput'
import Table from '../../../components/table/Table'
import DateFormatConverter from '../../../components/input/DateFormatConvert'
import { Button } from '../../../components/button/button';

function PriseCharge() {
 
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [DataSelected , setDataSelected] = useState([]);      
  const navigate = useNavigate()// Initialize useHistory
  const [Client , setClient ] = useState([]);
  const [Data , setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prisecharge/contribuable/valide')
      .then((response) => setData(response.data))
      .catch((error) => {console.error(error);alert(`Il y a une erreur :  ${error}`)});
  }, []);


  useEffect(() => {
    // Récupérer les données depuis le backend
    axios.get('http://localhost:3500/prisecharge/contribuable/encharge')
      .then((response) => setClient(response.data))
      .catch((error) => {console.error(error);alert(`Il y a une erreur :  ${error}`)});
  }, []);

console.log("Data",Data)

console.log("client:",Client)

const filteredData = Data.filter((item) => 
  item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

   // header Table components 
   const headers =  ["Ref démandé", "Raison social",  "Référence Fiscal" , "type" , " Date autorisation" , "Régime fiscal" , "Forme juridique" , "Date de création" , "RIB"];

   // data Table components  
   const data = filteredData.map((item) =>[
    item.id , 
    item.raison_social , 
    item.reference_fiscal , 
    item.type,
    <DateFormatConverter isoDate={item.date_agrement}></DateFormatConverter> ,
    item.regime_fiscal,
    item.forme_juridique ,
   <DateFormatConverter isoDate={item.date_creation}></DateFormatConverter> ,
    item.RIB
  ]);

  const location = useLocation(); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };   
  
  

  const [isStorageUpdated, setIsStorageUpdated] = useState(false);

  useEffect(() => {
    // Store Value data in localStorage
    localStorage.setItem("selectedDataPriseEnCharge", JSON.stringify(DataSelected ));
    // Reset the dummy state to trigger rerender
    console.log(DataSelected)
    setIsStorageUpdated(false);
  }, [DataSelected, isStorageUpdated]);
  

  const handleButtonClick = () => {
    // Trigger a rerender by updating the dummy state
    setIsStorageUpdated(true);

    // Use the selectedOption to determine the route to navigate to
    const routeToNavigate = "/SituationGeographiqueIm";
 
    // Use navigate to navigate to the determined route
    navigate(routeToNavigate, { state: { DataSelected } });
  };
 
  const handleTableRowClick = (rowIndex) => {
    if (selectedRowIndex === rowIndex) {
      // Deselect the row if it's already selected
      setSelectedRowIndex(null);
      setDataSelected([]);
      console.log('Deselected Row');
    } else {
      // Select the row
      setSelectedRowIndex(rowIndex);
  
      // Extract the property values from the data object
      const selectedRowData = Data[rowIndex];
  
      setDataSelected(selectedRowData);
      console.log('Selected Row Data:', selectedRowData);
    }
  };
  
    const contentChildren =(
        <div className='flex justify-center items-center mt-10'>
          <div className='flex flex-col'>
          <SearchInput placeholder={"Rechercher"} onChange={handleSearch}></SearchInput>
           <Table headers={headers} data={data} className='mt-4'
           onClick={handleTableRowClick}
           selectedRowIndex={selectedRowIndex}
           ></Table>
           <Button children='Voir contribuable' className='mt-4 w-[200px]' onClick={handleButtonClick}></Button>
          </div>
        </div>
        )
      return (
     <div  className='bg-[#212122] h-full w-full'>
        <Layout currentPath={location.pathname} children={contentChildren}></Layout>
     </div>
      )
}


export default PriseCharge