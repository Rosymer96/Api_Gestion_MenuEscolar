const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwt");

const checkToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.json({ success: false, message: "El token es obligatorio" });
    }
    //Separar el token de bears
    const token = req.headers.authorization.split(" ")[1];

    const resultToken = verifyToken(token);
    if (!resultToken) {
      return res.json({ success: false, message: "Token invalido o expirado" });
    }
    req.userLogin = resultToken;
    next();
  } catch (error) {
    console.error("Error en checkToken:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error al verificar el token" });
  }
};

const authorizeRoles = (...rol) => {
  return (req, res, next) => {
    if (!rol.includes(req.userLogin.rol)) {
      return res.status(403).json({
        success: false,
        message: "No tienes permiso para acceder a esta ruta",
      });
    }
    next();
  };
};

module.exports = { checkToken, authorizeRoles  };
