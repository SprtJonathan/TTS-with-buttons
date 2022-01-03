const express = require("express"); // Utilisation du framework node Express afin de simplifier la création de l'application
const app = express(); // Création de l'application utilisant express
const fs = require("fs");

// Middleware permettant de corriger les erreurs CORS pouvant survenir à cause de sécurités et ainsi permettre la connexion à tout utilisateur
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Les différents types de requêtes autorisées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // Les headers autorisés
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  // On passe au middleware suivant
  next();
});

app.use("/api/hybridus", (req, res, next) => {
  let soundFiles = fs.readdirSync(__dirname + "/../sounds/hybridus/");
  res.status(200).json(soundFiles);
});

/*
app.use(function (req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html" });
  let readStream = fs.createReadStream(__dirname + "/../index.html");
  readStream.pipe(res);
  next();
});*/

module.exports = app;
