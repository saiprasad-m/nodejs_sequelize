const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get Gig list
router.get('/', (req, res) => 
    Gig.findAll()
    .then(gigs => res.render('gigs', {gigs}))
    .catch(err => console.log(err))
    
);

// Display Add Gig form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a Gig
router.post('/add', (req, res) => {
    
    let {title, technologies, budget, description, contact_email} = req.body;
    let errors = [];

    // validate
    if(!title) 
        errors.push({mesg: 'Please provide a Title'})
    if(!technologies) 
        errors.push({mesg: 'Please add some Technologies'})
    if(!description) 
        errors.push({mesg: 'Please provide an elaborate Description'})
    if(!contact_email) 
        errors.push({mesg: 'Please provide a Contact email address'})


    // Insert to gigs table
    if(errors.length > 0) {
        res.render('add', { 
            errors, 
            title, 
            technologies, 
            budget, 
            description, 
            contact_email
        })
    }
    else {  
        if(!budget) 
            budget='Unknown'
        else
            budget = `$${budget}`

        technologies = technologies.toLowerCase().replace(/, /g, ',')
        
        Gig.create({
            title: title,
            technologies: technologies,
            budget: budget,
            description: description,
            contact_email: contact_email,
            createdAt: new Date().toISOString()
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err))
    }
})


// Search Gig
router.get('/search', (req, res) => {
    const {term} = req.query;

    term = term.toLowerCase();

    Gig.findAll( { where: 
        { technologies: { [Op.like]:'%' + term + '%'} }
    })
        .then(gigs => res.render('gigs', {gigs}))
        .catch(err => console.log(err));
})

module.exports = router
