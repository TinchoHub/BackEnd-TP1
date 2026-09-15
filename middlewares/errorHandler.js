const errorHandler = (err, req, res, next) => {
  console.error('[SERVER ERROR]:', err.stack || err.message);

  const status = err.status || 500;

  // Si la petición proviene de la API JSON
  if (req.originalUrl.startsWith('/api') || req.xhr) {
    return res.status(status).json({
      status: 'error',
      mensaje: err.message || 'Error interno del servidor'
    });
  }

  // Si proviene de la interfaz web (Pug)
  res.status(status).render('error', {
    titulo: 'Error en el servidor',
    mensaje: err.message || 'Ocurrió un problema procesando la solicitud'
  });
};

module.exports = errorHandler;