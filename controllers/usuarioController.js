const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");

class UsuarioController{
    static async listar(req, res){

    const email = req.params.email;
    let find = false;
    const usuarios = await UsuarioModel.find();

    if (email){
        usuarios.forEach(function(value){
            if(email == value.email){
                find = value;
            }
        });

        if(find==false){
            res.status(404).render("notFound");
        }else{
            res.render("usuario/usuario", {usuario:find});
        }

    }else{
        res.render("usuario/listagem", {usuarios, newA:req.query.newA});
        
    }
    };

    static getLogin(req, res){
        const status = req.query.e;
        res.render("usuario/login", {status});

    }

    static async postLogin(req, res){
        const email = req.body.email;
        const senha = req.body.senha;

        const usuario = await UsuarioModel.findOne({email});
        
        if(usuario == null){
            res.redirect("/usuarios/login?e=1");
        }else{

            const hash = usuario.senha;
            const confirm = bcryptjs.compareSync(senha, hash);

            if(confirm == true){
                req.session.usuario = req.body.email;
                res.redirect("/");
            }else{
                res.redirect("/usuarios/login?e=1");
            }

            
        }

    }
    

    static async getCadastrar(req, res){
        const email = req.params.email;
        let usuario = {};

        if(email != undefined){
            usuario = await UsuarioModel.findOne({email});
        }

        const status = req.query.e;
        res.render("usuario/cadastrar", {usuario});
    };

    static async postCadastrar(req, res){

        if(req.body._id){ //Atualizar

            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha, salt);

            await UsuarioModel.findOneAndUpdate({_id: req.body_id}, {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            })

            console.log("Atualizado");
            res.redirect("/usuarios?newA=3");
        }else{ //Cadastrar

            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(req.body.senha, salt);

            const usuario = await UsuarioModel.findOne({email:req.body.email});
            if(usuario != null){
                //res.redirect("/usuarios/cadastrar?e=1");
            }else{
                const newUsuario = new UsuarioModel({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash
                });
            
                await newUsuario.save();
                res.redirect("/usuarios?newA=1");
            }

            
        }

        
    };

    static async remover(req, res){
        const email = req.params.email;
        await UsuarioModel.deleteOne({email: email});
        res.redirect("/usuarios?newA=2");
    }

    static logout(req, res){
        req.session.usuario = null;
        res.redirect("/usuarios/login");
    }

}

module.exports = UsuarioController;

