const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql");

const app = express();
const port = 3000;

//middleware para analizar los datos JSON
app.use(express.json());

//configuracion para la conexion MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practica"
})

//conexion a la base de datos
db.connect((error) => {
    if (error) {
        console.error("error al conectar a la base de datos:", error)
    } else {
        console.log("conectado con exito a la base de datos");
    }
});

//crear una nueva materia
app.post("/materias", (req, res) => {
    const materia = req.body;
    const sql = "INSERT INTO materias (NombreMateria, Descripcion, Nota) VALUES(?, ?, ?)";
    
    db.query(
       sql, [
        materia.NombreMateria,materia.Descripcion,materia.Nota,], 
        (err, result) => {
            if (err) {
                console.error("Error al crear una nueva materia:", err);
                res.status(500).json({ error: "Error al crear una nueva materia"})
            } else {
                console.log("Materia creada con exito")
                res.status(201).json({ message: "Materia Creada", id: result.intserId});
            }

        }
    )
})

//iniciar el servidor
app.listen(port, () =>{
    console.log(`servidor corriendo en http://localhost:${port}`);
});