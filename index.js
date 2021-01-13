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

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

//Show home screen
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, ()=> {
    console.log('Hello from port 3000')
})