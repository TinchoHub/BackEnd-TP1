const validarCliente = (esEdicion = false) => {
    return (req, res, next) => {
        const { nombre, apellido, telefono, email } = req.body;

        // Si es alta, todos los campos son obligatorios
        if (!esEdicion) {
            if (!nombre || !apellido || !telefono || !email) {
                return res.status(400).json({ 
                    mensaje: "Faltan campos obligatorios (nombre, apellido, telefono, email)" 
                });
            }
        }

        // Si es edición, al menos un campo debe enviarse
        if (esEdicion && !nombre && !apellido && !telefono && !email) {
            return res.status(400).json({ 
                mensaje: "Debe enviar al menos un campo para actualizar" 
            });
        }

        // Si se envió email (en alta o edición), validamos el formato
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ mensaje: "Formato de email inválido" });
            }
        }

        next();
    };
};

module.exports = validarCliente;