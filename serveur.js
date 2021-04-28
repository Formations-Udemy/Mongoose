const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

/* ICI "dbMovie" est la table, en mongo c'est un DOCUMENT */
mongoose.connect('mongodb://localhost/dbMovie', {useNewUrlParser: true, useUnifiedTopology: true});

/* On crée un schema, genre de table en SQL, squelette de la COLLECTION (ou obljet JS pour la DB) */
const moviesSchema = new mongoose.Schema({
    name: String,
    year: Number,
    actors: String
});

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteMovie: moviesSchema
});

/* On crée un model (une collection pour mongoDB) avec un label de notre choix (ici 'Movies') */
const Movies = mongoose.model('Movies', moviesSchema);
const People = mongoose.model('People', peopleSchema);

/* On ajoute un (ou plusieurs) objets (ou document) dans notre DB */
const PulpFiction = new Movies({
    name: "Pulp Fiction",
    year: 1997,
    actors: "Samuel L. Jackson"
});

const Interstellar = new Movies({
    name: "Interstellar",
    year: 2013,
    actors: "Matthew McConaughey"
});

const Jaws = new Movies({
    name: "Jaws",
    year: 1985,
    actors: "Denzel"
});

const Avengers = new Movies({
    name: "Avengers",
    year: 2016,
    actors: "Superman"
});

const Avengers1 = new Movies({
    name: "Avengers",
    year: 2066,
    actors: "Superman"
});

const Avengers2 = new Movies({
    name: "Avengers",
    year: 2016,
    actors: "Superman"
});

const Avengers3 = new Movies({
    name: "Avengers",
    year: 2026,
    actors: "Superman"
});

const Avengers4 = new Movies({
    name: "Avengers",
    year: 2096,
    actors: "Superman"
});

const Scarface = new Movies({
    name: "Scarface",
    year: 1983,
    actors: "Al Pacino"
});

const StarWars = new Movies({
    name: "Star Wars",
    year: 1983,
    actors: "Jedi"
});

const Pantin = new Movies({
    name: "tchaopantin",
    year: 1983,
    actors: "Coluche"
});


const Marie = new People({
    name: "Marie",
    age: 43,
    favoriteMovie: Interstellar
});

const Henry = new People({
    name: "Henry",
    age: 20,
    favoriteMovie: Interstellar
});
/* FIN DES OBJETS */



/* On enregistre l'objet dans la DB */
//PulpFiction.save();
//Interstellar.save();

//Marie.save();

/* Méthode pour INSERER plusieurs objets (collection) d'un coup avec insertMany() qui prend un tableau en paramètre*/
//Movies.insertMany([Jaws, Avengers]);

Movies.insertMany([Scarface, StarWars, Pantin], function(err){
    if (err) {
        console.log(err);
    }else{
        console.log("Insertion effectuée !");
    }
});

/* Méthode pour AFFICHER les collections de la base, ici dans la console avec console.log() */
Movies.find({}, function(err, movies){
    if (err) {
        console.log(err);
    }else{
        console.log(movies);
    };
});

/* Méthode pour UPDATE une collection */
Movies.updateOne({name: "Jaws"}, {name: "Les dents de la mer"}, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log("MAJ effectuée !");
    }
});

People.updateOne({name : "Henry"}, {favoriteMovie: PulpFiction}, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log("MAJ Henry effectuée !")
    }
});

/* Méthode pour UPDATE plusieurs collections */
Movies.updateMany({year: 1983}, {actors: "NULL"}, function(err){
    if (err) {
        console.log(err);
    }else{
        console.log("MAJ multiple effectuée !");
    }
});


/* Méthode pour SUPPRIMER des collections */
Movies.deleteMany({year: 1983}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Suppresion a fonctionné !");
    }
});


app.get('/', function (req, res){
    res.send('Salut !')
})

app.listen(port, () => {
    console.log("server is ready on port 3000 !")
    });