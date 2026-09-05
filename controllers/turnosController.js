const fs = require("fs");
const path = require("path");

const Turno = require("../models/Turno");

const rutaArchivo = path.join(__dirname, "../data/turnos.json");

//LEER ARCHIVO DE TURNOS
const leerTurnos = () => {
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    return JSON.parse(data);
};

//GUARDAR ARCHIVO DE TURNOS
const guardarTurnos = (turnos) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(turnos, null, 2));
};

//LISTAR TURNOS
const listarTurnos = (req, res) => {
    const turnos = leerTurnos();
    res.json(turnos);
};

//CREAR TURNO
const crearTurno = (req, res) => {
    const turnos = listarTurnos();
    const { id, clienteId, vehiculoId, fecha, hora, servicio } = req.body;
    const nuevoTurno = new Turno(id, clienteId, vehiculoId, fecha, hora, servicio);
    turnos.push(nuevoTurno);
    guardarTurnos(turnos);
    res.status(201).json({ mensaje: "Turno creado", turno: nuevoTurno });
};

//CONSULTAR TURNO
const consultarTurnoPorId = (req, res) => {
    const turnos = listarTurnos();
    const id = parseInt(req.params.id);
    const turno = turnos.find(t => t.id === id);
    if (!turno) {
        return res.status(404).json({
            mensaje: "Turno no encontrado"
        });
    }
    res.json(turno);
};

//CANCELAR TURNO
const cancelarTurnoPorId = (req, res) => {
    const turnos = listarTurnos();
    const id = parseInt(req.params.id);
    const turnoIndex = turnos.findIndex(t => t.id === id);
    if (turnoIndex === -1) {
        return res.status(404).json({
            mensaje: "Turno no encontrado"
        });
    }
    turnos.splice(turnoIndex, 1);
    fs.writeFileSync(rutaArchivo, JSON.stringify(turnos, null, 2));
    res.json({
        mensaje: "Turno cancelado"
    });
};

module.exports = {
    listarTurnos,
    crearTurno,
    consultarTurnoPorId,
    cancelarTurnoPorId
};