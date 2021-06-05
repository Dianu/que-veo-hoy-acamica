var con = require('../lib/conexionbd');

function obtenerInfoPelicula(req, res) {
    var id = req.params.id;
    var sql = "SELECT p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuacion, p.poster, a.nombre as actores, g.nombre FROM pelicula p JOIN genero g ON p.genero_id = g.id JOIN actor_pelicula ac ON p.id = ac.pelicula_id JOIN actor a ON ac.actor_id = a.id WHERE p.id = '" + id + "'";
        
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        }
        var response = {
            'pelicula': resultado[0],
            'actores' : resultado,
            'genero' : resultado.genero[0]
        };
        res.send(JSON.stringify(response));
    });
}

module.exports = {
  obtenerInfoPelicula: obtenerInfoPelicula
};