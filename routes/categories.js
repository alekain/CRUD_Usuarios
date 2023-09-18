const express = require("express");
const jwt = require("express-jwt");
const app = express();
const categoriesRouter = express.Router();

// Importar el modelo de categoría
const Category = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/category");

// Configuración del middleware JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

// Configuración de las rutas
categoriesRouter.get("/", async (req, res) => {
  // Verificar que el usuario esté autenticado
  const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  // Si el usuario no está autenticado, rechazar la solicitud
  if (!user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Obtener todas las categorías
  const categories = await Category.find();

  // Devolver las categorías al cliente
  res.json(categories);
});

categoriesRouter.post("/create", async (req, res) => {
  // Verificar que el usuario esté autenticado
  const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  // Si el usuario no está autenticado, rechazar la solicitud
  if (!user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Verificar que el usuario tenga el permiso `admin`
  const roles = user.roles;
  if (!roles.includes("admin")) {
    return res.status(403).json({ message: "No tienes permiso" });
  }

  // Crear una nueva categoría
  const category = new Category({
    name: req.body.name,
  });

  // Guardar la categoría en la base de datos
  await category.save();

  // Devolver la nueva categoría al cliente
  res.json(category);
});

// Escuchar el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = categoriesRouter;
