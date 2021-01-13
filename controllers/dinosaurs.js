// Require express
const express = require('express')
const { builtinModules } = require('module')
//Require router
const router = express.Router()
const fs = require('fs')

// Show dinosaurs in JSON file
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

// Show page to write new dinosaur
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// Write new dinosaur to file, called on submit event in /dinosaurs/new
router.post('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('dinosaurs')
})

// Shows specific dinosaur
router.get('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    res.render('dinosaurs/show.ejs', {myDino: dinoData[req.params.id]})
})

module.exports = router