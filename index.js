const express = require("express");
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


//iniciar el servidor
app.listen(port, () =>{
    console.log(`servidor corriendo en http://localhost:${port}`);
});