var con = require('../lib/conexionbd');

function recomendador(req, res) {
  var genero = req.query.genero;
  var anioInicio = req.query.anio_inicio;
  var anioFin = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;
  
  var sql = createQueryRecommendation(genero, anioInicio, anioFin, puntuacion);
  
  con.query(sql, function(error, resultado, fields) {
    if (error) {
      console.log('Hubo un error en la consulta', error.message);
      return res.status(404).send('Hubo un error en la consulta');
    }
    var response = {
      'peliculas': resultado
    };
    res.send(JSON.stringify(response));
  });
};

function createQueryRecommendation(genero, anioInicio, anioFin, puntuacion) {
  var query = '';
  if (genero != undefined && anioInicio != undefined && anioFin != undefined) {
    query = "SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE g.nombre = '" + genero + "' AND ( fecha_lanzamiento >= '" + anioInicio + "' AND fecha_lanzamiento <= '" + anioFin + "' )";
  } else if (anioInicio != undefined && anioFin != undefined) {
    query = "SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE ( fecha_lanzamiento >= '" + anioInicio + "' AND fecha_lanzamiento <= '" + anioFin + "' )";
  } else if (genero != undefined && puntuacion != undefined) {
    query = "SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE g.nombre = '" + genero + "' AND p.puntuacion >= '" + puntuacion + "'";
  } else if (puntuacion != undefined) {
    query = "SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE  p.puntuacion >= '" + puntuacion + "'";
  } else {
    query = "SELECT * FROM pelicula p INNER JOIN genero g ON p.genero_id = g.id WHERE g.nombre = '" + genero + "'";
  }
  return query;
}

module.exports = {
    recomendador : recomendador
}