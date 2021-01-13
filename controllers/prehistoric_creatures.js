const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)
    console.log(creaturesData)
    res.render('prehistoric_creatures/index.ejs', {myCreatures: creaturesData})
})

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.post('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json') 
    let creaturesData = JSON.parse(creatures)
    creaturesData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    res.redirect('prehistoric_creatures')
})

router.get('/:id', (req, res) => {
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(prehistoricCreatures)

    res.render('prehistoric_creatures/show.ejs', {myCreature: creaturesData[req.params.id]})
})

module.exports = router