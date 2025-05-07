import express from "express";
import { sequelize } from "./database/database.js";
import cors from "cors";
import { crearLibro, elimiarLibro, modificarLibro, mostrarLibros, mostrarLibrosFiltrados } from "./services/service.js";

// express
const app = express();

// Middleware
app.use(express.json());

// Base de datos
sequelize.sync()

// Cors
app.use(cors());

// Metodos

app.post('/api/libros/', crearLibro)

app.get('/api/libros/', mostrarLibros)

app.get('/api/libros/libros/', mostrarLibrosFiltrados)

app.delete('/api/libros/:id', elimiarLibro)

app.patch('/api/libros/:id', modificarLibro)

app.listen(3000, () => {

    console.log('Servidor corriendo en el puerto 3000');

})