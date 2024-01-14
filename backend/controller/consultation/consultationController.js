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
    const charge = data.charge.find(cha => cha.reference_fiscal === contribuable.reference_fiscal);
    if(!charge)
        return res.status(404).json({'message': 'Contribuable non prise en charge'});
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
    const charge = data.charge.find(cha => cha.reference_fiscal === contribuable.reference_fiscal);
    if(!charge)
        return res.status(404).json({'message': 'Contribuable non prise en charge'});
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
    const contribuables = [];
    contribuable.map(contrib => {
        data.charge.map(cha => {
            if (contrib.id === adresse.id_contribuable && contrib.reference_fiscal === cha.reference_fiscal) {
                contrib.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contrib.id);
                contrib.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contrib.id);
                contrib.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
                contrib.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contrib.id);
                contrib.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contrib.id);
                contrib.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contrib.id);
                contrib.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contrib.id);
                contrib.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contrib.id);
                contribuables.push(contrib);
            }
        })
    })
    res.json(contribuables);
}

const getClientByNomCommercial = (req, res) => {
    const nom_commercial = req.body.nom_commercial;
    const etablissement = data.etablissements.find(eta => eta.etablissement_nom_commercial === nom_commercial);
    if(!etablissement)
        return res.status(404).json({'message': 'Contribuable introuvable'});
    const contribuable = data.client.find(cli => cli.id === etablissement.id_contribuable);
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