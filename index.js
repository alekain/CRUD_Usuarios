const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const jwt = require("jsonwebtoken");

// Configuración de la base de datos
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/my-database";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuración del middleware JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

// Configuración de las rutas
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

// Escuchar el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});