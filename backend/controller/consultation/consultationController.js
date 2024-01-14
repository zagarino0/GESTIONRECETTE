const getDataExcel = require('../../utils/ExcelData');
const data = {
    client: require('../../../../e-immatriculation/backend/model/client.json'),

    activites: require("../../../../e-immatriculation/backend/model/activite.json"),
    actionnaires: require("../../../../e-immatriculation/backend/model/actionnaire.json"),
    dirigeants: require("../../../../e-immatriculation/backend/model/dirigeant.json"),
    interlocuteurs: require("../../../../e-immatriculation/backend/model/interlocuteur.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    sieges: require("../../../../e-immatriculation/backend/model/siege.json"),
    coordonnees: require("../../../../e-immatriculation/backend/model/coordonnees.json"),
    etablissements: require("../../../../e-immatriculation/backend/model/etablissement.json"),
    autres: require("../../../../e-immatriculation/backend/model/autre.json"),

    charge: require('../../model/immatriculation/charge.json')
}

const getClientByNif = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    let client;

    data.client.map(cli => {
        data.charge.map(cha => {
            if(cli.nif === reference_fiscal && cli.nif === cha.reference_fiscal)
            {
                client = {...cli, ...cha};
            }
        })
    })
    
    res.json(client);
    client = {};
}

const getClientByNumeroStatistique = (req, res) => {
    const numero_statistique = req.body.numero_statistique;
    let client;

    data.client.map(cli => {
        data.charge.map(cha => {
            if(cli.numero_statistique === numero_statistique && cli.nif === cha.reference_fiscal)
                client = {...cli, ...cha};
        })
    })
    res.json(client);
    client = {};
}

const getClientByAddresse = (req, res) => {
    const addresse = req.body.addresse;
    let clients = [];

    data.client.map(cli => {
        data.charge.map(cha => {
            if(cli.adresse === addresse && cli.nif === cha.reference_fiscal)
                clients.push({...cli, ...cha});
        })
    })

    res.json(clients);
    clients = [];
}

const getClientByNomCommercial = (req, res) => {
    const nom_commercial = req.body.nom_commercial;
    let clients = {};

    data.client.map(cli => {
        data.charge.map(cha => {
            if(cli.nom_commerciale === nom_commercial && cli.nif === cha.reference_fiscal){
                clients = {...cli, ...cha};
            }
        })
    })
    console.log(clients);
    res.json(clients);
    client = {};
}

const getClientByCIN = (req, res) => {
    const cin = req.body.cin;
    let client;
    
    data.client.map(cli => {
        data.charge.map(cha => {
            if(cli.cin === cin && cli.nif === cha.reference_fiscal)
                client = {...cli, ...cha};
        })
    })

    res.json(client);
    client = {};
}


module.exports = {
    getClientByNif,
    getClientByAddresse,
    getClientByCIN,
    getClientByNomCommercial,
    getClientByNumeroStatistique
}