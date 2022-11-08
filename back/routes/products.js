const express = require("express")
const router = express.Router();

const { getProducts, newProduct, getProductById, updateProducts, deleteProducts } = require("../controllers/productsController")//Traemos la respuesta json desde el controlador

const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth")

//Probemos autenticación
router.route('/productos').get(getProducts)//Establecemos desde que ruta queremos ver el getProducts

router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); //Establecemos la ruta

router.route('/producto/:id').get(getProductById); //Ruta para consultar por id

router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts); //Creación de la ruta de actualización

router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProducts); //Creación de la ruta de eliminación por id

module.exports = router;