const data = {
    clients: require('../../../../e-immatriculation/backend/model/contribuable.json'),
    
    activites: require("../../../../e-immatriculation/backend/model/activite.json"),
    actionnaires: require("../../../../e-immatriculation/backend/model/actionnaire.json"),
    dirigeants: require("../../../../e-immatriculation/backend/model/dirigeant.json"),
    interlocuteurs: require("../../../../e-immatriculation/backend/model/interlocuteur.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    sieges: require("../../../../e-immatriculation/backend/model/siege.json"),
    coordonnees: require("../../../../e-immatriculation/backend/model/coordonnees.json"),
    etablissements: require("../../../../e-immatriculation/backend/model/etablissement.json"),
    autres: require("../../../../e-immatriculation/backend/model/autre.json"),

    impots: require('../../model/parametre/impot.json'),

    recettes: require('../../model/recette/mode_payment.json'),
}

const path = require('path');

const getDataExcel = require('../../utils/ExcelData');

const getRecetteByTwoDate = (req, res) => {
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

const getRecetteByDecade = (req, res) => {
    const date_init = new Date(req.body.date_init);

    const date_fin = date_init;
    date_fin.setDate(date_fin.getDate() + 10);

    let is_dec = 0;
    let is_mois = 0;
    let is_ans = 0;

    let pcop = [];
    let init = 0;

    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        pcop.push(imp.pcop);
    });

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
                console.log(rec);
            }
        })
    });


    let impots = {
        'is_dec': is_dec,
        'is_mois': is_mois,
        'is_ans': is_ans,        
    }

    res.json(impots);
    impots = {};
}

const getEncaissementEspece = (req, res) => {

}

const getEncaissementCheque = (req, res) => {

}

const getEncaissementBar = (req, res) => {

}

const getEncaissementBCM = (req, res) => {

}

const extraitTotauxRecetteEntreDeuxDate = (req, res) => {
    const date_debut = req.body.date_debut;
    const date_fin = req.body.date_fin;

    let numero_impot_temp = 0;
    let total = 0;
    const payment = data.recettes.filter(rec => (new Date(rec.date_creation)) >= (new Date(date_debut)) && (new Date(rec.date_creation)) <= (new Date(date_fin)) && rec.montant_a_payer !== 0);
    const impots = [];
    payment.map(pay => {
        data.impots.map(imp => {
            if(imp.numero_impot === pay.numero_impot){
                if(imp.numero_impot === numero_impot_temp){
                    total += pay.montant_verser;
                }else{
                    impots.push({...imp, ...pay, total});
                    numero_impot_temp = imp.numero_impot;
                    total = 0;
                }
            }
        })
    })
    res.json(impots);
}

const compteRenduRecette = (req, res) => {
    const date_debut = req.body.date_debut;
    const date_fin = req.body.date_fin;

    let numero_impot_temp = 0;
    let numero_impot_temp2 = 0;
    let numero_impot_temp1 = 0;

    let mois = 0;
    let annee = 0;

    let total = 0;
    let total_entre_mois = 0;
    let total_entre_annees = 0;

    const payment = data.recettes.filter(rec => (new Date(rec.date_creation)) >= (new Date(date_debut)) && (new Date(rec.date_creation)) <= (new Date(date_fin)) && rec.montant_a_payer !== 0);
    const impots = [];
    payment.map(pay => {
        data.impots.map(imp => {
            if(imp.numero_impot === pay.numero_impot){
                if(imp.numero_impot === numero_impot_temp){
                    total += pay.montant_verser;
                }else{
                    const paymentTemps1 = data.recettes.filter(rec => (new Date(rec.date_creation)).getMonth() === (new Date(date_debut)).getMonth() && rec.montant_a_payer !== 0)
                    paymentTemps1.map(paytmp1 => {
                        data.impots.map(imptmp1 => {
                            if(paytmp1.numero_cheque === imptmp1.numero_impot){
                                if(imptmp1.numero_impot === numero_impot_temp1){
                                    total_entre_mois += paytmp1.montant_verser;
                                }else{
                                    mois = total_entre_mois
                                    total_entre_mois = 0;
                                    numero_impot_temp1 = imptmp1.numero_impot;
                                }
                            }
                        })
                    })
                    const paymentTemps2 = data.recettes.filter(rec => (new Date(rec.date_creation)).getFullYear() === (new Date(date_debut)).getFullYear() && rec.montant_a_payer !== 0)
                    paymentTemps2.map(paytmp2 => {
                        data.impots.map(imptmp2 => {
                            if(paytmp2.numero_cheque === imptmp2.numero_impot){
                                if(paytmp2.numero_impot === numero_impot_temp2){
                                    total_entre_annees += paytmp2.montant_verser;
                                }else{
                                    annee = total_entre_annees;
                                    total_entre_annees = 0;
                                    numero_impot_temp2 = imptmp2.numero_impot;
                                }
                            }
                        })
                    })
                    impots.push({...imp, ...pay, annee, mois, total});
                    numero_impot_temp = imp.numero_impot;
                    total = 0;
                }
            }
        })
    })
    res.json(impots);
}


const etatDetailleEncaissement = (req, res) => {
    const date_debut = req.body.date_debut;
    const date_fin = req.body.date_fin;




    res.json(contribuable)
}
module.exports = {
    getRecetteByTwoDate,
    compteRenduRecette,
    extraitTotauxRecetteEntreDeuxDate,
    getRecetteByDecade,
    getEncaissementBCM,
    getEncaissementBar,
    getEncaissementCheque,
    getEncaissementEspece
}