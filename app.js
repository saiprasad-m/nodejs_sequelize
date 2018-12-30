const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const db = require('./config/database');
db.authenticate()
    .then( () => console.log('DB connected'))
    .catch(err => console.log('Error', err))


const app = express();

// body parser
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => res.send('index'))

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`server started on port : ${PORT}`))