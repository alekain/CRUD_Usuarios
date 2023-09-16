const express = require("express");
const router = express.Router();
const Category = require("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/category");

router.post("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/category", async (req, res) => {
  const { name, description } = req.body;

  const category = new Category({
    name,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await category.save();

  res.json(category);
});

router.get("c:/Users/Familia Superman/Desktop/Fullstack Diplomado/Modulo 4/Examen Node/Models/category"), async (req, res) => {
  const categories = await Category.find();
}
