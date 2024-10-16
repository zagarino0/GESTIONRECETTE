const data = {
    previsions: require('../../model/parametre/prevision.json'),
    setPrevisions: function (data) { this.previsions = data },
}

const fsPromises = require('fs').promises;
const path = require('path');
const getDataExcel = require('../../utils/ExcelData');

const getAllPrevisions = async(req, res) => {
    try {
        // Define the path to the JSON file
        const filePath = path.join(__dirname, '..', '..', 'model', 'parametre', 'prevision.json');
        
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

const getPrevisionById = (req, res) => {
    const id = req.params.id;
        let prevision = data.previsions.find(prev => prev.id == id);
        const codeImpots = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot');

        if (!prevision) res.status(401).json({ "message": "prevision not found" });
        codeImpots.map(imp => {
            if (prevision.code_impot == imp.numero_impot) {
                prevision = { ...prevision, ...imp };
            }
        })
        res.json(prevision);
        prevision = {};
}

const getPrevisionByYear = (req, res) => {
    let previsions = [];
    let previsionsOfYear = [];
    let annee = req.params.annee;
    const codeImpots = getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot');

    data.previsions.map(prev => {
        if (prev.annee == annee)
            previsions.push(prev);
    })
    previsions.map(prev => {
        codeImpots.map(imp => {
            if (prev.code_impot == imp.numero_impot) {
                previsionsOfYear.push({ ...prev, ...imp });
            }
        })
    })

    if (previsionsOfYear.length === 0) return res.json({ 'message': 'no prevision this year' })
    res.json(previsionsOfYear);
    previsions = [];
    previsionsOfYear = [];
}


const setPrevision = async (req, res) => {
    const annee = req.body.annee;
    const mois = req.body.mois;
    const type_prevision = req.body.type_prevision;
    const code_impot = req.body.code_impot;
    const montant_prevision = req.body.montant_prevision;

    let id = data.previsions.length === 0 ? 1 : data.previsions[data.previsions.length - 1].id + 1;

    const newPrevision = {
        "id": id,
        "annee": annee,
        "mois": mois,
        "type_prevision": type_prevision,
        "code_impot": code_impot,
        "montant_prevision": montant_prevision
    }

    data.setPrevisions([...data.previsions, newPrevision]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'parametre', 'prevision.json'),
        JSON.stringify(data.previsions)
    );

    res.json({ 'success': 'prevision has been created' });

}

const updatePrevision = async (req, res) => {
    const id = req.params.id;
    const annee = req.body.annee;
    const mois = req.body.mois;
    const type_prevision = req.body.type_prevision;
    const code_impot = req.body.code_impot;
    const montant_prevision = req.body.montant_prevision;

    const prevision = data.previsions.find(prev => prev.id == id);

    if (!prevision) return res.json({ 'message': 'prevision not found' })

    if (type_prevision) prevision.type_prevision = type_prevision;
    if (code_impot) prevision.code_impot = code_impot;
    if (montant_prevision) prevision.montant_prevision = montant_prevision;
    if (mois) prevision.mois = mois;

    const filteredPrevisions = data.previsions.filter(prev => prev.id != id);
    const unsortedPrevisions = [...filteredPrevisions, prevision];
    data.setPrevisions(unsortedPrevisions.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'parametre', 'prevision.json'),
        JSON.stringify(data.previsions)
    )

    res.json(data.previsions);
}

const deletePrevisions = async (req, res) => {
    const id = req.params.id;
    const prevision = data.previsions.find(prev => prev.id == id);

    if (!prevision) {
        return res.status(404).json({ message: "Prevision not found" });
    }

    const filteredPrevisions = data.previsions.filter(prev => prev.id != prevision.id);
    data.setPrevisions([...filteredPrevisions]);

    try {
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'parametre', 'prevision.json'),
            JSON.stringify(data.previsions)
        );
        res.status(200).json({ message: "Prevision deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error writing to file", error });
    }
};



module.exports = {
    getAllPrevisions,
    getPrevisionById,
    getPrevisionByYear,
    setPrevision,
    updatePrevision,
    deletePrevisions
}