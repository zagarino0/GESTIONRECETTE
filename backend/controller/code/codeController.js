const getDataExcel = require('../../utils/ExcelData');
const setDataExcel = require('../../utils/setDataExcel');
const updateDataExcel = require('../../utils/updateDataExcel');
const deleteDataExcel = require('../../utils/deleteDataExcel');
const path = require('path')


//-------------------------------------------------------------------------------------------
//                                   code geographique
//-------------------------------------------------------------------------------------------

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


//-------------------------------------------------------------------------------------------
//                                          code banque
//-------------------------------------------------------------------------------------------

const getCodeBanque = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}


//-------------------------------------------------------------------------------------------
//                                    code forme juridique
//-------------------------------------------------------------------------------------------

const getCodeFormeJuridique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique'));
}



//-------------------------------------------------------------------------------------------
//                                      code impot
//-------------------------------------------------------------------------------------------

const getCodeImpot = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot'));
}

const getCodeImpotByNumber = (req, res) => {
    const numero_impot = req.params.numero_impot;
    const impot = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').find(imp => imp.numero_impot == numero_impot);
    if (!impot) return res.status(400).json({ "message": "tax not found" });
    res.json(impot);
}

//-------------------------------------------------------------------------------------------
//                                          periodicite
//-------------------------------------------------------------------------------------------

const getPeriodicite = (req, res) => {
    let periodicites = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
            if(clo.numero == per.id_clo)
                periodicites.push({...clo, ...per});
        });    
    });    
    res.json(periodicites);
    periodicite = [];
}

const getPeriodiciteById = (req, res) => {
    const id = req.params.id;
    let periodicite = {};
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
            if(clo.numero == per.id_clo && per.id == id)
                periodicite = {...clo, ...per};
        });    
    });
    
    if (!periodicite) return res.status(400).json({ 'message': 'periodicite not found' });

    res.json(periodicite);
    periodicite = {};
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
    const id_clo = req.body.id_clo;

    const newPeriodicite = [
        [
            id,
            numero_auto,
            periode,
            desc_mois,
            titre,
            p1,
            p2,
            id_clo
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
    const exerc = req.body.id_clo;

    const periodicite = [
        id,
        numero_auto,
        periode,
        desc_mois,
        titre,
        p1,
        p2,
        id_clo
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', id, periodicite);
    res.json({ 'success': 'code has been updated' });
}

const deletePeriodicite = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', id);
    res.status(200).json({ 'success': 'periodicite has been deleted' });
}




//-------------------------------------------------------------------------------------------
//                                 obligation fiscale
//-------------------------------------------------------------------------------------------

const getObligationFiscale = (req, res) => {
    let obligationFiscs = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal').map(fisc => {
            getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite').find(per => {
                if (imp.numero_impot == fisc.numero_impot && per.periodicite == fisc.periodicite)
                obligationFiscs.push({ ...imp, ...fisc, ...per });
            })
        })
    })
    res.json(obligationFiscs);
    obligationFiscs = [];
}

const getObligationFiscaleById = (req, res) => {
    const id = req.params.id;
    let obligationFisc = {};
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').find(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal').find(fisc => {
            getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite').find(per => {
                if (imp.numero_impot == fisc.numero_impot && fisc.id == id && per.periodicite == fisc.periodicite)
                obligationFisc = { ...imp, ...per, ...fisc };
            })
        })
    })
    res.json(obligationFisc);
    obligationFisc = {};
}

const setObligationFiscale = (req, res) => {
    const obligationFiscs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal');
    const id = parseInt(obligationFiscs[obligationFiscs.length - 1].id) + 1;
    const numero_impot = req.body.numero_impot;
    const choix = req.body.choix;
    const obligation = req.body.obligation;
    const periodicite = req.body.periodicite;
    const option = req.body.option;
    const taxation = req.body.taxation;
    const penalite = req.body.penalite;

    const newObligationFisc = [
        [
            id,
            numero_impot,
            choix,
            obligation,
            periodicite,
            option,
            taxation,
            penalite
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal', newObligationFisc);
    res.status(200).json({ 'success': 'obligation fiscal has been created' });
}

const updateObligationFiscale = (req, res) => {
    const id = req.params.id;
    const numero_impot = req.body.numero_impot;
    const choix = req.body.choix;
    const obligation = req.body.obligation;
    const periodicite = req.body.periodicite;
    const option = req.body.option;
    const taxation = req.body.taxation;
    const penalite = req.body.penalite;

    const obligationFisc = [
        id,
        numero_impot,
        choix,
        obligation,
        periodicite,
        option,
        taxation,
        penalite
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal', id, obligationFisc);
    res.json({ 'success': 'obligation fiscal updated has been updated' });
}

const deleteObligationFiscale = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal', id);
    res.json({ 'success': 'obligation fiscal has been deleted' });
}


//-------------------------------------------------------------------------------------------
//                                          procès verbaux
//-------------------------------------------------------------------------------------------

const getProcesVerbaux = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}



//-------------------------------------------------------------------------------------------
//                                operateur telephonique
//-------------------------------------------------------------------------------------------

const getOperateurTelephonique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique'));
}


//-------------------------------------------------------------------------------------------
//                                    date cloture
//-------------------------------------------------------------------------------------------

const getDateCloture = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture'));
}

const getDateClotureByNumber = (req, res) => {
    const id = req.params.id;

    const dateClo = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').find(clo => clo.id == id);
    if (!dateClo) return res.status(400).json({ 'message': 'data not found' });
    res.json(dateClo);
}

const setDateCloture = (req, res) => {
    const dateClos = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture');
    const id = parseInt(dateClos[dateClos.length - 1].id) + 1;
    const numero = req.body.numero;
    const cloture = req.body.cloture;

    const newDateClo = [
        [
            id,
            numero,
            cloture
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', newDateClo);
    res.json({ 'success': 'date cloture has been created' });
}

const updateDateCloture = (req, res) => {
    const id = req.params.id;
    const numero = req.body.numero;
    const cloture = req.body.cloture;

    const dateClo = [
        id,
        numero,
        cloture
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', id, dateClo);
    res.json({ 'success': 'date cloture has been updated' });

}

const deleteDateCloture = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', id);
    res.json({ 'success': 'date cloture has been deleted' });
}




//-------------------------------------------------------------------------------------------
//                                       code periodicite
//-------------------------------------------------------------------------------------------

const getCodePeriodicite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
}

const getCodePeriodiciteByNumber = (req, res) => {
    const numero = req.params.numero;

    const codePer = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite').find(per => per.numero == numero);
    if (!codePer) return res.status(400).json({ 'message': 'code not found' });
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
    res.status(200).json({ 'success': 'code has been created' });
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
    res.json({ 'success': 'code has been deleted' });
}



//-------------------------------------------------------------------------------------------
//                                   affectation budgetaire
//-------------------------------------------------------------------------------------------

const getAffectationBudgetaire = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}



//-------------------------------------------------------------------------------------------
//                                          numero budget
//-------------------------------------------------------------------------------------------

const getNumeroBudget = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget'));
}



//-------------------------------------------------------------------------------------------
//                                          grand impot
//-------------------------------------------------------------------------------------------

const getGrandsImpots = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'grands impot'));
}



//-------------------------------------------------------------------------------------------
//                                          code activité
//-------------------------------------------------------------------------------------------

const getCodeActivite = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite'));
}



//-------------------------------------------------------------------------------------------
//                                          chef d'aciton
//-------------------------------------------------------------------------------------------

const getChefAction = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}


//-------------------------------------------------------------------------------------------
//                                          type prevision
//-------------------------------------------------------------------------------------------

const getTypePrevision = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision'));
}



//-------------------------------------------------------------------------------------------
//                                          jour ferie
//-------------------------------------------------------------------------------------------

const getJourFerie = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie'));
}

const getJourFerieById = (req, res) => {
    const id = req.params.id;
    const jourFer = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie').find(fer => fer.id == id);
    if (!jourFer) res.status(404).json({ 'message': 'data not found' });
    res.json(jourFer);
}

const setJourFerie = (req, res) => {
    const jourFers = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie');
    const id = parseInt(jourFers[jourFers.length - 1].id) + 1;
    const date = req.body.date;
    const jour = req.body.jour;
    const motif = req.body.motif;

    const jourFer = [
        [
            id,
            date,
            jour,
            motif
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie', jourFer);
    res.status(200).json({ 'success': 'jour ferie has been created' });

}

const updateJourFerie = (req, res) => {
    const id = req.params.id;
    const date = req.body.date;
    const jour = req.body.jour;
    const motif = req.body.motif;

    const jourFer = [
        id,
        date,
        jour,
        motif
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie', id, jourFer);
    res.status(200).json({ 'success': 'jour ferie has been updated' });
}

const deleteJourFerie = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie', id);
    res.json({ 'success': 'jour ferie has been deleted' });

}


//-------------------------------------------------------------------------------------------
//                                          date échéance
//-------------------------------------------------------------------------------------------

const getDateEcheance = (req, res) => {
    let dateEch = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot)
                revenusSal.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
}

const getDateEcheanceById = (req, res) => {
    const id = req.params.id;
    const dateEch = {};
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot && dateEch.id == id)
                revenusSal.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
}


const getDateEcheanceByYear = (req, res) => {
    let revenusSal = [];

    const annee = req.params.annee;
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot && ech.annee == annee)
                revenusSal.push({ ...imp, ...ech });
        })
    })
    res.json(revenusSal);
    revenusSal = [];
}

const setDateEcheance = (req, res) => {
    const dateEchs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance');
    const id = parseInt(dateEchs[dateEchs.length - 1].id) + 1;
    const numero_impot = req.body.numero_impot;
    const type = req.body.type;
    const date_debut_paiement = req.body.date_debut_paiement;
    const date_fin_paiement = req.body.date_fin_paiement;
    const annee = req.body.annee;

    const newDateEch = [
        [
            id,
            numero_impot,
            type,
            date_debut_paiement,
            date_fin_paiement,
            annee
        ]
    ];

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance', newDateEch);
    res.status(200).json({ 'success': 'date echeance has been created' });
}


const updateDateEcheance = (req, res) => {
    const id = req.params.id;
    const numero_impot = req.body.numero_impot;
    const type = req.body.type;
    const date_debut_paiement = req.body.date_debut_paiement;
    const date_fin_paiement = req.body.date_fin_paiement;
    const annee = req.body.annee;

    const dateEch = [
        id,
        numero_impot,
        type,
        date_debut_paiement,
        date_fin_paiement,
        annee
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance', id, dateEch);
    res.status(200).json({ 'success': 'date echeance has been updated' });

}

const deleteDateEcheance = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeane', id);
    res.json({ 'success': 'date echeance has been deleted' });
}



//-------------------------------------------------------------------------------------------
//                                          revenus salariaux
//-------------------------------------------------------------------------------------------

const getRevenusSalariaux = (req, res) => {
    let revenusSal = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot)
                revenusSal.push({ ...imp, ...rev });
        })
    })
    res.json(revenusSal);
    revenusSal = [];
}

const getRevenusSalariauxById = (req, res) => {
    const id = req.params.id;
    const revenuSal = {}; 
    if (!revenuSal) return res.status(404).json({ 'message': 'data not found' });
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot && rev.id == id)
                revenusSal = {...imp, ...rev}
        })
    })
    res.json(revenuSal);
    revenuSal = {};
}

const setRevenusSalariaux = (req, res) => {
    const revenusSal = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux');
    const id = parseInt(revenusSal[revenusSal.length - 1].id) + 1;
    const numero_impot = req.body.numero_impot;
    const paye_impot = req.body.paye_amende;
    const paye_penalite = req.body.paye_penalite;
    const valeur_amende = req.body.valeur_amende;
    const taux_penalite = req.body.taux_penalite;

    const newRevenuSal = [
        [
            id,
            numero_impot,
            paye_impot,
            paye_penalite,
            paye_amende,
            valeur_amende,
            taux_penalite
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', newRevenuSal);
    res.status(200).json({ 'success': 'revenus salariaux has been created' });
}

const getRevenusSalariauxByYear = (req, res) => {
    let revenusSals = [];
    const annee = req.params.annee;

    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot && rev.annee == annee)
                revenusSal.push({ ...imp, ...rev });
        })
    })

    res.json(revenusSals);
    revenusSals = [];
}

const updateRevenusSalariaux = (req, res) => {
    const id = req.params.id;
    const numero_impot = req.body.numero_impot;
    const paye_impot = req.body.paye_amende;
    const paye_penalite = req.body.paye_penalite;
    const valeur_amende = req.body.valeur_amande;
    const taux_penalite = req.body.taux_penalite;

    const revenusSal = [
        id,
        numero_impot,
        paye_impot,
        paye_penalite,
        paye_amende,
        valeur_amende,
        taux_penalite
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', id, revenusSal);
    res.status(200).json({ 'success': 'revenus salariaux has been updated' });
}

const deleteRevenusSalariaux = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', id);
    res.json({ 'success': 'revenus has been deleted' });
}

module.exports = {
    // code banque
    getCodeBanque,

    //code geographique
    getCodeGeographique,
    getCodeGeographiqueById,
    setCodeGeographique,
    updateCodeGeographique,
    deleteCodeGeographique,

    //code forme juridique
    getCodeFormeJuridique,

    //code impot
    getCodeImpot,
    getCodeImpotByNumber,

    //periodicite
    getPeriodicite,
    getPeriodiciteById,
    setPeriodicite,
    updatePeriodicite,
    deletePeriodicite,

    //affecation budgetaire
    getAffectationBudgetaire,

    //chef d'action
    getChefAction,

    //code periodicite
    getCodePeriodicite,

    //date cloture
    getDateCloture,
    setDateCloture,
    updateDateCloture,
    deleteDateCloture,
    getDateClotureByNumber,

    //grand impot
    getGrandsImpots,

    //jour ferie
    getJourFerie,
    getJourFerieById,
    setJourFerie,
    updateJourFerie,
    deleteJourFerie,

    //numero budget
    getNumeroBudget,

    //operateur telephonique
    getOperateurTelephonique,

    //procès verbaux
    getProcesVerbaux,

    //type prevision
    getTypePrevision,

    //code activité
    getCodeActivite,

    //code periodicité
    getCodePeriodiciteByNumber,
    setCodePeriodicite,
    updateCodePeriodicite,
    deleteCodePeriodicite,

    //obligation fiscale
    getObligationFiscale,
    getObligationFiscaleById,
    setObligationFiscale,
    updateObligationFiscale,
    deleteObligationFiscale,

    //date echeance
    getDateEcheance,
    getDateEcheanceById,
    getDateEcheanceByYear,
    setDateEcheance,
    updateDateEcheance,
    deleteDateEcheance,

    //revenus salariaux
    getRevenusSalariaux,
    getRevenusSalariauxById,
    getRevenusSalariauxByYear,
    setRevenusSalariaux,
    updateRevenusSalariaux,
    deleteRevenusSalariaux
}