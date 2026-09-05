const fs = require("fs");
const path = require("path");

const Cliente = require("../modulos/Cliente");

const rutaArchivo = path.join(__dirname, "../almacenamiento/clientes.json");

//LEER ARCHIVO DE CLIENTES
const leerClientes = () => {
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return JSON.parse(data);
};

//GUARDAR ARCHIVO DE CLIENTES
const guardarClientes = (clientes) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(clientes, null, 2));
};

//LISTAR CLIENTES
const listarClientes = (req, res) => {
    const clientes = leerClientes();
    res.json(clientes);
};

//CONSULTAR CLIENTE
const consultarClientePorId = (req, res) => {
    const clientes = listarClientes();
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    res.json(cliente);
};

//AGREGAR CLIENTE
const agregarCliente = (req, res) => {
    const clientes = listarClientes();
    const { id, nombre, apellido, telefono, email } = req.body;
    const nuevoCliente = new Cliente(id, nombre, apellido, telefono, email);
    clientes.push(nuevoCliente);
    guardarClientes(clientes);
    res.status(201).json({ mensaje: "Cliente agregado", cliente: nuevoCliente });
};

//MODIFICAR CLIENTE
const modificarClientePorId = (req, res) => {
    const clientes = listarClientes();
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);
    if (clienteIndex === -1) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    const { nombre, apellido, telefono, email } = req.body;
    clientes[clienteIndex] = new Cliente(id, nombre, apellido, telefono, email);
    guardarClientes(clientes);
    res.json({ mensaje: "Cliente modificado", cliente: clientes[clienteIndex] });
};

//ELIMINAR CLIENTE
const eliminarClientePorId = (req, res) => {
    const clientes = listarClientes();
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