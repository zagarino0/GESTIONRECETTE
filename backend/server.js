const express = require('express');
const app = express();
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOption = require('./config/corsOption');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const path = require('path');
const PORT = process.env.PORT || 3500;

// handle options credentials check - before CORS;
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOption));

// build-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());


// User routes
app.use('/user', require('./routes/api/user/user'));

//app.use(verifyJWT);
//immatriculation
app.use('/client', require('./routes/api/immatriculation/client'));
app.use('/vehicle', require('./routes/api/immatriculation/vehicle'));
app.use('/prisecharge', require('./routes/api/immatriculation/charge'));
app.use('/immatriculation', require('./routes/api/immatriculation/utilitaire'));

//recette
app.use('/recette', require('./routes/api/recette/recette'));

//gestion
app.use('/gestion', require('./routes/api/gestion/gestion'));

// Route to get code
app.use('/code', require('./routes/api/code/code'));
app.use('/prevision', require('./routes/api/parametre/prevision'));


app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));