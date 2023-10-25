const express = require("express");
var router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
//obter todos os usuarios
router.get("/", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: "Isso nem e um ID",
    });
  }
  const user = await User.findById(id);
  return user
    ? res.json(user)
    : res.status(404).json({
        message: "Nada encontrado",
      });
});

//Cadastro do usuario
router.post("/", async (req, res) => {
  const user = req.body;
  const result = await User.create(user);

  return res.json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({
      message: "Informe um ID valido",
    });
  }
  const result = await User.deleteOne({ _id: id });
  return result.deletedCount > 0
    ? res.send()
    : res.status(404).json({
        message: "Nada encontrado",
      });
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userJson = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Isso não é um ID válido",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Erro na validação do ID",
    });
  }

  try {
    const userConfere = await User.findById(id);

    if (userConfere) {
      userJson.updatedAt = Date.now();
      userJson.createdAt = userConfere.createdAt;

      const hasError = new User(userJson).validateSync();
      if (hasError) {
        const errors = {};
        for (const field in hasError.errors) {
          errors[field] = hasError.errors[field].message;
        }
        return res.status(400).json({ errors });
      }

      await User.updateOne({ _id: id }, userJson);
      return res.status(200).json(userJson);
    } else {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
});

module.exports = router;
