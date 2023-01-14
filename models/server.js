import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { router as routerUser } from "../routes/user.routes.js";
import { router as routerAuth } from "../routes/auth.routes.js";
import { router as routerCategorias } from "../routes/categorias.routes.js";
import { router as routerProductos } from "../routes/productos.routes.js";
import { router as routerBuscar } from "../routes/buscar.routes.js";
import { router as routerUpload } from "../routes/uploads.routes.js";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      productos: "/api/productos",
      categorias: "/api/categorias",
      uploads: "/api/uploads",
    };

    //Conectar a base de datos
    this.connectDB();
    //middlewares
    this.middleware();

    // rutas de la aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));

    //Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, // Dejar en false
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.buscar, routerBuscar);
    this.app.use(this.paths.usuarios, routerUser);
    this.app.use(this.paths.productos, routerProductos);
    this.app.use(this.paths.categorias, routerCategorias);
    this.app.use(this.paths.uploads, routerUpload);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server ready", this.port);
    });
  }
}

export { Server };
