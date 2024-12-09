const express = require("express");
const routes = express.Router();

const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");

routes.post("/usuarios/", auth, usuarioController.postCadastrar);
routes.get("/usuarios/cadastrar/:email?", usuarioController.getCadastrar);

routes.get("/usuarios/logout", auth, usuarioController.logout);

routes.get("/usuarios/login", usuarioController.getLogin);
routes.post("/usuarios/login", usuarioController.postLogin);

routes.get("/usuarios/remover/:email", auth, usuarioController.remover);
routes.get("/usuarios/:email?", auth, usuarioController.listar);

module.exports = routes;