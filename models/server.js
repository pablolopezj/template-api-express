import express from "express";
import cors from "cors";
import { router as routerUser } from "../routes/user.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middleware();

    // rutas de la aplicación
    this.routes();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());
    
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, routerUser);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server ready", this.port);
    });
  }
}

export { Server };
