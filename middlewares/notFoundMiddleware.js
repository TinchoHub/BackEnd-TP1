const notFoundMiddleware = (req, res, next) => {
    res.status(404);

    // Si la petición va a la API (/api/...) o espera JSON, devolvemos JSON
    if (req.originalUrl.startsWith("/api") || req.xhr) {
        return res.json({
            status: 404,
            error: "Recurso no encontrado",
            mensaje: `La ruta ${req.method} ${req.originalUrl} no existe en la API.`
        });
    }

    // Si entra desde el navegador web, renderizamos la vista 404
    res.render("404", {
        titulo: "Página no encontrada",
        url: req.originalUrl
    });
};

module.exports = notFoundMiddleware;