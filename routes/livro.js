const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Todos os livros aqui");
});

module.exports = router;
