const data = {
    modePayment: require('../../model/recette/mode_payment.json'),
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    charges: require("../../model/immatriculation/charge.json"),
    setModePayment: function (data) { this.modePayment = data }
}

const path = require('path');
const fsPromises = require('fs').promises;

const setModePayment = async (req, res) => {

    const id = data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id + 1;
    
    const numero_impot = req.body.numero_impot;
    const annee = req.body.annee;
    const base_impot = req.body.base_impot;
    const montant_a_payer = req.body.montant_a_payer;
    const montant_verser = req.body.montant_verser;
    const reste_a_payer = req.body.reste_a_payer;

    const type_payment = req.body.type_payment;

    const numero_cheque = req.body.numero_cheque;
    const code_banque = req.body.code_banque;

    const numero_recepisse = req.body.numero_recepisse;

    const periode = req.body.periode;

    const transporteur = req.body.transporteur;

    const periode1 = req.body.periode1;
    const periode2 = req.body.periode2;

    const reference_fiscal = req.body.reference_fiscal;

    const payment = {
        "id": id,
        "reference_fiscal": reference_fiscal,
        "numero_impot": numero_impot,
        "annee": annee,
        "base_impot": base_impot,
        "montant_a_payer": montant_a_payer,
        "montant_verser": montant_verser,
        "reste_a_payer": reste_a_payer,
        "type_payment": type_payment,
        "numero_cheque": numero_cheque,
        "code_banque": code_banque,
        "transporteur": transporteur,
        "numero_recepisse": numero_recepisse,
        "periode": periode,
        "periode1": periode1,
        "periode2": periode2,
        "date_creation": new Date()
    }

    data.setModePayment([...data.modePayment, payment]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json'),
        JSON.stringify(data.modePayment)
    )
    res.status(200).json(data.json);
}

const getClientByRecepisse = (req, res) => {
    const numero_recepisse = req.body.numero_recepisse;

    let client = [];

    if(numero_recepisse === ""){
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if(mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal)
                        client.push({...cli, ...cha, ...mod});
                })
            })
        })
    }else if(numero_recepisse !== ""){
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if(mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal && mod.numero_recepisse === numero_recepisse)
                        client.push({...cli, ...cha, ...mod});
                })
            })
        })
    }
    
    res.json(client);
    client = [];
}


const getPaymentByTwoDate = (req, res) => {
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let cheque_count = 0;
    let espece_count = 0;
    let virement_count = 0;

    let cheque_amount = 0;
    let espece_amount = 0;
    let virement_amount = 0;

    data.modePayment.map(pay => {
        if (pay.date_creation >= date_init && pay.date_creation <= date_fin) {
            if (pay.type_payment === "virement") {
                virement_count++;
                virement_amount += pay.montant_verser;
            } else if (pay.type_payment === "espece") {
                espece_count++;
                espece_amount += pay.montant_verser;
            } else if (pay.type_payment === "cheque") {
                cheque_count++;
                cheque_amount += pay.montant_verser;
            }
        }
    })
    res.json({ "espece_amount": espece_amount, "espece_count": espece_count, "cheque_amount": cheque_amount, "cheque_count": cheque_count, "virement_amount": virement_amount, "virement_count": virement_count });
}

const getAllPayment = (req, res) => {
    let cheque_count = 0;
    let espece_count = 0;
    let virement_count = 0;

    let cheque_amount = 0;
    let espece_amount = 0;
    let virement_amount = 0;

    data.modePayment.map(pay => {
        if (pay.type_payment === "virement") {
            virement_count++;
            virement_amount += pay.montant_verser;
        } else if (pay.type_payment === "espece") {
            espece_count++;
            espece_amount += pay.montant_verser;
        } else if (pay.type_payment === "cheque") {
            cheque_count++;
            cheque_amount += pay.montant_verser;
        }
    })
    res.json({ "espece_amount": espece_amount, "espece_count": espece_count, "cheque_amount": cheque_amount, "cheque_count": cheque_count, "virement_amount": virement_amount, "virement_count": virement_count });
}

const getClientByRaisonSocial = (req, res) => {
    const raison_social = req.body.raison_social;
    let client = [];

    data.clients.map(cli => {
        data.charges.map(cha => {
            if(cha.reference_fiscal === cli.nif && cli.raison_sociale === raison_social)
                client.push({...cli, ...cha});
        })
    })

    res.json(client);
    client = [];

}

const getRecapRecette = (req, res) => {
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let totalRecette = 0;

    data.modePayment.map(mod => {
        if(mod.date_creation >= date_init && mod.date_creation <= date_fin)
            totalRecette += parseFloat(mod.montant_verser);
    })

    res.json(totalRecette);
    totalRecette = 0;

}

const getClientByNomCommercial = (req, res) => {
    const nom_commercial = req.body.nom_commercial;
    let client = []
    
    data.clients.map(cli => {
        data.charges.map(cha => {
            if(cha.reference_fiscal === cli.nif && cli.nom_commerciale === nom_commercial)
                client.push({...cli, ...cha});
        })
    })


    res.json(client);
    client = [];
}

const getClientByAddresse = (req, res) => {
    const addresse = req.body.addresse;
    let client = [];

    data.clients.map(cli => {
        data.charges.map(cha => {
            if(cha.reference_fiscal === cli.nif && cli.adresse === addresse)
                client.push({...cli, ...cha});
        })
    })

    res.json(client);
    client = [];
}

module.exports = {
    setModePayment,
    getPaymentByTwoDate,
    getAllPayment,
    getClientByRaisonSocial,
    getClientByNomCommercial,
    getClientByAddresse,
    getClientByRecepisse,
    getRecapRecette
}