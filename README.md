# AutoBox - Sistema de Gestión de Taller Mecánico (Trabajo Práctico Nº 1)

AutoBox es una aplicación web integral desarrollada con **Node.js** y **Express** bajo el patrón arquitectónico **MVC (Modelo-Vista-Controlador)**. Este repositorio contiene la resolución completa del trabajo práctico, estructurado mediante una solución híbrida: un frontend con renderizado del lado del servidor (SSR) usando plantillas **Pug** y una **API RESTful** en formato JSON.

---

## Mapeo de Consignas Académicas y Resoluciones

A continuación se detalla cómo se resolvieron los requerimientos técnicos y funcionales solicitados en las consignas del proyecto:

| Consignas / Requerimiento Académico | Resolución Implementada en el Proyecto | Archivos Asociados |
| :--- | :--- | :--- |
| **1. Arquitectura MVC** | Separación estricta de responsabilidades entre modelos de datos, controladores de negocio, enrutadores y vistas. | `models/`, `controllers/`, `routes/`, `views/` |
| **2. Persistencia de Datos** | Almacenamiento local mediante archivos planos en formato JSON utilizando el módulo nativo de Node.js (`fs`)[cite: 3]. | `data/clientes.json`, `data/turnos.json`, `data/vehiculos.json`[cite: 3] |
| **3. Motor de Plantillas (SSR)** | Uso de **Pug**[cite: 3] para la generación dinámica de la interfaz web, layouts reutilizables y paneles de control. | `views/layout.pug`, `views/index.pug`, `views/*.pug`[cite: 3] |
| **4. Enrutamiento Modular** | Separación de rutas por entidad (clientes, vehículos, turnos) y enrutador específico para vistas web[cite: 3]. | `routes/clientesRoutes.js`, `routes/turnosRoutes.js`, `routes/vehiculosRoutes.js`, `routes/vistas.js`[cite: 3] |
| **5. Middleware de Validación** | Control de datos obligatorios y formatos (como correos electrónicos) previos al registro o modificación[cite: 3]. | `middlewares/validarCliente.js`[cite: 3] |
| **6. Manejo de Errores y 404** | Interceptores dedicados para rutas inexistentes (con respuesta dual JSON/HTML) y controlador global de excepciones (500)[cite: 3]. | `middlewares/notFoundMiddleware.js`, `middlewares/errorHandler.js`[cite: 3] |

---

## Estructura del Directorio

```text
TP1/
├── app.js                          # Punto de entrada y configuración del servidor[cite: 3]
├── package.json                    # Dependencias y scripts del proyecto[cite: 3]
├── package-lock.json[cite: 3]
├── controllers/                    # Lógica de negocio y renderizado[cite: 3]
│   ├── clientesController.js[cite: 3]
│   ├── turnosController.js[cite: 3]
│   ├── vehiculosController.js[cite: 3]
│   └── vistasController.js[cite: 3]
├── data/                           # Almacenamiento persistente en JSON[cite: 3]
│   ├── clientes.json[cite: 3]
│   ├── turnos.json[cite: 3]
│   └── vehiculos.json[cite: 3]
├── middlewares/                    # Interceptores y filtros de solicitudes[cite: 3]
│   ├── errorHandler.js[cite: 3]
│   ├── notFoundMiddleware.js[cite: 3]
│   └── validarCliente.js[cite: 3]
├── models/                         # Clases y estructuras de datos[cite: 3]
│   ├── Cliente.js[cite: 3]
│   ├── Turno.js[cite: 3]
│   └── Vehiculo.js[cite: 3]
├── public/                         # Recursos estáticos de acceso público[cite: 3]
│   ├── css/styles.css[cite: 3]
│   ├── img/ (404.png, autobox-logo.png, hero-auto.png)[cite: 3]
│   └── js/main.js[cite: 3]
├── routes/                         # Enrutadores modulares (Web y API)[cite: 3]
│   ├── clientesRoutes.js[cite: 3]
│   ├── turnosRoutes.js[cite: 3]
│   ├── vehiculosRoutes.js[cite: 3]
│   └── vistas.js[cite: 3]
└── views/                          # Plantillas de vistas Pug[cite: 3]
    ├── 404.pug[cite: 3]
    ├── index.pug[cite: 3]
    ├── layout.pug[cite: 3]
    └── *.pug (vistas de detalle y formularios)[cite: 3]