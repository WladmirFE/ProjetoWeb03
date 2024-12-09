const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const session = require("express-session");
require('dotenv/config');

app.use(session({
    secret: 'cavalo',
    saveUninitialized: false,
    resave: true,
}))

const alunoRoutes = require("./routes/alunoRoutes");
app.use(alunoRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.get("/", function(req, res){
    if(req.session.usuario){
        res.render("index");
    }else{
        res.redirect("/usuarios/login");
    }
});

app.use((req, res, next)=>{
    res.status(404).render("notFound");
})

app.listen(process.env.PORT, function(){
    console.log("Rodando, bom todo");
});