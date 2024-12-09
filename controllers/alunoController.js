const AlunoModel = require("../models/AlunoModel");

class AlunoController{
    static async listar(req, res){

    const mat = req.params.matricula;
    let find = false;
    const alunos = await AlunoModel.find();

    if (mat){
        alunos.forEach(function(value){
            if(mat == value.matricula){
                find = value;
            }
        });

        if(find==false){
            res.status(404).render("notFound");
        }else{
            res.render("aluno/aluno", {aluno:find});
        }

    }else{
        res.render("aluno/listagem", {alunos, newA:req.query.newA});
        
    }
    };

    static async getCadastrar(req, res){
        const matricula = req.params.matricula;
        let aluno = {};

        if(matricula != undefined){
            aluno = await AlunoModel.findOne({matricula});
        }

        res.render("aluno/cadastrar", {aluno});
    };

    static async postCadastrar(req, res){

        if(req.body._id){ //Atualizar
            await AlunoModel.findOneAndUpdate({_id: req.body_id}, {
                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso
            })

            res.redirect("/alunos?newA=3");
        }else{ //Cadastrar
            const newAluno = new AlunoModel({
                matricula: req.body.matricula,
                nome: req.body.nome,
                curso: req.body.curso
            });
        
            await newAluno.save();
            res.redirect("/alunos?newA=1");
        }

        
    };

    static async remover(req, res){
        const mat = req.params.matricula;
        await AlunoModel.deleteOne({matricula: mat});
        res.redirect("/alunos?newA=2");
    }

}

module.exports = AlunoController;

