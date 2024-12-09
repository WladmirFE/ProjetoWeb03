const express = require("express");
const routes = express.Router();

const alunoController = require("../controllers/alunoController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/alunos/cadastrar/:matricula?", auth, alunoController.getCadastrar);

routes.post("/alunos/", auth, alunoController.postCadastrar);

routes.get("/alunos/:matricula?", auth, alunoController.listar);

routes.get("/alunos/remover/:matricula", auth, alunoController.remover);

module.exports = routes;