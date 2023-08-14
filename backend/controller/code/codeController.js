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
    res.json({ 'success': 'code geographique has been deleted'});
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
    if(!dateClo) return res.status(400).json({'message': 'data not found'});
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
    res.json({ 'success': 'date cloture has been deleted'});
}

//-----------------------------------code periodicite-----------------------------------
const getCodePeriodicite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
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
    getObligationFiscale
}