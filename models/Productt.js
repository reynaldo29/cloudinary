const { Schema, model } = require('mongoose');

const Products = new Schema({
    nombre: String,
    tipo: String,
    codigo: String,
    descripcion:String,
    precio:String,
    imageURL: String,
    public_id: String
});

module.exports = model('Products', Products);