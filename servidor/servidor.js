//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var listaPeliculas = require('./controladores/controlador');
var listaGeneros = require('./controladores/controlador');
var listaInfoPelis = require('./controladores/controlador');
var listaRecomendadas = require('./controladores/controlador');


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/peliculas", listaPeliculas.getMovie);
app.get("/generos", listaGeneros.getGenres);
app.get("/peliculas/:id/", listaInfoPelis.getInfo);
app.get("/peliculas/recomendacion", listaRecomendadas.getRecomm);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

