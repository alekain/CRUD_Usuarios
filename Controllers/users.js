const express = require("express");
const router = express.Router();
const User = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/user");
const Category = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/category");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

router.use(jwt({ secret: process.env.JWT_SECRET }));

module.exports = router;
