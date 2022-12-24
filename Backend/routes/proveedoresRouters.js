const express = require ('express');

const router = express.Router();

//Asociamos ruta con controlador
const proveedoresController = require ('../controllers/proveedoresController');

//Rutas CRUD
//Aquí vamos a llamar a la función "consultarProveedores" que está en proveedoresController
router.get('/', proveedoresController.mostrarProveedores);
router.post('/', proveedoresController.agregarProveedores);
router.get('/:id', proveedoresController.mostrarProveedoresId);
router.delete('/:id', proveedoresController.eliminarProveedores);
router.put('/:id', proveedoresController.actualizarProveedores);

//Exportamos el módulo

module.exports = router;