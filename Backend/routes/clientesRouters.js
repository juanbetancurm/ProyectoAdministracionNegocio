const express = require ('express');

const router = express.Router();

//Asociamos ruta con controlador
const clientesController = require ('../controllers/clientesController');

//Rutas CRUD
//Aquí vamos a llamar a la función "consultarClientes" que está en clientesController
router.get('/', clientesController.mostrarClientes);
router.post('/', clientesController.agregarClientes);
router.get('/:id', clientesController.mostrarClientesId);
router.delete('/:id', clientesController.eliminarClientes);
router.put('/:id', clientesController.actualizarClientes);

//Exportamos el módulo

module.exports = router;