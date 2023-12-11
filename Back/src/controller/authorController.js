const { Author } = require("../model/author");
const User = require('../model/login');

class AuthorController
{
    static async create(req, res){
        const { name, email, birth } = req.body;

        if(!name || !birth || !email)
            return res.status(400).send({ message: "Os campos não podem estar vazios"});

        if(name.length < 3)
            return res.status(400).send({ message: "O nome noa pode ser menor que 3 caracteres"});

        if(email.length < 3)
            return res.status(400).send({ message: "Insira um e-mail válido" });

        if(!email.includes('@'))
            return res.status(400).send({ message: "Insira um e-mail válido" });

        const author = {
            name,
            email,
            birth,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        }
        try {
            await Author.create(author)
            return res.status(201).send({ message: "Autor cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ error: "Failed to get data" });
        }
    }

    static async getAuthor(_id){
        try {
            const author = await Author.findById(_id)
            if(!author)
                return res.status(404).send({ message: 'Autor nao encontrado' })
            return author
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthorController;