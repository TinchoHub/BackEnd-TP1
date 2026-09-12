const fs = require("fs");
const path = require("path");
const Cliente = require("../modulos/Cliente");
const rutaArchivo = path.join(__dirname, "../almacenamiento/clientes.json");

// LEER ARCHIVO DE CLIENTES
const leerClientes = () => {
    if (!fs.existsSync(rutaArchivo)) {
        return [];
    }
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return data ? JSON.parse(data) : [];
};

// GUARDAR ARCHIVO DE CLIENTES
const guardarClientes = (clientes) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(clientes, null, 2));
};

// LISTAR CLIENTES
const listarClientes = (req, res) => {
    const clientes = leerClientes();
    res.json(clientes);
};

// CONSULTAR CLIENTE
const consultarClientePorId = (req, res) => {
    const clientes = leerClientes();
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    res.json(cliente);
};

// AGREGAR CLIENTE
const agregarCliente = (req, res) => {
    const clientes = leerClientes();
    const { nombre, apellido, telefono, email } = req.body;
    if (!nombre || !apellido || !telefono || !email) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios (nombre, apellido, telefono, email)" });
    }
    // ID autoincremental seguro
    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    const nuevoCliente = new Cliente(nuevoId, nombre, apellido, telefono, email);
    clientes.push(nuevoCliente);
    guardarClientes(clientes);
    res.status(201).json({
        mensaje: "Cliente agregado con éxito",
        cliente: nuevoCliente
    });
};

// MODIFICAR CLIENTE
const modificarClientePorId = (req, res) => {
    const clientes = leerClientes();
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);
    if (clienteIndex === -1) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    const { nombre, apellido, telefono, email } = req.body;
    clientes[clienteIndex] = new Cliente(
        id,
        nombre || clientes[clienteIndex].nombre,
        apellido || clientes[clienteIndex].apellido,
        telefono || clientes[clienteIndex].telefono,
        email || clientes[clienteIndex].email
    );
    guardarClientes(clientes);
    res.json({
        mensaje: "Cliente modificado",
        cliente: clientes[clienteIndex]
    });
};

// ELIMINAR CLIENTE
const eliminarClientePorId = (req, res) => {
    const clientes = leerClientes();
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);
    if (clienteIndex === -1) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    clientes.splice(clienteIndex, 1);
    guardarClientes(clientes);
    res.json({
        mensaje: "Cliente eliminado"
    });
};

module.exports = {
    listarClientes,
    agregarCliente,
    consultarClientePorId,
    modificarClientePorId,
    eliminarClientePorId
};