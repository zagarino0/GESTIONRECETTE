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
    charges: require('../../model/immatriculation/charge.json'),
    impots: require('../../model/gestion/gestion.json'),

    modePayment: require('../../model/recette/mode_payment.json')
}

const path = require('path');

const getClientByNif = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const contribuable = data.contribuable.find(cli => cli.nif === reference_fiscal);
    if (!contribuable)
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    const charge = data.charges.find(cha => cha.reference_fiscal === contribuable.reference_fiscal);
    if (!charge)
        return res.status(404).json({ 'message': 'Contribuable non prise en charge' });

    const modePayments = [];
    const impots = [];

    data.modePayment.map(pay => {
        if (pay.reference_fiscal === reference_fiscal)
            modePayments.push(pay);
    })
    modePayments.map(pay => {
        data.impots.map(imp => {
            if (pay.numero_impot === imp.numero_impot) {
                impots.push({ ...pay, ...imp });
            }
        })
    })

    contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
    contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
    contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
    contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
    contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
    contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
    contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
    contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);

    contribuable.impots = impots;
    res.json(contribuable);
}

const getRecetteBetweenTwoDate = (req, res) => {
    const numero_impot = req.body.numero_impot;
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;
    const reference_fiscal = req.body.reference_fiscal;

    let contribuable;

    if (!date_init && !date_fin) {
        if (!reference_fiscal) {
            return res.status(404).json({ 'message': 'Contribuable introuvable' });
        } else {
            contribuable = data.client.find(cli => cli.reference_fiscal === reference_fiscal);
            if (!contribuable)
                res.status(404).json({ 'message': 'Contribuable introuvable' });
            const payment = data.modePayment.filter(mod => mod.reference_fiscal === contribuable.reference_fiscal && mod.montant_verser !== 0);
            if (!payment)
                res.status(404).json({'message': 'Aucun payment'});            
            contribuable.payment = payment;
            contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
            contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
            contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
            contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
            contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
            contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
            contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
            contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
        }
    } else if (date_init && !date_fin) {
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    } else if (date_init && date_fin) {
        if (!reference_fiscal) {
            contribuable = [];
            const payment = data.modePayment.filter(mod => (new Date(mod.date_creation)) >= (new Date(date_init)) && (new Date(mod.date_creation)) <= (new Date(date_fin)) && mod.montant_verser !== 0);
            payment.map(pay => [
                data.client.map(cli => {
                    if(cli.reference_fiscal === pay.reference_fiscal){
                        cli.payment = pay;
                        cli.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === cli.id);
                        cli.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === cli.id);
                        cli.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === cli.id);
                        cli.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === cli.id);
                        cli.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === cli.id);
                        cli.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === cli.id);
                        cli.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === cli.id);
                        cli.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === cli.id);
                        cli.push({...pay, ...cli});
                    }
                })
            ])
        } else {
            contribuable = data.client.find(cli => cli.reference_fiscal === reference_fiscal);
            if(!contribuable)
                res.status(404).json({'message': 'Contribuable introuvable'});
            const payment = data.modePayment.filter(mod => mod.reference_fiscal === contribuable.reference_fiscal && mod.montant_verser !== 0);
            if(!payment)
                res.status(404).json({'message': 'Aucun payment est effectué par le contribuable'});
            contribuable.payment = payment;
            contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
            contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
            contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
            contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
            contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
            contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
            contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
            contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
        }
    }
    res.json(contribuable);   
}

const getResteARecouvrerBetweenTwoDate = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let contribuable;

    if (!date_init && !date_fin) {
        if (!reference_fiscal) {
            return res.status(404).json({ 'message': 'Contribuable introuvable' });
        } else {
            contribuable = data.client.find(cli => cli.reference_fiscal === reference_fiscal);
            if (!contribuable)
                res.status(404).json({ 'message': 'Contribuable introuvable' });
            const payment = data.modePayment.filter(mod => mod.reference_fiscal === contribuable.reference_fiscal && mod.reste_a_payer !== 0);
            if (!payment)
                res.status(404).json({'message': 'Aucun payment'});            
            contribuable.payment = payment;
            contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
            contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
            contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
            contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
            contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
            contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
            contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
            contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
        }
    } else if (date_init && !date_fin) {
        return res.status(404).json({ 'message': 'Contribuable introuvable' });
    } else if (date_init && date_fin) {
        if (!reference_fiscal) {
            contribuable = [];
            const payment = data.modePayment.filter(mod => (new Date(mod.date_creation)) >= (new Date(date_init)) && (new Date(mod.date_creation)) <= (new Date(date_fin)) && mod.reste_a_payer !== 0);
            payment.map(pay => [
                data.client.map(cli => {
                    if(cli.reference_fiscal === pay.reference_fiscal){
                        cli.payment = pay;
                        cli.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === cli.id);
                        cli.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === cli.id);
                        cli.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === cli.id);
                        cli.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === cli.id);
                        cli.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === cli.id);
                        cli.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === cli.id);
                        cli.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === cli.id);
                        cli.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === cli.id);
                        cli.push({...pay, ...cli});
                    }
                })
            ])
        } else {
            contribuable = data.client.find(cli => cli.reference_fiscal === reference_fiscal);
            if(!contribuable)
                res.status(404).json({'message': 'Contribuable introuvable'});
            const payment = data.modePayment.filter(mod => mod.reference_fiscal === contribuable.reference_fiscal && mod.reste_a_payer !== 0);
            if(!payment)
                res.status(404).json({'message': 'Aucun payment est effectué par le contribuable'});
            contribuable.payment = payment;
            contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
            contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
            contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
            contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
            contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
            contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
            contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
            contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);
        }
    }
    res.json(contribuable);
}

const getAllResteARecouvrer = (req, res) => {
    const contribuables = [];
    data.client.map(cli => {
        data.modePayment.map(mod => {
            if (cli.reference_fiscal === mod.reference_fiscal && mod.reste_a_payer !== 0) {
                cli.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === cli.id);
                cli.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === cli.id);
                cli.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === cli.id);
                cli.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === cli.id);
                cli.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === cli.id);
                cli.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === cli.id);
                cli.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === cli.id);
                cli.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === cli.id);
                contribuables.push({ ...cli, ...mod });
            }
        })
    })
    res.json(contribuables);
}

const getAllRecette = (res, req) => {
    const contribuables = [];
    data.client.map(cli => {
        data.modePayment.map(mod => {
            if (cli.reference_fiscal === mod.reference_fiscal && mod.montant_a_payer !== 0) {
                cli.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === cli.id);
                cli.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === cli.id);
                cli.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === cli.id);
                cli.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === cli.id);
                cli.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === cli.id);
                cli.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === cli.id);
                cli.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === cli.id);
                cli.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === cli.id);
                contribuables.push({ ...cli, ...mod });
            }
        })
    })
    res.json(contribuables);
}

module.exports = {
    getClientByNif,
    getRecetteBetweenTwoDate,
    getResteARecouvrerBetweenTwoDate,
    getAllResteARecouvrer,
    getAllRecette
}