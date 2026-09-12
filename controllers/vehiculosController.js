const fs = require("fs");
const path = require("path");
const Vehiculo = require("../models/Vehiculo");

const rutaArchivo = path.join(__dirname, "../data/vehiculos.json");

//LEER ARCHIVO DE VEHICULOS
const leerVehiculos = () => {
    if (!fs.existsSync(rutaArchivo)) {
        return [];
    }
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return data ? JSON.parse(data) : [];
};

//GUARDAR ARCHIVO DE VEHICULOS
const guardarVehiculos = (vehiculos) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(vehiculos, null, 2), "utf-8");
};

//LISTAR VEHICULOS
const listarVehiculos = (req, res) => {
    const vehiculos = leerVehiculos();
    res.json(vehiculos);
};

//CONSULTAR VEHICULO POR ID
const consultarVehiculoPorId = (req, res) => {
    const vehiculos = leerVehiculos();
    const id = parseInt(req.params.id);
    const vehiculo = vehiculos.find(v => v.id === id);
    if (!vehiculo) {
        return res.status(404).json({
            mensaje: "Vehículo no encontrado"
        });
    }
    res.json(vehiculo);
};

//AGREGAR VEHICULO
const agregarVehiculo = (req, res) => {
    const vehiculos = leerVehiculos();
    const { patente, marca, modelo, clienteId } = req.body;
    if (!patente || !marca || !modelo || !clienteId) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios (patente, marca, modelo, clienteId)' });
    }
    const nuevoId = vehiculos.length > 0 ? Math.max(...vehiculos.map(v => v.id || 0)) + 1 : 1;
    const nuevoVehiculo = new Vehiculo(nuevoId, patente, marca, modelo, parseInt(clienteId));    
    vehiculos.push(nuevoVehiculo);
    guardarVehiculos(vehiculos);    
    res.status(201).json({ mensaje: "Vehículo creado", vehiculo: nuevoVehiculo });
};

// MODIFICAR VEHICULO
const modificarVehiculoPorId = (req, res) => {
    const vehiculos = leerVehiculos();
    const id = parseInt(req.params.id);
    const index = vehiculos.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: "Vehículo no encontrado para modificar" });
    }
    const { patente, marca, modelo, clienteId } = req.body;
    vehiculos[index] = new Vehiculo(
        id,
        patente || vehiculos[index].patente,
        marca || vehiculos[index].marca,
        modelo || vehiculos[index].modelo,
        clienteId ? parseInt(clienteId) : vehiculos[index].clienteId
    );
    guardarVehiculos(vehiculos);
    res.json({ mensaje: "Vehículo modificado con éxito", vehiculo: vehiculos[index] });
};

// ELIMINAR VEHICULO
const eliminarVehiculoPorId = (req, res) => {
    let vehiculos = leerVehiculos();
    const id = parseInt(req.params.id);
    const index = vehiculos.findIndex(v => v.id === id);
    if (index === -1) {
        return res.status(404).json({ mensaje: "Vehículo no encontrado para eliminar" });
    }
    const vehiculoEliminado = vehiculos.splice(index, 1);
    guardarVehiculos(vehiculos);
    res.json({ mensaje: "Vehículo eliminado con éxito", vehiculo: vehiculoEliminado[0] });
};

module.exports = {
    listarVehiculos,
    consultarVehiculoPorId,
    agregarVehiculo,
    modificarVehiculoPorId,
    eliminarVehiculoPorId
};