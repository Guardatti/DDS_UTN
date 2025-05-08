import { Op } from "sequelize";
import { Libros } from "../models/libros.js"


export const crearLibro = async (req, res) => {

    const data = req.body;

    const libroNuevo = await Libros.create(data);

    res.json(libroNuevo);

}

export const mostrarLibros = async (req, res) => {

    const search = req.query.search

    if (search) {

        const data = await Libros.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${search}%`
                }
            }
        })
    
        res.json(data);

    } else {

        const data = await Libros.findAll()

        res.json(data)

    }

}

export const elimiarLibro = async (req, res) => {

    const id = req.params.id;

    const data = await Libros.findByPk(id);

    if (data) {
        await data.destroy();
    }

}

export const modificarLibro = async (req, res) => {

    const datosLibro = req.body;

    const id = req.params.id;

    const libro = await Libros.findByPk(id);

    if (libro) {

        libro.autor = datosLibro.autor

        await libro.save();

    }

}