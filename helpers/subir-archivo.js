import path from "path";
import { v4 as uuidv4 } from "uuid";

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar la extensión
    if (!extensionesValidas.includes(extension)) {
      return reject(`La extensión ${extension} no es permitida`);
    }

    const nombreTemp = uuidv4() + "." + extension;
    const __dirname = path.resolve();
    const uploadPath = path.join(__dirname, "/uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

export { subirArchivo };
