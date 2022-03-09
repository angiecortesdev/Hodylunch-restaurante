//configuraciones
const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');


//base de datos
require('./database.js');

app.use(cors());
app.use(express.json());

//middleware
app.use('/auth', require("./routes/auth"))


//Creación del puerto
app.listen(3000, () => {
    console.log(`server on port 3000`.rainbow);
});
