const getDataExcel = require('../../utils/ExcelData');
const data = {
    client: require('../../../../e-immatriculation/backend/model/contribuable.json'),

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
    const contribuable = data.client.find(con => con.reference_fiscal = reference_fiscal);
    if (!contribuable)
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
    contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
    contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
    contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
    contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
    contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
    contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
    contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
    res.json(contribuable);
}

const getClientByNumeroStatistique = (req, res) => {
    const numero_statistique = req.body.numero_statistique;
    const activite = data.activites.find(act => act.numero_statistique === numero_statistique);
    if (!activite)
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    const contribuable = data.client.find(con => con.id === activite.id_contribuable);
    contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
    contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
    contribuable.activite = activite;
    contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
    contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
    contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
    contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
    contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
    res.json(contribuable);
}

const getClientByAddresse = (req, res) => {
    const adresse = req.body.adresse;
    const siege = data.sieges.filter(sie => sie.adresse_actuel === adresse);
    if (!siege)
        return res.status(404).json({ 'message': 'Contribuable Introuvable' })
    const contribuable = data.client.filter(con => con.id === siege.id_contribuable);
    contribuable.map(contrib => {
        if (contrib.id === adresse.id_contribuable) {
            contrib.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contrib.id);
            contrib.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contrib.id);
            contrib.activite = activite;
            contrib.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contrib.id);
            contrib.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contrib.id);
            contrib.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contrib.id);
            contrib.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contrib.id);
            contrib.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contrib.id);
        }
    })
    res.json(contribuable);
}

const getClientByNomCommercial = (req, res) => {
    const nom_commercial = req.body.nom_commercial;
    let clients = {};

    data.client.map(cli => {
        data.charge.map(cha => {
            if (cli.nom_commerciale === nom_commercial && cli.nif === cha.reference_fiscal) {
                clients = { ...cli, ...cha };
            }
        })
    })
    res.json(clients);
    client = {};
}

const getClientByCIN = (req, res) => {
    const cin = req.body.cin;
    const contribuable = data.client.find(cli => cli.cin === cin);
    if (!contribuable)
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
    contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
    contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
    contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
    contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
    contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
    contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
    contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
    res.json(contribuable);
}


module.exports = {
    getClientByNif,
    getClientByAddresse,
    getClientByCIN,
    getClientByNomCommercial,
    getClientByNumeroStatistique
}