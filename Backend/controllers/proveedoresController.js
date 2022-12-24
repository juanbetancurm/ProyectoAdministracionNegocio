const Proveedores = require ('../models/Proveedores');

//Función asíncrona
exports.mostrarProveedores = async (req, res) =>{
try {
    const proveedores = await Proveedores.find();
    res.json(proveedores)

} catch (error) {
    console.log(error);
    res.status(500).send("Error al consultar los proveedores");
}
}


exports.agregarProveedores = async (req, res) =>{
    try {
        let proveedor;
        proveedor = new Proveedores(req.body)
        
        await proveedor.save();
        res.send(proveedor);
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al agregar los proveedores.");
    }

}

exports.mostrarProveedoresId = async (req, res) =>{
    try {
       let proveedores = await Proveedores.findById(req.params.id);
       
       if (!proveedores){
        res.status(404).json({msg: "No se encuentra el proveedor."});
        //Para que no se cuelgue si se repite el llamado desde el front
            return
       }

       res.send(proveedores);
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al consultar el proveedor especificado");
    }
    }

exports.eliminarProveedores = async (req, res) =>{
    try {
        
            let proveedores = await Proveedores.findById(req.params.id);
            
            if (!proveedores){
            res.status(404).json({msg: "No se encuentra el proveedor que desea eliminar."});
            //Para que no se cuelgue si se repite el llamado desde el front
            return
        }
            //Proveedores como fue definido en el "await" al inicio de función.
            await Proveedores.findOneAndRemove({_id:req.params.id});
            res.json({msg:"El proveedor ha sido eliminado con éxito."});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el proveedor especificado");
    }
    }

exports.actualizarProveedores = async (req, res) =>{
    try {
        
        const{nombres, apellidos, documento, correo, telefono, direccion, empresa} = req.body;
        
        let proveedores = await Proveedores.findById(req.params.id);
        
        if (!proveedores){
            res.status(404).json({msg: "No se encuentra el proveedor que desea actualizar."});
            //Para que no se cuelgue si se repite el llamado desde el front
            return
        }
        
        proveedores.nombres = nombres;
        proveedores.apellidos = apellidos;
        proveedores.documento = documento;
        proveedores.correo = correo;
        proveedores.telefono = telefono;
        proveedores.direccion = direccion;
        proveedores.empresa = empresa;

        proveedores = await Proveedores.findOneAndUpdate ({_id: req.params.id}, proveedores, {new:true});
        res.json(proveedores);


        
            
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el proveedor especificado");
    }
    }