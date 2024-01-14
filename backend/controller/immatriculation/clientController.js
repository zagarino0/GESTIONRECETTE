const data = {
    clients: require("../../../../e-immatriculation/backend/model/contribuable.json"),
    assujetissement: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    setClients: function (data) { this.clients = data },
    charges: require('../../model/immatriculation/charge.json')
};

const fsPromises = require('fs').promises;
const path = require('path');

const getAllclients = (req, res) => {
    res.json(data.clients);
}

const getClientByReferenceFiscal = (req, res) => {
    const client = data.clients.find(cli => cli.nif === req.body.nif);
    res.json(client);
}


const getClientNonPriseChargeByReferenceFiscal = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const contribuable = data.clients.find(cli => cli.reference_fiscal === reference_fiscal);
    if(!contribuable)
        return res.status(404).json({'message': 'Contribuable introuvable'});
    res.json(contribuable);
}

module.exports = {
    getAllclients,
    getClientByReferenceFiscal,
    getClientNonPriseChargeByReferenceFiscal
}