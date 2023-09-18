const express = require("express");
const jwt = require("express-jwt");
const app = express();
const usersRouter = express.Router();

// Importar el modelo de usuario
const User = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/user");

// Configuración del middleware JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

// Configuración de las rutas
usersRouter.get("/", async (req, res) => {
  // Verificar que el usuario esté autenticado
  const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  // Si el usuario no está autenticado, rechazar la solicitud
  if (!user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Obtener el usuario del token JWT
  const userId = user.id;

  // Consultar al usuario en la base de datos
  const userModel = await User.findById(userId);

  // Devolver el usuario al cliente
  res.json(userModel);
});

// Escuchar el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = usersRouter;
