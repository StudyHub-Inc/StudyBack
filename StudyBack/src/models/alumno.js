const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
  codigo: String,
  nombre: String,
  apellido: String,
  email: String,
  clave: String,
});

const Alumno = mongoose.model("Alumno", AlumnoSchema);
module.exports = Alumno;