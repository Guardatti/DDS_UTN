import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Libros = sequelize.define('Libros', {
    
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    titulo: DataTypes.INTEGER,
    autor: DataTypes.STRING,
    anio: DataTypes.STRING,

}) 