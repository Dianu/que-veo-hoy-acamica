var con = require("../lib/conexionbd");

function obtenerGeneros(req, res) {
    var sql = "select * from genero";
    con.query(sql, function(error, response, fields) {
        if (error) { 
            console.log("Error al recibir listado de generos", error.message);
            return res.status(404).send("Error al recibir listado de generos"); 
        };
        var respuesta = {
            "generos": response
        };
        console.log(JSON.stringify(respuesta));
        res.send(JSON.stringify(respuesta));
    });

};

module.exports = {
    obtenerGeneros: obtenerGeneros
};