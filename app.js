const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// ==========================================
// Módulo de Clientes - Implementado por Dalila
// ==========================================
const clientesRutas = require('./routes/clientesRoutes');
app.use('/clientes', clientesRutas);

// ==========================================
// Módulo de Vehículos - Implementado por Jorge
// ==========================================
const vehiculosRutas = require('./routes/vehiculosRoutes');
app.use('/vehiculos', vehiculosRutas);

// ==========================================
// Módulo de Turnos - Implementado por Luis
// ==========================================
const turnosRutas = require('./routes/turnosRoutes');
app.use('/turnos', turnosRutas);

// Rutas Web (Pug)
const vistasRutas = require("./routes/vistas");
app.use("/", vistasRutas);


app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});