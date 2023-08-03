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

// Routes
app.use('/', require('./routes/root'));


// root controllers
app.use('/', express.static(path.join(__dirname, 'view', 'style')));
app.use('/', express.static(path.join(__dirname, 'view', 'js')));


// User routes
app.use('/user/register', require('./routes/api/user/register'));
app.use('/user/auth', require('./routes/api/user/auth'));
app.use('/user/refresh', require('./routes/api/user/refreshToken'));
app.use('/user/logout', require('./routes/api/user/logout'));


//app.use(verifyJWT);
app.use('/client', require('./routes/api/client/client'));
app.use('/vehicle', require('./routes/api/client/vehicle'));


// Route to get code
app.use('/code', require('./routes/api/code/code'));

// Route to get client
app.use('/getclientbynif', require('./routes/api/client/getClientByNif'));
//app.use('/getclientbyreference', require('./routes/api/getClientByReference'));
//app.use('/getclientbyraisonsocial', require('./routes/api/getClientByRaisonSociale'));
//app.use('/getclientbycin', require('./routes/api/getClientByCin'));
//app.use('/getclientbyadress', require('./routes/api/getClientByAdress'));
//app.use('/getclientbynomcommercial', require('./routes/api/getClientByNomCommercial'));


app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));