const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = 3131

//declareDB Variables
let db,
  dbConnectionStr = process.env.DB_STRING
  dbName = 'family-guy-quotes'

//connect to mongo
MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Mongo Database`)
    db = client.db(dbName)
  })

//set middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


//CRUD methods
//Read
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req,res) => {
  const infoCollection = db.collection('quotes')
  infoCollection.find().toArray()
  .then( results => {
    console.log(results)
    res.json(results)
  })
})

//CREATE
app.post('/quotes', (req,res) => {
  console.log('Post HEARDDD')
  db.collection('quotes').insertOne({ author: req.body.author, quote: req.body.quote})
  .then( result => {
    console.log(result)
    res.redirect('/')
  })
  .catch( err => console.error(err))
})


app.listen(process.env.PORT || PORT, () => {
  console.log(`Da Server is Running on port = ${PORT}`)
})