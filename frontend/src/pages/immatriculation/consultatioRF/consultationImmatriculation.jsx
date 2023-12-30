import React, { useState } from 'react'
import BackButton from '../../../components/button/BackButton'
import { Navbar } from '../../../components/navbar/Navbar'
import Label from '../../../components/title/label'
import Checkbox from '../../../components/button/Checkbox'
import Input from '../../../components/input/Input'
import Table from '../../../components/table/Table'
import SearchInput from '../../../components/input/SearchInput'
import axios from "axios"
function ConsultationImmatriculation() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    
    nomCommercial: false,
    adresse: false,
    cin: false,
    nif: false,
  });

  const [searchInput, setSearchInput] = useState('');
 const [ data , setData] = useState([])

 const handleSearch = async () => {
  const baseUrl = 'http://localhost:3500/consultation';

  try {
    if (selectedCheckboxes.nif) {
      const reference_fiscal = { "reference_fiscal" : searchInput}
      const response = await axios.post(`${baseUrl}/nif`, reference_fiscal);
      setData(response.data);
      setSearchInput('');
      console.log(data)
    }

    if (selectedCheckboxes.adresse) {
      const adresse = {"adresse" : searchInput};
      const response = await axios.post(`${baseUrl}/adresse`, adresse);
      setData(response.data);
      setSearchInput('');
      console.log(data)
    }

    if (selectedCheckboxes.cin) {
      const cin = {"cin": searchInput};
      const response = await axios.post(`${baseUrl}/cin`, cin);
      setData(response.data);
      setSearchInput('');
      console.log(data)
    }

    if (selectedCheckboxes.nomCommercial) {
      const nom_commercial = { "nom_commerciale" : searchInput};
      const response = await axios.post(`${baseUrl}/nomcommercial`, nom_commercial);
      setData(response.data);
      setSearchInput('');
      console.log(data)
    }

    // Reset all checkboxes
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      raisonSociale: false,
      nomCommercial: false,
      adresse: false,
      cin: false,
      nif: false,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const headers = ['Raison social', 'Nom commercial', 'CIN', 'Adresse', 'RF',"activité","capital", "commune" , "Date accord", "Date acte", "Date agrement", "Date attribution RF", "Date cloture exe", "Date creation", "Date début exe" , "Date demande modif" , "Date registre", "Délivrée le" , "district", "exportateur", "fokontany", "forme juridique", "importateur", "Nombre salarié", "Numéro statistique","Période grace", "Pécision activité", "Prise en charge" , "Propriétaire","province", "Référence agrement", "Régime fiscal", "Région", "Régistre commerce", "Résident","RIB","titre","type","type amende"];
  const formattedData = [
    [data.raison_sociale , data.nom_commerciale , data.cin , data.adresse , data.reference_fiscal , data.activite , data.capital , data.commune  , data.date_accord , data.date_acte , data.agrement , data.date_attribution_nif , data.date_cloture_exe , data.creation , data.date_debut_exe , data.date_demande_modif , data.date_registre , data.delivree_le , data.district , <Checkbox value={data.exportateur}></Checkbox> , data.fokontany, data.forme_juridique , <Checkbox value={data.importateur}></Checkbox> , data.nombre_salarie , data.numero_statistique , data.periode_grace , data.precision_activite , <Checkbox value={data.prise_en_charge}></Checkbox> , data.proprietaire , data.province , data.reference_agrement , data.regime_fiscal , data.region , data.registre_commerce , data.resident , data.rib , data.titre , data.type , data.type_amende]
  ]
  const Navbarcontent = (
    <div className='flex justify-between '>
      <div className='text-white font-semibold '>
      Consultation 
     </div>
     <div>
<BackButton to="/consultatioRF"></BackButton>
     </div>
    </div>
 )
  return (
    <div  className='bg-[#212122] h-screen w-screen'>
    <Navbar content={Navbarcontent}></Navbar>
    <div className="m-4">
<div className='bg-black p-4 flex justify-between'>
<div className='flex flex-col'>

<Checkbox label="Nom commercial"
value={selectedCheckboxes.nomCommercial}
 onChange={() =>
   setSelectedCheckboxes((prev) => ({
     ...prev,
     nomCommercial: !prev.nomCommercial,
   }))
 }
></Checkbox>
<Checkbox label="Adresse"
value={selectedCheckboxes.adresse}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    adresse: !prev.adresse,
  }))
}
></Checkbox>
<Checkbox label="CIN"
value={selectedCheckboxes.cin}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    cin: !prev.cin,
  }))
}
></Checkbox>
<Checkbox label="RF"
value={selectedCheckboxes.nif}
onChange={() =>
  setSelectedCheckboxes((prev) => ({
    ...prev,
    nif: !prev.nif,
  }))
}
></Checkbox>
</div>
<div className='flex flex-col'>

{ selectedCheckboxes.nomCommercial === true && (
  <>
  <SearchInput type="text" placeholder="Nom Commercial"
  className="mt-2"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
 onSearch={handleSearch}
></SearchInput>
  </>
)
}

{ selectedCheckboxes.nif === true && (
  <>
  <SearchInput type="text" placeholder="Référence fiscal"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
 onSearch={handleSearch}
 className="mt-2"
></SearchInput>
  </>
)
}
{ selectedCheckboxes.cin === true && (
  <>
  <SearchInput type="text" placeholder="CIN"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
 onSearch={handleSearch}
 className="mt-2"
></SearchInput>
  </>
)

}

{selectedCheckboxes.adresse === true && (
  <>
  <SearchInput type="text" placeholder="Adresse"
value={searchInput}
onChange={(e)=> setSearchInput(e.target.value)}
 onSearch={handleSearch}
 className="mt-2"
></SearchInput>
  </>
)

}
</div>
</div>
<div className='flex justify-center'>
<div className='overflow-y-auto w-[1480px]  mt-4'>
<Table headers={headers} data={formattedData} ></Table>
</div>
</div>
    </div>
    <div className='m-4'>
      <Input type="text" placeholder="Nombre d'enr."></Input>
    </div>
    </div>
  )
}

export default ConsultationImmatriculation