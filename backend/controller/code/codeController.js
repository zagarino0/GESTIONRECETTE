const getDataExcel = require('../../utils/ExcelData');
const setDataExcel = require('../../utils/setDataExcel');
const updateDataExcel = require('../../utils/updateDataExcel');
const deleteDataExcel = require('../../utils/deleteDataExcel');


const path = require('path')
const fsPromises = require('fs').promises;

//-------------------------------------------------------------------------------------------
//                                   code geographique
//-------------------------------------------------------------------------------------------

const getCodeGeographique = async (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'));

    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'parametre', 'code_geographique.json'),
        JSON.stringify(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'))
    );
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
    let id = codeGeos.length === 0 ? 1 : parseInt(codeGeos[codeGeos.length - 1 ].id) + 1;
    const arrondissement = req.body.arrondissement;
    const fokontany = req.body.fokontany;
    const libelle = req.body.libelle;
    const newCodeGeo = [
        [
            id,
            arrondissement,
            fokontany,
            libelle
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', newCodeGeo);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'));
}

const updateCodeGeographique = (req, res) => {
    const id = req.params.id;
    const arrondissement = req.body.arrondissement;
    const fokontany = req.body.fokontany;
    const libelle = req.body.libelle;

    const codeGeo = [
        id,
        arrondissement,
        fokontany,
        libelle
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', id, codeGeo);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'));

}

const deleteCodeGeographique = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code geographique'));
}


//-------------------------------------------------------------------------------------------
//                                          code banque
//-------------------------------------------------------------------------------------------

const getCodeBanque = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}

const getCodeBanqueById = (req, res) => {
    const id = req.params.id;
    const codeBanque = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque').find(cb => cb.id == id);
    if (!codeBanque) return res.status(400).json({ "message": "info not found" });
    res.json(codeBanque);
}

const setCodeBanque = (req, res) => {
    const codeBanques = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque');
    let id = codeBanques.length === 0 ? 1 : parseInt(codeBanques[codeBanques.length - 1 ].id) + 1;
    const raison_social = req.body.raison_social;
    const nom_commercial = req.body.nom_commercial;
    const newCodeBanque = [
        [
            id,
            raison_social,
            nom_commercial
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque', newCodeBanque);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}

const updateCodeBanque = (req, res) => {
    const id = req.params.id;
    const raison_social = req.body.raison_social;
    const nom_commercial = req.body.nom_commercial;

    const codeBanque = [
        id,
        raison_social,
        nom_commercial
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque', id, codeBanque);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}

const deleteCodeBanque = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code banque'));
}


//-------------------------------------------------------------------------------------------
//                                    code forme juridique
//-------------------------------------------------------------------------------------------

const getCodeFormeJuridique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique'));
}

const getCodeFormeJuridiqueByCode = (req, res) => {
    const code = req.params.code;
    const formeJuridique = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique').find(fj => fj.code == code);
    if (!formeJuridique) return res.status(400).json({ "message": "info not found" });
    res.json(formeJuridique);
}

const setCodeFormeJuridique = (req, res) => {
    const formeJuris = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique');
    let code = formeJuris.length === 0 ? 1 : parseInt(formeJuris[formeJuris.length - 1].code) + 1;
    const abreviation = req.body.abreviation;
    const libelle = req.body.libelle;
    const newFormeJuri = [
        [
            code,
            abreviation,
            libelle
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique', newFormeJuri);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique'));
}

const updateCodeFormeJuridique = (req, res) => {
    const code = req.params.code;
    const abreviation = req.body.abreviation;
    const libelle = req.body.libelle;

    const formeJuri = [
        code,
        abreviation,
        libelle
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique', code, formeJuri);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique'));
}

const deleteCodeFormeJuridique = (req, res) => {
    const code = req.params.code;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code forme juridique', code);
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

const setCodeImpot = (req, res) => {
    const codeImps = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot');
    let numero_impot = codeImps.length === 0 ? 1 : parseInt(codeImps[codeImps.length - 1].numero_impot) + 1;
    const libelle = req.body.libelle;
    const abreviation = req.body.abreviation;
    const pcop = req.body.pcop;
    const numero_budget = req.body.numero_budget;
    const numero_classes = req.body.numero_classes;
    const chapitre = req.body.chapitre;
    const groupe_impot = req.body.groupe_impot;

    const newCodeImp = [
        [
            numero_impot,
            libelle,
            abreviation,
            pcop,
            numero_budget,
            numero_classes,
            chapitre,
            groupe_impot
        ]
    ]
    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot', newCodeImp);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot'));
}

const updateCodeImpot = (req, res) => {
    const numero_impot = req.params.numero_impot;
    const libelle = req.body.libelle;
    const abreviation = req.body.abreviation;
    const pcop = req.body.pcop;
    const numero_budget = req.body.numero_budget;
    const numero_classes = req.body.numero_classes;
    const chapitre = req.body.chapitre;
    const groupe_impot = req.body.groupe_impot;

    const codeImp = [
            numero_impot,
            libelle,
            abreviation,
            pcop,
            numero_budget,
            numero_classes,
            chapitre,
            groupe_impot
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot', numero_impot, codeImp);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot'));
}

const deleteCodeImpot = (req, res) => {
    const numero_impot = req.params.numero_impot;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot', numero_impot);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot'));
}

//-------------------------------------------------------------------------------------------
//                                          periodicite
//-------------------------------------------------------------------------------------------

const getPeriodicite = (req, res) => {
    let periodicites = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
            if (clo.numero == per.id_clo)
                periodicites.push({ ...clo, ...per });
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
            if (clo.numero == per.id_clo && per.id == id)
                periodicite = { ...clo, ...per };
        });
    });

    if (!periodicite) return res.status(400).json({ 'message': 'periodicite not found' });

    res.json(periodicite);
    periodicite = {};
}

const getPeriodiciteByDateExercice = (req, res) => {
    const cloture = req.body.cloture;
    if (!cloture) {
        setPeriodicite(req, res);
    }
    else {
        let periodicite = [];
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
            getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
                if (clo.numero == per.id_clo && clo.cloture == cloture)
                    periodicite.push({ ...clo, ...per });
            });
        });

        if (!periodicite) return res.status(400).json({ 'message': 'periodicite not found' });

        res.json(periodicite);
        periodicite = [];
    }
}

const setPeriodicite = (req, res) => {
    const cloture = req.body.cloture;
    if (!cloture) {
        const periodicites = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite');
        let id = periodicites.length === 0 ? 1 : parseInt(periodicites[periodicites.length - 1].id) + 1;
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
    else {
        getPeriodiciteByDateExercice(req, res);
    }
}

const updatePeriodicite = (req, res) => {
    const id = req.params.id;
    const numero_auto = req.body.numero_auto;
    const periode = req.body.periode;
    const desc_mois = req.body.desc_mois;
    const titre = req.body.titre;
    const p1 = req.body.p1;
    const p2 = req.body.p2;
    const id_clo = req.body.id_clo;

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
    let periodicites = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
            if (clo.numero == per.id_clo)
                periodicites.push({ ...clo, ...per });
        });
    });
    res.json(periodicites);
    periodicite = [];
}

const deletePeriodicite = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite', id);
    let periodicites = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'periodicite').map(per => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture').map(clo => {
            if (clo.numero == per.id_clo)
                periodicites.push({ ...clo, ...per });
        });
    });
    res.json(periodicites);
    periodicite = [];
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
    let id = obligationFiscs.length === 0 ? 1 : parseInt(obligationFiscs[obligationFiscs.length - 1].id) + 1;
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
    let obligationFisc = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal').map(fisc => {
            getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite').find(per => {
                if (imp.numero_impot == fisc.numero_impot && per.periodicite == fisc.periodicite)
                    obligationFisc.push({ ...imp, ...fisc, ...per });
            })
        })
    })
    res.json(obligationFisc);
    obligationFisc = [];
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

const deleteObligationFiscale = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'obligation fiscal', id);
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


//-------------------------------------------------------------------------------------------
//                                          procès verbaux
//-------------------------------------------------------------------------------------------

const getProcesVerbaux = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}

const getProcesVerbauxById = (req, res) => {
    const id = req.params.id;
    const procesVerb = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux').find(pv => pv.id == id);
    if (!procesVerb) return res.status(400).json({ "message": "info not found" });
    res.json(procesVerb);
}

const setProcesVerbaux = (req, res) => {
    const procesVerbs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux');
    let id = procesVerbs.length === 0 ? 1 : parseInt(procesVerbs[procesVerbs.length - 1].id) + 1;
    const numero = req.body.numero;
    const designation = req.body.designation;
   

    const newProcesVerb = [
        [
            id,
            numero,
            designation
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux', newProcesVerb);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}

const updateProcesVerbaux = (req, res) => {
    const id = req.params.id;
    const numero = req.body.numero;
    const designation = req.body.designation;

    const procesVerb = [
        id,
        numero,
        designation
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux', id, procesVerb);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}

const deleteProcesVerbaux = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'proces verbaux'));
}

//-------------------------------------------------------------------------------------------
//                                operateur telephonique
//-------------------------------------------------------------------------------------------

const getOperateurTelephonique = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique'));
}

const getOperateurTelephoniqueById = (req, res) => {
    const id = req.params.id;
    const operateur = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique').find(ot => ot.id == id);
    if (!operateur) return res.status(400).json({ "message": "info not found" });
    res.json(operateur);
}

const setOperateurTelephonique = (req, res) => {
    const operateurTels = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique');
    let id = operateurTels.length === 0 ? 1 : parseInt(operateurTels[operateurTels.length - 1].id) + 1;;
    const numero = req.body.numero;
    const operateur = req.body.operateur;
   

    const newOperateur = [
        [
            id,
            numero,
            operateur
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique', newOperateur);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique'));
}

const updateOperateurTelephonique = (req, res) => {
    const id = req.params.id;
    const numero = req.body.numero;
    const operateur = req.body.operateur;

    const operateurTel = [
        id,
        numero,
        operateur
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique', id, operateurTel);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique'));

}

const deleteOperateurTelephonique = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'operateur telephonique', id);
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
    let id = dateClos.length === 0 ? 1 : parseInt(dateClos[dateClos.length - 1].id) + 1;
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
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture'));
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
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture'));

}

const deleteDateCloture = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date cloture'));
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
    const codePers = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite');
    let numero = codePers.length === 0 ? 1 : parseInt(codePers[codePers.length - 1].numero) + 1;
    const periodicite = req.body.periodicite;

    const newCodePer = [
        [
            numero,
            periodicite
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', newCodePer);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
}

const updateCodePeriodicite = (req, res) => {
    const numero = req.params.numero;
    const periodicite = req.body.periodicite;

    const codePer = [
        numero,
        periodicite
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', numero, codePer);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
}

const deleteCodePeriodicite = (req, res) => {
    const numero = req.params.numero;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite', numero);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code periodicite'));
}



//-------------------------------------------------------------------------------------------
//                                   affectation budgetaire
//-------------------------------------------------------------------------------------------

const getAffectationBudgetaire = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}

const getAffectationBudgetaireById = (req, res) => {
    const id = req.params.id;
    const affectation = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire').find(ab => ab.id == id);
    if (!affectation) return res.status(400).json({ "message": "info not found" });
    res.json(affectation);
}

const setAffectationBudgetaire = (req, res) => {
    const affectationBudgs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire');
    let id = affectationBudgs.length === 0 ? 1 : parseInt(affectationBudgs[affectationBudgs.length - 1].id) + 1;
    const impot = req.body.impot;
    const budget = req.body.budget;
    const taux = req.body.taux;
    const pcop = req.body.pcop;

    const newAffectation = [
        [
            id,
            impot,
            budget,
            taux,
            pcop
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire', newAffectation);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}

const updateAffectationBudgetaire = (req, res) => {
    const id = req.params.id;
    const impot = req.body.impot;
    const budget = req.body.budget;
    const taux = req.body.taux;
    const pcop = req.body.pcop;

    const affectationBudg = [
        id,
        impot,
        budget,
        taux,
        pcop
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire', id, affectationBudg);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}

const deleteAffectationBudgetaire = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'affectation budgetaire'));
}



//-------------------------------------------------------------------------------------------
//                                          numero budget
//-------------------------------------------------------------------------------------------

const getNumeroBudget = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget'));
}

const getNumeroBudgetByNumber = (req, res) => {
    const numero = req.params.numero;
    const numeroBudg = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget').find(nb => nb.numero == numero);
    if (!numeroBudg) return res.status(400).json({ "message": "info not found" });
    res.json(numeroBudg);
}

const setNumeroBudget = (req, res) => {
    const numeroBudgs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget');
    let numero = numeroBudgs.length === 0 ? 1 : parseInt(numeroBudgs[numeroBudgs.length - 1].numero) + 1;
    const libelle = req.body.libelle;
    
    const newNumeroBudg = [
        [
            numero,
            libelle
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget', newNumeroBudg);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget'));
}

const updateNumeroBudget = (req, res) => {
    const numero = req.params.numero;
    const libelle = req.body.libelle

    const numeroBudg = [
        numero,
        libelle
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget', numero, numeroBudg);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget'));
}

const deleteNumeroBudget = (req , res) => {
    const numero = req.params.numero;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'numero budget', numero);
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

const getCodeActiviteByCode = (req, res) => {
    const code = req.params.code;
    const codeAct = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite').find(ca => ca.code == code);
    if (!codeAct) return res.status(400).json({ "message": "info not found" });
    res.json(codeAct);
}

const setCodeActivite = (req, res) => {
    const codeActs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite');
    let code = codeActs.length === 0 ? 1 : parseInt(codeActs[codeActs.length - 1].code) + 1;
    const libelle = req.body.libelle;
    const nature = req.body.nature;
    
    const newCodeAct = [
        [
            code,
            libelle,
            nature
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite', newCodeAct);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite'));
}

const updateCodeActivite = (req, res) => {
    const code = req.params.code;
    const libelle = req.body.libelle;
    const nature = req.body.nature;

    const codeAct = [
        code,
        libelle,
        nature
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite', code, codeAct);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite'));
}

const deleteCodeActivite = (req, res) => {
    const code = req.params.code;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite', code);
     res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code activite'));
}


//-------------------------------------------------------------------------------------------
//                                          chef d'action
//-------------------------------------------------------------------------------------------

const getChefAction = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}

const getChefActionByCode = (req, res) => {
    const code = req.params.code;
    const chef = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action').find(ca => ca.code == code);
    if (!chef) return res.status(400).json({ "message": "info not found" });
    res.json(chef);
}

const setChefAction = (req, res) => {
    const chefs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action');
    let code = chefs.length === 0 ? 1 : parseInt(chefs[chefs.length - 1].code) + 1;
    const libelle = req.body.libelle;
    
    const newChef = [
        [
            code,
            libelle
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action', newChef);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}

const updateChefAction = (req, res) => {
    const code = req.params.code;
    const libelle = req.body.libelle;

    const chef = [
        code,
        libelle
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action', code, chef);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}

const deleteChefAction = (req , res) => {
    const code = req.params.code;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action', code);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'chef d_action'));
}

//-------------------------------------------------------------------------------------------
//                                          type prevision
//-------------------------------------------------------------------------------------------

const getTypePrevision = (req, res) => {
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision'));
}

const getTypePrevisionById = (req, res) => {
    const id = req.params.id;
    const prevision = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision').find(tp => tp.id == id);
    if (!prevision) return res.status(400).json({ "message": "info not found" });
    res.json(prevision);
}

const setTypePrevision = (req, res) => {
    const typePrevs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision');
    let id = typePrevs.length === 0 ? 1 : parseInt(typePrevs[typePrevs.length - 1].id) + 1;
    const type_prevision = req.body.type_prevision;
    const libelle = req.body.libelle;
    
    const newTypePrev = [
        [
            id,
            type_prevision,
            libelle
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision', newTypePrev);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision'));
}

const updateTypePrevision = (req, res) => {
    const id = req.params.id;
    const type_prevision = req.body.type_prevision;
    const libelle = req.body.libelle;

    const typePrev = [
        id,
        type_prevision,
        libelle
    ]
    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision', id , typePrev);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision'));
}

const deleteTypePrevision = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'type prevision', id);
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
    let id = jourFers.length === 0 ? 1 : parseInt(jourFers[jourFers.length - 1].id) + 1;
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
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie'));

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
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie'));
}

const deleteJourFerie = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie', id);
    res.json(getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'jour ferie'));

}


//-------------------------------------------------------------------------------------------
//                                          date échéance
//-------------------------------------------------------------------------------------------

const getDateEcheance = (req, res) => {
    let dateEch = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot)
                dateEch.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
}

const getDateEcheanceById = (req, res) => {
    const id = req.params.id;
    if(id < 2000){
        let dateEch = [];
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot && ech.id == id)
                dateEch.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
    }else{
        getDateEcheanceByYear(req, res, id);
    }
}


const getDateEcheanceByYear = (req, res, annee) => {
    let dateEchs = [];
    console.log(annee)
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot && ech.annee == annee)
                dateEchs.push({ ...imp, ...ech });
        })
    })
    res.json(dateEchs);
    dateEchs = [];
}

const setDateEcheance = (req, res) => {
    const dateEchs = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance');
    let id = dateEchs.length === 0 ? 1 : parseInt(dateEchs[dateEchs.length - 1].id) + 1;
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
    let dateEch = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot)
                dateEch.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
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
    let dateEche = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot)
                dateEche.push({ ...imp, ...ech });
        })
    })
    res.json(dateEche);
    dateEche = [];

}

const deleteDateEcheance = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance', id);
    let dateEch = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'date echeance').map(ech => {
            if (imp.numero_impot == ech.numero_impot)
                dateEch.push({ ...imp, ...ech });
        })
    })
    res.json(dateEch);
    dateEch = [];
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
    let revenuSal = {};
    if (!revenuSal) return res.status(404).json({ 'message': 'data not found' });
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot && rev.id == id)
                revenuSal = { ...imp, ...rev }
        })
    })
    res.json(revenuSal);
    revenuSal = {};
}

const getRevenusSalariauxByCode = (req, res) => {
    let revenusSals = [];
    const code = req.params.code;
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot && imp.numero_impot == code)
                revenusSals.push({ ...imp, ...rev });
        })
    })
    res.json(revenusSals);
    revenusSals = [];
}

const setRevenusSalariaux = (req, res) => {
    let revenusSal = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux');
    let id = revenusSal.length === 0 ? 1 : parseInt(revenusSal[revenusSal.length - 1].id) + 1;
    const numero_impot = req.body.numero_impot;
    const paye_impot = req.body.paye_impot;
    const paye_amende = req.body.paye_amende;
    const paye_penalite = req.body.paye_penalite;
    const valeur_amende = req.body.valeur_amende;
    const taux_penalite = req.body.taux_penalite;

    const newRevenuSal = [
        [
            id,
            numero_impot,
            paye_impot,
            paye_amende,
            paye_penalite,
            valeur_amende,
            taux_penalite
        ]
    ]

    setDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', newRevenuSal);
    revenusSal = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot)
                revenusSal.push({ ...imp, ...rev });
        })
    })
    res.json(revenusSal);
    revenusSal = [];
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
    const paye_impot = req.body.paye_impot;
    const paye_amende = req.body.paye_amende;
    const paye_penalite = req.body.paye_penalite;
    const valeur_amende = req.body.valeur_amande;
    const taux_penalite = req.body.taux_penalite;

    let revenusSal = [
        id,
        numero_impot,
        paye_impot,
        paye_amende,
        paye_penalite,
        valeur_amende,
        taux_penalite
    ]

    updateDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', id, revenusSal);
    revenusSal = [];
    getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux').map(rev => {
            if (imp.numero_impot == rev.numero_impot)
                revenusSal.push({ ...imp, ...rev });
        })
    })
    res.json(revenusSal);
    revenusSal = [];
}

const deleteRevenusSalariaux = (req, res) => {
    const id = req.params.id;
    deleteDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'revenus salariaux', id);
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

module.exports = {
    // code banque
    getCodeBanque,
    getCodeBanqueById,
    setCodeBanque,
    updateCodeBanque,
    deleteCodeBanque,

    //code geographique
    getCodeGeographique,
    getCodeGeographiqueById,
    setCodeGeographique,
    updateCodeGeographique,
    deleteCodeGeographique,

    //code forme juridique
    getCodeFormeJuridique,
    getCodeFormeJuridiqueByCode,
    setCodeFormeJuridique,
    updateCodeFormeJuridique,
    deleteCodeFormeJuridique,

    //code impot
    getCodeImpot,
    getCodeImpotByNumber,
    setCodeImpot,
    updateCodeImpot,
    deleteCodeImpot,

    //periodicite
    getPeriodicite,
    getPeriodiciteById,
    getPeriodiciteByDateExercice,
    setPeriodicite,
    updatePeriodicite,
    deletePeriodicite,

    //affecation budgetaire
    getAffectationBudgetaire,
    getAffectationBudgetaireById,
    setAffectationBudgetaire,
    updateAffectationBudgetaire,
    deleteAffectationBudgetaire,

    //chef d'action
    getChefAction,
    getChefActionByCode,
    setChefAction,
    updateChefAction,
    deleteChefAction,

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
    getNumeroBudgetByNumber,
    setNumeroBudget,
    updateNumeroBudget,
    deleteNumeroBudget,

    //operateur telephonique
    getOperateurTelephonique,
    getOperateurTelephoniqueById,
    setOperateurTelephonique,
    updateOperateurTelephonique,
    deleteOperateurTelephonique,

    //procès verbaux
    getProcesVerbaux,
    getProcesVerbauxById,
    setProcesVerbaux,
    updateProcesVerbaux,
    deleteProcesVerbaux,

    //code activité
    getCodeActivite,
    getCodeActiviteByCode,
    setCodeActivite,
    updateCodeActivite,
    deleteCodeActivite,

    //code periodicité
    getCodePeriodicite,
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
    getRevenusSalariauxByCode,
    getRevenusSalariauxById,
    getRevenusSalariauxByYear,
    setRevenusSalariaux,
    updateRevenusSalariaux,
    deleteRevenusSalariaux,

    //type prevision
    getTypePrevision,
    setTypePrevision,
    getTypePrevisionById,
    updateTypePrevision,
    deleteTypePrevision
}