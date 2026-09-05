const fs = require("fs");
const path = require("path");

const Turno = require("../modulos/Vehiculo");

const rutaArchivo = path.join(__dirname, "../almacenamiento/vehiculos.json");

//LEER ARCHIVO DE VEHICULOS
const leerVehiculos = () => {
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return JSON.parse(data);
};

//GUARDAR ARCHIVO DE VEHICULOS
const guardarVehiculos = (vehiculos) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(vehiculos, null, 2));
};

//LISTAR VEHICULOS
const listarVehiculos = (req, res) => {
    const vehiculos = leerVehiculos();
    res.json(vehiculos);
};

//AGREGAR VEHICULO
const agregarVehiculo = (req, res) => {
    const vehiculos = leerVehiculos();
    const { id, patente, marca, modelo, clienteId } = req.body;
    const nuevoVehiculo = new Vehiculo(id, patente, marca, modelo, clienteId);
    vehiculos.push(nuevoVehiculo);
    guardarVehiculos(vehiculos);
    res.status(201).json({ mensaje: "Vehículo creado", vehiculo: nuevoVehiculo });
};

//CONSULTAR VEHICULO
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

module.exports = {
    listarVehiculos,
    agregarVehiculo,
    consultarVehiculoPorId
};