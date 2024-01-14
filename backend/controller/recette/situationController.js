const data = {
    clients: require('../../../../e-immatriculation/backend/model/client.json'),
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


module.exports = {
    getRecetteByTwoDate,
    getRecetteByDecade,
    getEncaissementBCM,
    getEncaissementBar,
    getEncaissementCheque,
    getEncaissementEspece
}