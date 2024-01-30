const { Author } = require("../model/author");
const User = require('../model/user');
var CryptoJS = require("crypto-js");
require('dotenv').config();

class AuthorController
{
    static async register(req, res)
    {
        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json2 = JSON.parse(decryptd);

        const { name, birth, email, password, confirmPassword } = json2;

        if(!name)
            return res.status(400).json({ message: "O nome é obrigatório." });

        if(!email)
            return res.status(400).json({ message: "O e-mail é obrigatório." });

        if(!password)
            return res.status(400).json({ message: "A senha é obrigatória." });

        if(password != confirmPassword)
            return res.status(400).json({ message: "As senhas não conferem." });

        const userExists = await User.findOne({ email: email });

        if(userExists)
            return res.status(422).json({ message: "Insira outro e-mail"});

        const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const author = new Author({
            name,
            email,
            birth,
            createdAt: Date.now(),
            updatdAt: Date.now(),
            removedAt: null,
        });

        const user = new User({
            login: email,
            author,
            email,
            password: passwordCrypt,
            createdAt: Date.now(),
            updatdAt: Date.now(),
            removedAt: null,
        });

        try {
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Algo falhou", data: error.message })
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