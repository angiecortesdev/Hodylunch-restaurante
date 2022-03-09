const mongoose = require('mongoose')

//conexión a la base de datos
mongoose.connect('mongodb://localhost/auth-client', {})

    .then(db => console.log('Database is connected'.america))
    .catch(err => console.log(err))