const data = {
    clients: require('../../model/immatriculation/client.json'),
    setClients: function (data) { this.clients = data },
    vehicules: require('../../model/immatriculation/vehicule.json'),
    setVehicules: function (data) { this.vehicules = data },
    activites: require('../../model/immatriculation/activite.json'),
    setActivites: function (data) { this.activites = data },
    associes: require('../../model/immatriculation/associe.json'),
    setAssocies: function (data) { this.associes = data },
    coordonees: require('../../model/immatriculation/coordonees.json'),
    setCoordonees: function (data) { this.coordonees = data },
    etablissements: require('../../model/immatriculation/etablissement.json'),
    setEtablissements: function (data) { this.etablissements = data },
    impositions: require('../../model/immatriculation/imposition.json'),
    setImpositions: function (data) { this.impositions = data },
    interlocuteurs: require('../../model/immatriculation/interlocuteur.json'),
    setInterlocuteurs: function (data) { this.interlocuteurs = data },
    morales: require('../../model/immatriculation/morale.json'),
    setMorales: function (data) { this.morales = data },
    physiques: require('../../model/immatriculation/physique.json'),
    setPhysiques: function (data) { this.physiques = data },
    regimeImposition: require('../../model/immatriculation/regime_imposition.json'),
    setRegimeImposition: function (data) { this.regimeImposition = data },
    sieges: require('../../model/immatriculation/siege.json'),
    setSieges: function (data) { this.sieges = data },
}

//---------------------Client------------------------

const getAllClients = () => {
    return data.clients;
}

const getCientByNif = (reference_fiscal) => {
    return data.clients.find(cli => cli.nif === reference_fiscal);
}


//----------------Client Vehicule---------------------

const getAllVehicules = () => {
    return data.vehicules;
}

const getVehiculesByReferenceFiscal = (reference_fiscal) => {
    let vehicule = [];
    data.vehicules.map(veh => {
        if(veh.nif_proprietaire === reference_fiscal)
            vehicule.push(veh)
    })
    return vehicule;
}

const getVehiculeNclient = (reference_fiscal) => {
    let vehicule = [];
    let client = data.clients.find(cli => cli.nif === reference_fiscal);
    data.vehicules.map(veh => {
        if(veh.nif_proprietaire === client.nif)
            vehicule.push(veh)
    })
    client.vehicule = vehicule;
    return client;
}

//---------------------------------------------------------