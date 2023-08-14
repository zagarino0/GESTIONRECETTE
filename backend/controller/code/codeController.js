const getDataExcel = require('../../utils/ExcelData');
const setDataExcel = require('../../utils/setDataExcel');
const updateDataExcel = require('../../utils/updateDataExcel');
const deleteDataExcel = require('../../utils/deleteDataExcel');
const path = require('path')

//-----------------------------------code geographique-----------------------------------

const getCodeGeographique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'));
}

const getCodeGeographiqueById = (req, res) => {
    const id = req.params.id;
    const codeGeos = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique');
    const codeGeo = codeGeos.find(geo => geo.id == id);
    if (!codeGeo) return res.status(400).json({ "message": "info not found" });
    res.json(codeGeo);
}

const setCodeGeographique = (req, res) => {
    const codeGeos = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique');
    const id = parseInt(codeGeos[codeGeos.length - 1].id) + 1;
    const code = req.body.code;
    const libelle = req.body.libelle;
    const newCodeGeo = [
        [
            id,
            code,
            libelle
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', newCodeGeo);
    res.json({ 'success': 'code has been created' });
}

const updateCodeGeographique = (req, res) => {
    const id = req.params.id;
    const code = req.body.code;
    const libelle = req.body.libelle;

    const codeGeo = [
        id,
        code,
        libelle

    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', id, codeGeo);
    res.json({ 'success': 'code geographique has been updated' });

}

const deleteCodeGeographique = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', id);
    res.json({ 'success': 'code geographique has been deleted' });
}


//-----------------------------------code banque-----------------------------------

const getCodeBanque = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}

//-----------------------------------code forme juridique-----------------------------------

const getCodeFormeJuridique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique'));
}


//-----------------------------------code impot-----------------------------------

const getCodeImpot = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot'));
}

const getCodeImpotByNumber = (req, res) => {
    const numero_impot = req.params.numero_impot;
    const impot = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').find(imp => imp.numero_impot == numero_impot);
    if (!impot) return res.status(400).json({ "message": "tax not found" });
    res.json(impot);
}

//-----------------------------------periodicite-----------------------------------

const getPeriodicite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite'));
}

const getPeriodiciteById = (req, res) => {
    const id = req.params.id;

    const periodicite = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').find(per => per.id == id);
    if (!periodicite) return res.status(400).json({ 'message': 'periodicite not found' });

    res.json(periodicite);
}

const setPeriodicite = (req, res) => {
    const periodicites = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite');
    const id = parseInt(periodicites[periodicites.length - 1].id) + 1;
    const numero_auto = req.body.numero_auto;
    const periode = req.body.periode;
    const desc_mois = req.body.desc_mois;
    const titre = req.body.titre;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const exerc = req.body.exerc;

    const newPeriodicite = [
        [
            id,
            numero_auto,
            periode,
            desc_mois,
            titre,
            p1,
            p2,
            exerc
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', newPeriodicite);
    res.status(200).json({ 'success': 'periodicite has been created' });
}

const updatePeriodicite = (req, res) => {
    const id = req.params.id;
    const numero_auto = req.body.numero_auto;
    const periode = req.body.periode;
    const desc_mois = req.body.desc_mois;
    const titre = req.body.titre;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const exerc = req.body.exerc;

    const periodicite = [
        id,
        numero_auto,
        periode,
        desc_mois,
        titre,
        p1,
        p2,
        exerc
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', id, periodicite);
    res.json({ 'success': 'code has been updated' });
}

const deletePeriodicite = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', id);
    res.status(200).json({ 'success': 'periodicite has been deleted' });
}

//-----------------------------------obligation fiscal-----------------------------------

const getObligationFiscale = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal'));
}

//-----------------------------------procès verbaux-----------------------------------

const getProcesVerbaux = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}

//-----------------------------------operateur telephonique-----------------------------------

const getOperateurTelephonique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique'));
}

//-----------------------------------date cloture-----------------------------------

const getDateCloture = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture'));
}

const getDateClotureByNumber = (req, res) => {
    const numero = req.params.numero;

    const dateClo = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').find(clo => clo.numero == numero);
    if (!dateClo) return res.status(400).json({ 'message': 'data not found' });
    res.json(dateClo);
}

const setDateCloture = (req, res) => {
    const numero = req.body.numero;
    const cloture = req.body.cloture;

    const newDateClo = [
        [
            numero,
            cloture
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', newDateClo);
    res.json({ 'success': 'date cloture has been created' });
}

const updateDateCloture = (req, res) => {
    const numero = req.params.numero;
    const cloture = req.body.cloture;

    const dateClo = [
        numero,
        cloture
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', numero, dateClo);
    res.json({ 'success': 'code geographique has been updated' });

}

const deleteDateCloture = (req, res) => {
    const numero = req.params.numero;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', numero);
    res.json({ 'success': 'date cloture has been deleted' });
}

//-----------------------------------code periodicite-----------------------------------

const getCodePeriodicite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
}

const getCodePeriodiciteByNumber = (req, res) => {
    const numero = req.params.numero;
    
    const codePer = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite').find(per => per.numero == numero);
    if(!codePer) return res.status(400).json({'message': 'code not found'});
    res.json(codePer);
}

const setCodePeriodicite = (req, res) => {
    const numero = req.body.numero;
    const periodicite = req.body.periodicite;

    const newCodePer = [
        [
            numero,
            periodicite
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', newCodePer);
    res.status(200).json({ 'success': 'code cloture has been created' });
}

const updateCodePeriodicite = (req, res) => {
    const numero = req.params.numero;
    const periodicite = req.body.periodicite;

    const codePer = [
        numero,
        periodicite
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', numero, codePer);
    res.status(200).json({ 'success': 'code has been updated' });

}


const deleteCodePeriodicite = (req, res) => {
    const numero = req.params.numero;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', numero);
    res.json({ 'success': 'code cloture has been deleted' });
}

//-----------------------------------affectation budgetaire-----------------------------------

const getAffectationBudgetaire = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}

//-----------------------------------numero budget-----------------------------------

const getNumeroBudget = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget'));
}

//-----------------------------------grand impot-----------------------------------

const getGrandsImpots = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'grands impot'));
}

//-----------------------------------code activite-----------------------------------

const getCodeActivite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite'));
}

//-----------------------------------chef action-----------------------------------

const getChefAction = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}

//-----------------------------------type prevision-----------------------------------

const getTypePrevision = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision'));
}

//-----------------------------------jour ferier-----------------------------------

const getJourFerie = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie'));
}


module.exports = {
    getCodeBanque,
    getCodeGeographique,
    getCodeGeographiqueById,
    setCodeGeographique,
    updateCodeGeographique,
    deleteCodeGeographique,
    getCodeFormeJuridique,
    getCodeImpot,
    getCodeImpotByNumber,
    getPeriodicite,
    getPeriodiciteById,
    setPeriodicite,
    updatePeriodicite,
    deletePeriodicite,
    getAffectationBudgetaire,
    getChefAction,
    getCodePeriodicite,
    getDateCloture,
    setDateCloture,
    updateDateCloture,
    deleteDateCloture,
    getDateClotureByNumber,
    getGrandsImpots,
    getJourFerie,
    getNumeroBudget,
    getOperateurTelephonique,
    getProcesVerbaux,
    getTypePrevision,
    getCodeActivite,
    getCodePeriodiciteByNumber,
    setCodePeriodicite,
    updateCodePeriodicite,
    deleteCodePeriodicite,
    getObligationFiscale
}