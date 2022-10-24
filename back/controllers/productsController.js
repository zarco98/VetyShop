const producto=require("../models/productos")
const fetch=(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));//Usurpación del require

//Ver la lista de productos
exports.getProducts=async(req,res,next) =>{
    const productos=await producto.find();
    res.status(200).json({
        success: true,
        count: productos.length,
        productos
    })
}

//Ver un producto por ID
exports.getProductById=async(req,res,next)=>{
    const product=await producto.findById(req.params.id)
    
    if (!product){
        return res.status(404).json({
            success:false,
            message:'No encontramos ese producto'
        })
    }
    res.status(200).json({
        success:true,
        message:"Aquí debajo encuentras información sobre tu producto:",
        product
    })
}

//Update un producto
exports.updateProducts=async(req,res,next) =>{
    let product=await producto.findById(req.params.id)//Variable de tipo modificable
    
    if (!product){//Verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({
            success:false,
            message:'No encontramos ese producto'
        })
    }

    //Si el objeto existía, entonces si ejecuto la actualización
    product= await producto.findByIdAndUpdate(req.params.id, req.body, {
        new:true,//Valido sólo los atributos nuevos o actualizados
        runValidators:true
    });
    //Respondo OK si el producto sí se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        product
    })
}

//Eliminar un producto
exports.deleteProducts=async(req,res,next) =>{
    const product=await producto.findById(req.params.id)//Variable de tipo modificable
    
    if (!product){//Verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({//Si el objeto no existe, return termina el método
            success:false,
            message:'No encontramos ese producto'
        })
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Producto eliminado correctamente"
    })
}

//Crear nuevo producto /api/productos
exports.newProduct=async(req,res,next)=>{
    const product= await producto.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

//Hablemos de fetch
//Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json()
    .then(res=>console.log(res)))
    .catch(err=>console.error(err))
}

//verProductos(); Llamamos al método para probar la consulta

//Ver por id
function verProductosPorID(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res=>res.json()
    .then(res=>console.log(res)))
    .catch(err=>console.error(err))
}

//verProductosPorID('6355c2914cc101722702d134'); Probamos el método con un id