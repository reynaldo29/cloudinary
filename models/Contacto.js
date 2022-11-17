const { Schema, model } = require('mongoose');

const Contacto = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    fecha_nacimiento:String,
    imageURL: String,
    public_id: String
});

module.exports = model('Contacto', Contacto);