const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const db = require('./config/database');
db.authenticate()
    .then( () => console.log('DB connected'))
    .catch(err => console.log('Error', err))


const app = express();
// handle bars
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => res.render('index', {layout: 'landing'}))
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`server started on port : ${PORT}`))