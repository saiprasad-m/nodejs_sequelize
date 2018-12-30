const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get Gig list
router.get('/', (req, res) => 
    Gig.findAll()
    .then(gigs => {
        res.render('gigs', {
            gigs
        });
    })
    .catch(err => console.log(err))
    
);

// Display Add Gig form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a Gig
router.post('/add', (req, res) => {
    const data = {
        title: 'Looking for react dev',
        technologies: 'react, javascript,html,css',
        budget:'$3000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac justo at neque iaculis hendrerit. Fusce odio erat, lobortis ac accumsan eu, rutrum non nulla. Pellentesque sit amet sapien sed dolor pellentesque commodo dapibus at libero.',
        contact_email: 'user@gmail.com'
    }
    let {title, technologies, budget, description, contact_email} = data;
    // Insert to gigs table

    Gig.create({
        title: title,
        technologies: technologies,
        budget: budget,
        description: description,
        contact_email: contact_email,
        createdAt:'2018'
    })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
})

module.exports = router
