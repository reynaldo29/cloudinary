const { Router } = require('express');
const router = Router();

const Product = require('../models/Productt');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const productos = await Product.find();
    res.render('product_form', {productos});
});

router.get('/products/add', async (req, res) => {
    const productos = await Product.find();
    res.render('product_form', {productos});
});

router.post('/products/add', async (req, res) => {

    const { nombre,tipo,codigo,descripcion,precio } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(req.body)
    const newProduct = new Product({
        nombre: nombre,
        tipo: tipo,
        codigo: codigo,
        descripcion:descripcion,
        precio:precio,
        imageURL: result.url,
        public_id: result.public_id
    });
    console.log(newProduct)
    await newProduct.save();
    await fs.unlink(req.file.path);
    res.redirect('/products/add');
});

router.get('/products/delete/:contacto_id', async (req, res) => {
    const { contacto_id }= req.params;
    const contacto = await Product.findByIdAndDelete(contacto_id);
    const result = await cloudinary.v2.uploader.destroy(contacto.public_id);
    console.log(result);
    res.redirect('/products/add')
});

router.get('/products/edit/:contacto_id',async (req,res) =>{
    const {contacto_id} = req.params
    const task = await Product.findById(contacto_id);
    console.log(task)
    res.render("edit", {task});
})


router.post('/products/edit/:photo_id',async (req,res) =>{
    const {photo_id} = req.params;
    const upd=await Product.updateOne({ _id: photo_id },req.body);
    console.log("aca",req.body)
    console.log(upd)
    res.redirect('/products/add')
});  


router.post('/products/search', async (req, res) => {
    const { nombre } = req.body;
    
    const productos= await Product.find({nombre:nombre})
   console.log(productos)
   res.render('product_form', {productos});
});

module.exports = router;