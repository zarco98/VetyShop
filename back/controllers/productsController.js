const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));//Usurpación del require

//Ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productsCount = await producto.countDocuments();

    const apiFeatures = new APIFeatures(producto.find(), req.query)
    .search()
    .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})

//Ver un producto por ID
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    res.status(200).json({
        success: true,
        message: "Aquí debajo encuentras información sobre tu producto:",
        product
    })
})

//Update un producto
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
    let product = await producto.findById(req.params.id)//Variable de tipo modificable

    if (!product) {//Verifico que el objeto no existe para finalizar el proceso
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    //Si el objeto existía, entonces si ejecuto la actualización
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,//Valido sólo los atributos nuevos o actualizados
        runValidators: true
    });
    //Respondo OK si el producto sí se actualizó
    res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        product
    })
})

//Eliminar un producto
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.params.id)//Variable de tipo modificable

    if (!product) {//Verifico que el objeto no existe para finalizar el proceso
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente"
    })
})

//Crear nuevo producto /api/productos
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
    const product = await producto.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

//Hablemos de fetch
//Ver todos los productos
function verProductos() {
    fetch('http://localhost:4000/api/productos')
        .then(res => res.json()
            .then(res => console.log(res)))
        .catch(err => console.error(err))
}

//verProductos(); Llamamos al método para probar la consulta

//Ver por id
function verProductosPorID(id) {
    fetch('http://localhost:4000/api/producto/' + id)
        .then(res => res.json()
            .then(res => console.log(res)))
        .catch(err => console.error(err))
}

//verProductosPorID('6355c2914cc101722702d134'); Probamos el método con un id