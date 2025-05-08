import express from "express";
import { sequelize } from "./database/database.js";
import cors from "cors";
import { crearLibro, elimiarLibro, modificarLibro, mostrarLibros } from "./services/service.js";
import { Libros } from "./models/libros.js";
import librosData from "./librosData.json" with { type: 'json' }

// express
const app = express();


// Middleware
app.use(express.json());


// Base de datos
sequelize.sync()


// Cors
app.use(cors());


// Usar esto por si nos dan un archivo.json con datos para cargar en la BD

const cargarDatosIniciales = async() => {

    await Libros.bulkCreate(librosData)

}


// Metodos

app.post('/api/libros/', crearLibro)

app.get('/api/libros/', mostrarLibros)

app.delete('/api/libros/:id', elimiarLibro)

app.patch('/api/libros/:id', modificarLibro)

app.listen(3000, () => {

    cargarDatosIniciales()

    console.log('Servidor corriendo en el puerto 3000');

})