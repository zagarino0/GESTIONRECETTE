const data = {
    modePayment: require('../../model/recette/mode_payment.json'),
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    modePaymentNonPeriodiques: require('../../model/recette/mode_payment_non_periodique.json'),
    setModePaymentNonPeriodiques: function (data) { this.modePaymentNonPeriodiques = data },
    charges: require("../../model/immatriculation/charge.json"),
    setModePayment: function (data) { this.modePayment = data }
}

const path = require('path');
const fsPromises = require('fs').promises;

const setModePaymentPeriodique = async (req, res) => {

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

    const abbreviation_type_payment = req.body.abbreviation_type_payment;


    const payment = {
        "id_payment": id,
        "reference_fiscal": reference_fiscal,
        "numero_impot": numero_impot,
        "annee": annee,
        "base_impot": base_impot,
        "montant_a_payer": montant_a_payer,
        "montant_verser": montant_verser,
        "reste_a_payer": reste_a_payer,
        "type_payment": type_payment,
        "abbreviation_type_payment": abbreviation_type_payment,
        "numero_cheque": numero_cheque,
        "code_banque": code_banque,
        "transporteur": transporteur,
        "numero_recepisse": numero_recepisse,
        "periode": periode,
        "periode1": periode1,
        "periode2": periode2,
        "date_creation": new Date()
    }

    data.Periodique([...data.modePayment, payment]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json'),
        JSON.stringify(data.modePayment)
    )
    res.status(200).json(data.json);
}

const getClientByRecepisse = (req, res) => {
    const numero_recepisse = req.body.numero_recepisse;

    let client = [];

    if (numero_recepisse === "") {
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if (mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal)
                        client.push({ ...cli, ...cha, ...mod });
                })
            })
        })
    } else if (numero_recepisse !== "") {
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if (mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal && mod.numero_recepisse === numero_recepisse)
                        client.push({ ...cli, ...cha, ...mod });
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
            if (cha.reference_fiscal === cli.nif && cli.raison_sociale === raison_social)
                client.push({ ...cli, ...cha });
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
        if (mod.date_creation >= date_init && mod.date_creation <= date_fin)
            totalRecette += parseFloat(mod.montant_verser);
    })

    res.json(totalRecette);
    totalRecette = 0;

}

const getClientByRecepisseAndDate = (req, res) => {
    const numero_recepisse = req.body.numero_recepisse;
    const date = req.body.date

    let client = [];

    if (numero_recepisse.length === 0) {
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if (mod.numero_recepisse == numero_recepisse && cli.nif === cha.reference_fiscal && date_creation == date)
                        client.push({ ...cli, ...cha, ...mod });
                })
            })
        })
    } else if (numero_recepisse.length !== 0) {
        data.clients.map(cli => {
            data.charges.map(cha => {
                data.modePayment.map(mod => {
                    if (mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal && mod.numero_recepisse === numero_recepisse && mod.date_creation == date)
                        client.push({ ...cli, ...cha, ...mod });
                })
            })
        })
    }

    res.json(client);
    client = [];
}

const getClientByDate = (req, res) => {
    const date = req.body.date

    let client = [];

    data.clients.map(cli => {
        data.charges.map(cha => {
            data.modePayment.map(mod => {
                if (mod.numero_recepisse === numero_recepisse && cli.nif === cha.reference_fiscal && mod.date_creation == date)
                    client.push({ ...cli, ...cha, ...mod });
            })
        })
    })

    res.json(client);
    client = [];
}

const getExtraitRecetteByDate = (req, res) => {
    let impots = {};

    const date = new Date(req.body.date_init);

    let is_dec = 0;
    let is_mois = 0;
    let is_ans = 0;


    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        data.recettes.map(rec => {
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && rec.date_creation == date) {
                is_dec += rec.montant_verser;
            }
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && (new Date(rec.date_creation)).getMonth() == date_init.getMonth()) {
                is_mois += rec.montant_verser;
            }
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && (new Date(rec.date_creation)).getFullYear() == date_init.getFullYear()) {
                is_ans += rec.montant_verser;
            }
        })
    });

    impots = {
        'is_dec': is_dec,
        'is_mois': is_mois,
        'is_ans': is_ans,
    }

    res.json(impots);
}

const getExtraitRecetteByTwoDate = (req, res) => {
    let impots = {};

    const date_init = new Date(req.body.date_init);
    const date_fin = new Date(req.body.date_fin);

    let is_dec = 0;
    let is_mois = 0;
    let is_ans = 0;


    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        data.recettes.map(rec => {
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && (new Date(rec.date_creation)) >= date_init && (new Date(rec.date_creation)) <= date_fin) {
                is_dec += rec.montant_verser;
            }
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && (new Date(rec.date_creation)).getMonth() == date_init.getMonth()) {
                is_mois += rec.montant_verser;
            }
            if (imp.pcop == '7023' && imp.numero_impot == rec.numero_impot && rec.montant_verser != 0 && (new Date(rec.date_creation)).getFullYear() == date_init.getFullYear()) {
                is_ans += rec.montant_verser;
            }
        })
    });

    impots = {
        'is_dec': is_dec,
        'is_mois': is_mois,
        'is_ans': is_ans,
    }

    res.json(impots);
}


const getClientByNomCommercial = (req, res) => {
    const nom_commercial = req.body.nom_commercial;
    let client = []

    data.clients.map(cli => {
        data.charges.map(cha => {
            if (cha.reference_fiscal === cli.nif && cli.nom_commerciale === nom_commercial)
                client.push({ ...cli, ...cha });
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
            if (cha.reference_fiscal === cli.nif && cli.adresse === addresse)
                client.push({ ...cli, ...cha });
        })
    })

    res.json(client);
    client = [];
}

const setModePaymentNonPeriodique = async (req, res) => {
    const id = data.length === 0 ? 1 : data.modePaymentNonPeriodiques[data.modePaymentNonPeriodiques.length - 1].id_payment + 1;
    const nif_regisseur = req.body.nif_regisseur;
    const numero_impot = req.body.numero_impot;
    const raison_social = req.body.raison_social;
    const nom_commercial = req.body.nom_commercial;
    const adresse = req.body.adresse;
    const commune = req.body.commune;
    const montant_a_payer = req.body.montant_a_payer;
    const montant_verser = req.body.montant_verser;
    const reste_a_payer = req.body.reste_a_payer;
    const type_payment = req.body.type_payment;
    const numero_cheque = req.body.numero_cheque;
    const code_banque = req.body.code_banque;
    const nom_commercial_banque = req.body.nom_commercial_banque;
    const rib = req.body.rib;
    const transporteur = req.body.transporteur;
    const numero_recepisse = req.body.numero_recepisse;
    const annee = req.body.annee;
    const periode = req.body.periode;
    const periode1 = req.body.periode1;
    const periode2 = req.body.periode2;

    const date_cloture_exercice = req.body.date_cloture_exercice;
    const type_prev = req.body.type_prev;

    const amende_penalite = req.body.amende_penalite;

    const payment = {
        "id_payment": id,
        "nif_regisseur": nif_regisseur,
        "numero_impot": numero_impot,
        "raison_social": raison_social,
        "nom_commercial": nom_commercial,
        "adresse": adresse,
        "commune": commune,
        "montant_a_payer": montant_a_payer,
        "montant_verser": montant_verser,
        "reste_a_payer": reste_a_payer,
        "type_payment": type_payment,
        "numero_cheque": numero_cheque,
        "code_banque": code_banque,
        "nom_commercial_banque": nom_commercial_banque,
        "rib": rib,
        "transporteur": transporteur,
        "numero_recepisse": numero_recepisse,
        "annee": annee,
        "periode": periode,
        "periode1": periode1,
        "periode2": periode2,
        "date_cloture_exercice": date_cloture_exercice,
        "type_prev": type_prev,
        "amende_penalite": amende_penalite
    }

    data.setModePaymentNonPeriodiques([...data.modePaymentNonPeriodiques, payment]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment_non_periodique.json'),
        JSON.stringify(data.modePaymentNonPeriodiques)
    )
    res.json(payment);
}

module.exports = {
    setModePaymentPeriodique,
    setModePaymentNonPeriodique,
    getPaymentByTwoDate,
    getAllPayment,
    getClientByRaisonSocial,
    getClientByNomCommercial,
    getClientByAddresse,
    getClientByRecepisse,
    getRecapRecette,
    getClientByRecepisseAndDate,
    getClientByDate,
    getExtraitRecetteByDate,
    getExtraitRecetteByTwoDate
}