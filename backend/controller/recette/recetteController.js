const data = {
    modePayment: require('../../model/recette/mode_payment.json'),
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    modePaymentNonPeriodiques: require('../../model/recette/mode_payment_non_periodique.json'),
    setModePaymentNonPeriodiques: function (data) { this.modePaymentNonPeriodiques = data },
    charges: require("../../model/immatriculation/charge.json"),
    setModePayment: function (data) { this.modePayment = data },
    // Ajoutez la méthode Periodique ici
    Periodique: function(payments) {
        this.modePayment = payments;
    } ,
    recette_history : require("../../model/recette/recette_historique.json"),
    setRecetteHistory: function (data) { this.recette_history = data },
    user_history : require("../../model/user/user_historique.json"),
    setUserHistory : function (data) { this.user_history = data },
};

const path = require('path');
const fsPromises = require('fs').promises;

const setModePaymentPeriodique = async (req, res) => {

    const id = data.length === 0 || !data.modePayment ? 1 : data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id_payment + 1;

    const {
        numero_impot,
        annee,
        base_impot,
        montant_a_payer,
        montant_verser,
        reste_a_payer,
        type_payment,
        numero_cheque,
        code_banque,
        numero_recepisse,
        periode,
        transporteur,
        periode1,
        periode2,
        reference_fiscal,
        raison_social,
        activite ,
        adresse,
        commune,
        abbreviation_type_payment,
        type_prevision,
        numero_immatriculation ,
        annulation ,
        code_operateur
    } = req.body;

    const payment = {
        "id_payment": id,
        "reference_fiscal": reference_fiscal,
        "raison_social": raison_social,
        "activite": activite,
        "adresse": adresse,
        "commune": commune,
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
        "type_prevision": type_prevision,
        "numero_immatriculation": numero_immatriculation,
        "annulation" : annulation ,
        "code_operateur" : code_operateur,
        "date_creation": new Date()
    };

    const id_modepayment = data.length === 0 || !data.modePayment ? 1 : data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id_payment + 1;
    
    const history_recette = {
        "id" : id_modepayment ,
        "numero_recepisse" : numero_recepisse ,
        "motif": "création de recette Periodique",
        "date_creation" : new Date(),
    }
    
    const id_user_history = data.length === 0 || !data.modePayment ? 1 : data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id_payment + 1;

    const User_history = {
        "id": id_user_history ,
        "user": code_operateur,
        "motif": "creationde recette Peridoque",
        "date_creation" : new Date()
    }

    data.setRecetteHistory([...data.recette_history , history_recette])
    data.Periodique([...data.modePayment, payment]);
    data.setUserHistory([...data.user_history , User_history]);


    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json'),
            JSON.stringify(data.modePayment)
        );
        res.json(data.modePayment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to write file' });
    }

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'recette', 'recette_historique.json'),
            JSON.stringify(data.recette_history)
        );
        res.json(data.recette_history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to write file history recette' });
    }

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'user_historique.json'),
            JSON.stringify(data.user_history)
        );
        res.json(data.user_history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to write file history user' });
    }
};


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
    const id = data.length === 0 || !data.modePaymentNonPeriodiques ? 1 : data.modePaymentNonPeriodiques.length === 0 ? 1 : data.modePaymentNonPeriodiques[data.modePaymentNonPeriodiques.length - 1].id_payment + 1;
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
    const abbreviation_type_payment = req.body.abbreviation_type_payment;

    const date_cloture_exercice = req.body.date_cloture_exercice;
    const type_prev = req.body.type_prev;

    const amende_penalite = req.body.amende_penalite;
    const annulation = req.body.annulation;
    const activite = req.body.activite;
    const fokontany = req.body.fokontany ;
    const code_operateur = req.body.code_operateur;
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
        "amende_penalite": amende_penalite,
        "abbreviation_type_payment": abbreviation_type_payment,
        "annulation": annulation ,
        "activite": activite ,
        "fokontany": fokontany , 
        "code_operateur": code_operateur ,
        "date_creation": new Date()
    }

    const id_modepayment = data.length === 0 || !data.modePayment ? 1 : data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id_payment + 1;
    
    const history_recette = {
        "id" : id_modepayment ,
        "numero_recepisse" : numero_recepisse ,
        "motif": "création de recette Non Periodique",
        "date_creation" : new Date(),
    }

    
    data.setRecetteHistory([...data.recette_history , history_recette])

    data.setModePaymentNonPeriodiques([...data.modePaymentNonPeriodiques, payment]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment_non_periodique.json'),
        JSON.stringify(data.modePaymentNonPeriodiques)
    )
    res.json(payment);

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'recette', 'recette_historique.json'),
            JSON.stringify(data.recette_history)
        );
        res.json(data.recette_history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to write file history recette' });
    }
}

const getAllEnregistrementDeclaration = async (req, res) => {
    try {
        // Define the path to the JSON file
        const filePath = path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json');
        
        // Read the file asynchronously
        const data = await fsPromises.readFile(filePath, 'utf8');
        
        // Parse the JSON data
        const modePayment = JSON.parse(data);
        
        // Send the data as a response
        res.status(200).json(modePayment);
    } catch (error) {
        // Handle errors (e.g., file not found, JSON parse error)
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


const getAllEnregistrementDeclarationNonPeriodique = async (req, res) => {
    try {
        // Define the path to the JSON file
        const filePath = path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment_non_periodique.json');
        
        // Read the file asynchronously
        const data = await fsPromises.readFile(filePath, 'utf8');
        
        // Parse the JSON data
        const modePayment = JSON.parse(data);
        
        // Send the data as a response
        res.status(200).json(modePayment);
    } catch (error) {
        // Handle errors (e.g., file not found, JSON parse error)
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


const getAllHistoryRecette = async (req, res) => {
    try {
        // Define the path to the JSON file
        const filePath = path.join(__dirname, '..', '..', 'model', 'recette', 'recette_historique.json');
        
        // Read the file asynchronously
        const data = await fsPromises.readFile(filePath, 'utf8');
        
        // Parse the JSON data
        const modePayment = JSON.parse(data);
        
        // Send the data as a response
        res.status(200).json(modePayment);
    } catch (error) {
        // Handle errors (e.g., file not found, JSON parse error)
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};


const updateModePaymentPeriodique = async (req, res) => {
    const { id_payment } = req.params; // Récupérer l'id du paiement à mettre à jour
    const {
        numero_impot,
        annee,
        base_impot,
        montant_a_payer,
        montant_verser,
        reste_a_payer,
        type_payment,
        numero_cheque,
        code_banque,
        numero_recepisse,
        periode,
        transporteur,
        periode1,
        periode2,
        reference_fiscal,
        raison_social,
        activite,
        adresse,
        commune,
        abbreviation_type_payment,
        type_prevision,
        numero_immatriculation,
        annulation,
        code_operateur
    } = req.body;

    // Rechercher l'élément à mettre à jour
    const paymentIndex = data.modePayment.findIndex(payment => payment.id_payment === parseInt(id_payment));

    if (paymentIndex === -1) {
        return res.status(404).json({ error: 'Payment not found' });
    }

    // Mettre à jour les champs
    data.modePayment[paymentIndex] = {
        ...data.modePayment[paymentIndex],
        numero_impot: numero_impot || data.modePayment[paymentIndex].numero_impot,
        annee: annee || data.modePayment[paymentIndex].annee,
        base_impot: base_impot || data.modePayment[paymentIndex].base_impot,
        montant_a_payer: montant_a_payer || data.modePayment[paymentIndex].montant_a_payer,
        montant_verser: montant_verser || data.modePayment[paymentIndex].montant_verser,
        reste_a_payer: reste_a_payer || data.modePayment[paymentIndex].reste_a_payer,
        type_payment: type_payment || data.modePayment[paymentIndex].type_payment,
        numero_cheque: numero_cheque || data.modePayment[paymentIndex].numero_cheque,
        code_banque: code_banque || data.modePayment[paymentIndex].code_banque,
        numero_recepisse: numero_recepisse || data.modePayment[paymentIndex].numero_recepisse,
        periode: periode || data.modePayment[paymentIndex].periode,
        periode1: periode1 || data.modePayment[paymentIndex].periode1,
        periode2: periode2 || data.modePayment[paymentIndex].periode2,
        reference_fiscal: reference_fiscal || data.modePayment[paymentIndex].reference_fiscal,
        raison_social: raison_social || data.modePayment[paymentIndex].raison_social,
        activite: activite || data.modePayment[paymentIndex].activite,
        adresse: adresse || data.modePayment[paymentIndex].adresse,
        commune: commune || data.modePayment[paymentIndex].commune,
        abbreviation_type_payment: abbreviation_type_payment || data.modePayment[paymentIndex].abbreviation_type_payment,
        type_prevision: type_prevision || data.modePayment[paymentIndex].type_prevision,
        numero_immatriculation: numero_immatriculation || data.modePayment[paymentIndex].numero_immatriculation,
        annulation: annulation !== undefined ? annulation : data.modePayment[paymentIndex].annulation,
        code_operateur: code_operateur || data.modePayment[paymentIndex].code_operateur,
        transporteur : transporteur || data.modePayment[paymentIndex].transporteur,
        date_modification: new Date() // Ajouter la date de modification
    };

    // Enregistrer les changements dans le fichier
    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json'),
            JSON.stringify(data.modePayment)
        );
        res.json(data.modePayment[paymentIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to write file' });
    }
};


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
    getExtraitRecetteByTwoDate ,
    getAllEnregistrementDeclaration ,
    getAllEnregistrementDeclarationNonPeriodique ,
    getAllHistoryRecette , 
    updateModePaymentPeriodique,
}