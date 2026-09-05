const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// Módulo de Turnos - Implementado por Luis
// ==========================================
const turnosRutas = require('./rutas/turnos');
app.use('/turnos', turnosRutas);

app.listen(PORT, () => {console.log("Servidor corriendo en puerto " + PORT);});