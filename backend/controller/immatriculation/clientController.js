const data = {
    clients: require("../../../../e-immatriculation/backend/model/contribuable.json"),

    activites: require("../../../../e-immatriculation/backend/model/activite.json"),
    actionnaires: require("../../../../e-immatriculation/backend/model/actionnaire.json"),
    dirigeants: require("../../../../e-immatriculation/backend/model/dirigeant.json"),
    interlocuteurs: require("../../../../e-immatriculation/backend/model/interlocuteur.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    sieges: require("../../../../e-immatriculation/backend/model/siege.json"),
    coordonnees: require("../../../../e-immatriculation/backend/model/coordonnees.json"),
    etablissements: require("../../../../e-immatriculation/backend/model/etablissement.json"),
    autres: require("../../../../e-immatriculation/backend/model/autre.json"),

    setClients: function (data) { this.clients = data },
    charges: require('../../model/immatriculation/charge.json')
};

const fsPromises = require('fs').promises;
const path = require('path');

const getAllclients = (req, res) => {
    res.json(data.clients);
}

const getClientPriseChargeByReferenceFiscal = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.clients.find(cli => cli.reference_fiscal === reference_fiscal);
    if(!client)
        return res.status(404).json({'message': 'Contribuable introuvable'});
    const charge = data.charges.find(cha => cha.reference_fiscal === client.reference_fiscal);
    if(!charge)
        return res.status(404).json({'message': 'Contribuable introuvable ou non prise en charge'});
    
    client.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === client.id);
    client.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === client.id);
    client.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === client.id);
    client.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === client.id);
    client.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === client.id);
    client.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === client.id);
    client.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === client.id);
    client.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === client.id);

    res.json(client);
}


const getClientNonPriseChargeByReferenceFiscal = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const contribuable = data.clients.find(cli => cli.reference_fiscal === reference_fiscal);
    if(!contribuable)
        return res.status(404).json({'message': 'Contribuable introuvable'});
    const charge = data.charges.find(cha => cha.reference_fiscal === contribuable.reference_fiscal);
    if(!charge){
        contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
        contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
        contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
        contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
        contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
        contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
        contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
        contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
        return res.json(contribuable);
    }
    res.json({'message': 'Le contribuable est déjà prise en charge'});
}

module.exports = {
    getAllclients,
    getClientPriseChargeByReferenceFiscal,
    getClientNonPriseChargeByReferenceFiscal
}