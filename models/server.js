import express from "express";
import cors from "cors";
import { router as routerUser } from "../routes/user.routes.js";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = "/api/usuarios";

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
