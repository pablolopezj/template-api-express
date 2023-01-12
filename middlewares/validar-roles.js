import { response } from "express";

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token",
    });
  }

  const { rol, nombre } = req.usuario;
  console.log({ rol });
  console.log({ nombre });

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No autorizado`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

export { esAdminRole, tieneRole };
