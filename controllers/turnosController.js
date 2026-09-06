const fs = require("fs");
const path = require("path");

const Turno = require("../modulos/Turno");

const rutaArchivo = path.join(__dirname, "../almacenamiento/turnos.json");

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

// CREAR TURNO
const crearTurno = (req, res) => {
    const turnos = leerTurnos();
    const { id, clienteId, vehiculoId, fecha, hora, servicio } = req.body;
    
    const nuevoTurno = new Turno(id, clienteId, vehiculoId, fecha, hora, servicio);
    turnos.push(nuevoTurno);
    guardarTurnos(turnos);
    
    res.status(201).json({ mensaje: "Turno creado", turno: nuevoTurno });
};

//CONSULTAR TURNO
const consultarTurnoPorId = (req, res) => {
    const turnos = leerTurnos();
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
    const turnos = leerTurnos();
    const id = parseInt(req.params.id);
    const turnoIndex = turnos.findIndex(t => t.id === id);
    if (turnoIndex === -1) {
        return res.status(404).json({
            mensaje: "Turno no encontrado"
        });
    }
    turnos.splice(turnoIndex, 1);
    guardarTurnos(turnos);
    res.json({
        mensaje: "Turno cancelado"
    });
};

// MODIFICAR / ACTUALIZAR TURNO
const actualizarTurno = (req, res) => {
    const turnos = leerTurnos();
    const id = req.params.id;
    const indice = turnos.findIndex(t => t.id == id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Turno no encontrado" });
    }

    // Actualizamos los datos del turno manteniendo el ID original
    turnos[indice] = {
        id: Number(id),
        clienteId: req.body.clienteId,
        vehiculoId: req.body.vehiculoId,
        fecha: req.body.fecha,
        hora: req.body.hora,
        servicio: req.body.servicio
    };

    guardarTurnos(turnos);
    res.json({ mensaje: "Turno actualizado con éxito", turno: turnos[indice] });
};

module.exports = {
    listarTurnos,
    crearTurno,
    consultarTurnoPorId,
    cancelarTurnoPorId,
    actualizarTurno
};

