const express = require("express");
const jwt = require("express-jwt");
const app = express();
const loginRouter = express.Router();

// Importar el modelo de usuario
const User = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/user");

// Configuración del middleware JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

// Configuración de las rutas
loginRouter.post("/", async (req, res) => {
  // Obtener los datos del usuario
  const { username, password } = req.body;

  // Buscar al usuario en la base de datos
  const userModel = await User.findOne({ username });

  // Si el usuario no existe, rechazar la solicitud
  if (!userModel) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  // Verificar la contraseña
  if (userModel.password !== password) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  // Generar un token JWT
  const token = jwt.sign({ id: userModel.id }, process.env.JWT_SECRET);

  // Devolver el token JWT al cliente
  res.json({ token });
});

// Escuchar el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = loginRouter;
