import path from "path";

// Obtiene la ruta del directorio raíz del proyecto
const ROOT_PATH = path.resolve();

// Definición de las rutas relativas del proyecto
const paths = {
    root: ROOT_PATH,
    env: path.join(ROOT_PATH, ".env"),
};

export default paths;