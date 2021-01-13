const { response } = require('express')
const express = require('express')
const layouts = require('express-ejs-layouts')
const fs = require('fs')
const { parse } = require('path')
const { stringify } = require('querystring')

let app = express()

app.set('view engine', 'ejs')
app.use(layouts)

// Body parser
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

app.post('/dinosaurs', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('dinosaurs')
})

app.get('/dinosaurs/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    
    res.render('dinosaurs/show.ejs', {myDino: dinoData[req.params.id]})
})

app.listen(3000, ()=> {
    console.log('Hello from port 3000')
})