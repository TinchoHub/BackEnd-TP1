const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// ==========================================
// Módulo de Clientes - Implementado por Dalila
// ==========================================

const clientesRutas = require('./rutas/clientes');

app.use('/clientes', clientesRutas);

// ==========================================
// Módulo de Vehículos - Implementado por Jorge
// ==========================================

const vehiculosRutas = require('./rutas/vehiculosRoutes');

app.use('/vehiculos', vehiculosRutas);

// ==========================================
// Módulo de Turnos - Implementado por Luis
// ==========================================

const turnosRutas = require('./rutas/turnos');

app.use('/turnos', turnosRutas);

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});