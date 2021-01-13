const { response } = require('express')
// Require express
const express = require('express')
// Require EJS
const layouts = require('express-ejs-layouts')
// Require file read/write
const fs = require('fs')
const { parse } = require('path')
const { stringify } = require('querystring')

// Instatiate Express
let app = express()

// Set view engine to EJS
app.set('view engine', 'ejs')
app.use(layouts)

// Body parser
app.use(express.urlencoded({extended: false}))

//Show home screen
app.get('/', (req, res) => {
    res.render('index')
})

// Show dinosaurs in JSON file
app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

app.get('/prehistoric_creatures', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)
    console.log(creaturesData)
    res.render('prehistoric_creatures/index.ejs', {myCreatures: creaturesData})
})

// Show page to write new dinosaur
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

app.post('/prehistoric_creatures', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json') 
    let creaturesData = JSON.parse(creatures)
    creaturesData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('prehistoric_creatures')
})

// Write new dinosaur to file, called on submit event in /dinosaurs/new
app.post('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('dinosaurs')
})

// Shows specific dinosaur
app.get('/dinosaurs/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    res.render('dinosaurs/show.ejs', {myDino: dinoData[req.params.id]})
})

app.get('/prehistoric_creatures/:id', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    res.render('prehistoric_creatures/show.ejs', {myCreature: creaturesData[req.params.id]})
})

app.listen(3000, ()=> {
    console.log('Hello from port 3000')
})