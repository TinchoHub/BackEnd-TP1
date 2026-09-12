document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MENÚ ACTIVO SEGÚN LA URL
    // ==========================================

    const enlaces = document.querySelectorAll(".sidebar__nav a");
    const rutaActual = window.location.pathname;

    enlaces.forEach(enlace => {
        const rutaEnlace = enlace.getAttribute("href");

        enlace.classList.remove("active");

        if (
            rutaEnlace === rutaActual ||
            (rutaEnlace !== "/" && rutaActual.startsWith(rutaEnlace))
        ) {
            enlace.classList.add("active");
        }
    });


    // ==========================================
    // EFECTO SUAVE EN LAS CARDS
    // ==========================================

    const cards = document.querySelectorAll(
        ".accion-card, .stat-card"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });

    });


    // ==========================================
    // ANIMACIÓN DE CONTADORES
    // ==========================================

    const contadores = document.querySelectorAll(".stat-numero");

    contadores.forEach(contador => {

        const objetivo = Number(contador.textContent);

        if (Number.isNaN(objetivo)) {
            return;
        }

        let actual = 0;

        const duracion = 700;
        const pasos = 30;
        const incremento = objetivo / pasos;

        const intervalo = setInterval(() => {

            actual += incremento;

            if (actual >= objetivo) {
                contador.textContent = objetivo;
                clearInterval(intervalo);
                return;
            }

            contador.textContent = Math.floor(actual);

        }, duracion / pasos);

    });

  // ==========================================
// BUSCADOR GENÉRICO DE TABLAS
// ==========================================

const buscadores = document.querySelectorAll("[data-table-search]");

buscadores.forEach(buscador => {

    const tablaId = buscador.dataset.tableSearch;
    const filas = document.querySelectorAll(`#${tablaId} tbody tr`);

    buscador.addEventListener("input", () => {

        const busqueda = buscador.value
            .toLowerCase()
            .trim();

        filas.forEach(fila => {

            const contenido = fila.textContent.toLowerCase();

            fila.style.display =
                contenido.includes(busqueda)
                    ? ""
                    : "none";
        });
    });
});

});