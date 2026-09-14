const express = require("express");
const path = require("path");
const logger = require("./middlewares/logger");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// ==========================================
// Módulo de Clientes - Implementado por Dalila
// ==========================================
const clientesRutas = require('./routes/clientesRoutes');
app.use('/api/clientes', clientesRutas);

// ==========================================
// Módulo de Vehículos - Implementado por Jorge
// ==========================================
const vehiculosRutas = require('./routes/vehiculosRoutes');
app.use('/api/vehiculos', vehiculosRutas);

// ==========================================
// Módulo de Turnos - Implementado por Luis
// ==========================================
const turnosRutas = require('./routes/turnosRoutes');
app.use('/api/turnos', turnosRutas);

// Rutas Web (Pug)
const vistasRutas = require("./routes/vistas");
app.use("/", vistasRutas);

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});