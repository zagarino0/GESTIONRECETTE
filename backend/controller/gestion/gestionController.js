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

    modePayment: require('../../model/recette/mode_payment.json')
}

const path = require('path');

const getClientByNif = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.client.find(cli => cli.nif === reference_fiscal);
    if(!client)
        return res.status(404).json({'message': 'Contribuable introuvable'});
    const charge = data.charges.find(cha => cha.reference_fiscal === client.reference_fiscal)


    let modePayments = [];
    let impots = [];

    data.modePayment.map(pay => {
        if (pay.reference_fiscal === reference_fiscal)
            modePayments.push(pay);
    })
    modePayments.map(pay => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
            if (pay.numero_impot === imp.numero_impot) {
                impots.push({ ...pay, ...imp });
            }
        })
    })

    if(!client){
        return res.status(404).json([]);
    }

    client.impots = impots;
    res.json(client);
    modePayments = [];
    impots = [];
}

const getRecetteBetweenTwoDate = (req, res) => {
    const numero_impot = req.body.numero_impot;
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let clients = [];

    if (!numero_impot) {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
                    if (mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.montant_verser !== 0 && mod.numero_impot == imp.numero_impot && mod.reference_fiscal === cli.nif)
                        clients.push({ ...mod, ...imp, ...cli });
                })
            })
        })
    } else {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
                    if (mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.montant_verser !== 0 && imp.numero_impot == numero_impot && mod.numero_impot == imp.numero_impot && mod.reference_fiscal === cli.nif)
                        clients.push({ ...mod, ...imp, ...cli });
                })
            })
        })
    }

    res.json(clients);
    clients = [];
}

const getResteARecouvrerBetweenTwoDate = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let clients = [];

    if (!reference_fiscal) {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                if (mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.montant_verser !== 0 )
                    clients.push({ ...cli, ...mod });
            })
        })
    } else {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                if (mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.montant_verser !== 0 && cli.nif === reference_fiscal)
                    clients.push({ ...cli, ...mod });
            })
        })
    }

    res.json(clients);
    clients = [];
}

const getAllResteARecouvrer = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;

    let clients = [];
    if (!reference_fiscal) {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                if (mod.montant_a_payer !== 0 && cli.nif === mod.reference_fiscal)
                    clients.push({ ...cli, ...mod });
            })
        })
    } else {
        data.client.map(cli => {
            data.modePayment.map(mod => {
                if (mod.montant_a_payer !== 0 && cli.nif === reference_fiscal && cli.nif === mod.reference_fiscal)
                    clients.push({ ...cli, ...mod });
            })
        })
    }

    res.json(clients);
    clients = [];
}

module.exports = {
    getClientByNif,
    getRecetteBetweenTwoDate,
    getResteARecouvrerBetweenTwoDate,
    getAllResteARecouvrer
}