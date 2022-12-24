const Clientes = require ('../models/Clientes');

//Función asíncrona
exports.mostrarClientes = async (req, res) =>{
try {
    const clientes = await Clientes.find();
    res.json(clientes)

} catch (error) {
    console.log(error);
    res.status(500).send("Error al consultar los clientes");
}
}


exports.agregarClientes = async (req, res) =>{
    try {
        let cliente;
        cliente = new Clientes(req.body)
        
        await cliente.save();
        res.send(cliente);
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al agregar el cliente.");
    }

}

exports.mostrarClientesId = async (req, res) =>{
    try {
       let clientes = await Clientes.findById(req.params.id);
       
       if (!clientes){
        res.status(404).json({msg: "No se encuentra el cliente."});
        //Para que no se cuelgue si se repite el llamado desde el front
            return
       }

       res.send(clientes);
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al consultar el cliente especificado");
    }
    }

exports.eliminarClientes = async (req, res) =>{
    try {
        
            let clientes = await Clientes.findById(req.params.id);
            
            if (!clientes){
            res.status(404).json({msg: "No se encuentra el cliente que desea eliminar."});
            //Para que no se cuelgue si se repite el llamado desde el front
            return
        }
            //Clientes como fue definido en el "await" al inicio de función.
            await Clientes.findOneAndRemove({_id:req.params.id});
            res.json({msg:"El cliente ha sido eliminado con éxito."});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el cliente especificado");
    }
    }

exports.actualizarClientes = async (req, res) =>{
    try {
        
        const{nombres, apellidos, documento, correo, telefono, direccion, empresa} = req.body;
        
        let clientes = await Clientes.findById(req.params.id);
        
        if (!clientes){
            res.status(404).json({msg: "No se encuentra el cliente que desea actualizar."});
            //Para que no se cuelgue si se repite el llamado desde el front
            return
        }
        
        clientes.nombres = nombres;
        clientes.apellidos = apellidos;
        clientes.documento = documento;
        clientes.correo = correo;
        clientes.telefono = telefono;
        clientes.direccion = direccion;
        clientes.empresa = empresa;

        clientes = await Clientes.findOneAndUpdate ({_id: req.params.id}, clientes, {new:true});
        res.json(clientes);


        
            
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el cliente especificado");
    }
    }