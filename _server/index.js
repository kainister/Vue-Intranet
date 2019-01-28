require('colors')
const express = require('express')
const bodyParser = require('body-parser')

// Création d'une application ExpressJS
const app = express()

// Analyse les données JSON envoyées par le client
app.use('/', bodyParser.json())

// Middleware qui permet d'autoriser les requêtes Ajax provenant d'un autre domaine
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Inclusion du contrôleur de routes des collaborateurs
const collaborateur = require('./collaborateur')

// Définition des routes de l'application
app.get('/collaborateurs', collaborateur.findAll)
app.get('/collaborateur/:id', collaborateur.findOne)
app.post('/collaborateur', collaborateur.create)
app.put('/collaborateur/:id', collaborateur.update)
app.delete('/collaborateur/:id', collaborateur.remove)


/*
    Configuration
*/


app.set('ip', 'localhost')
app.set('port', 9000)

// Transformation de la méthode app.listen() d'Express en "Promesse JS"
const startApp = app => {
  return new Promise((resolve, reject) => {
    const server = app.listen(app.get('port'), app.get('ip'), resolve)
    server.on('error', reject)
  });
}

// Démarrage de l'app Express
startApp(app)
  .then(() => console.log(' App Started '.bgGreen, `Le serveur http://${app.get('ip')}:${app.get('port')} est prêt !`.green))
  .catch(err => console.log(err.message.red))
