const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Produto = require("./database/Produtos");

// Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o BD feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Configuração do EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota principal (home)
app.get("/", (req, res) => {
    Produto.findAll({ raw: false, order: [["id", "DESC"]] }).then((produtos) => {
        res.render("index", { produtos: produtos });
    });
});


// Rota para exibir a página de produtos
app.get("/especificacao", (req, res) => {
    Produto.findAll({ raw: true, order: [["id", "DESC"]] }).then((produtos) => {
        res.render("especificacao", { produtos: produtos });
    });
});

// Rota para exibir um produto específico
app.get("/especificacao/:id", (req, res) => {
    const id = req.params.id;
    Produto.findOne({
        where: { id: id }
    }).then((produto) => {
        if (produto != undefined) {
            res.render("produtosId", { produto: produto }); // Passa o produto para a view
        } else {
            res.redirect("/"); // Se não encontrar o produto, redireciona para a home
        }
    });
});


// Rota para exibir a especificação de um produto
app.get("/especificacao/:id", (req, res) => {
    const id = req.params.id;
    Produto.findOne({
        where: { id: id }
    }).then((produto) => {
        if (produto != undefined) {
            res.render("produto", { produto: produto }); // Passa o produto para a view
        } else {
            res.redirect("/"); // Redireciona se não encontrar o produto
        }
    });
});


app.post("/salvarproduto", (req, res) => {
    console.log("🔍 Dados recebidos:", req.body);

    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var imagem = req.body.imagem;

    // Substitui vírgula por ponto e converte para número
    preco = preco ? parseFloat(preco.toString().replace(",", ".")) : NaN;

    if (isNaN(preco)) {
        console.log("❌ Erro: Preço inválido!");
        return res.status(400).send("Erro: O preço informado não é um número válido!");
    }

    Produto.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        imagem: imagem
    })
    .then(() => {
        res.redirect("/");
    })
    .catch((error) => {
        console.error("⚠️ Erro ao salvar produto:", error);
        res.status(500).send("Erro ao salvar produto no banco.");
    });
});


// Rota para exibir a página de produtos
app.get("/produtos", (req, res) => {
    Produto.findAll({ raw: true, order: [["id", "DESC"]] }).then((produtos) => {
        res.render("produtos", { produtos: produtos });
    });
});

// Rota para exibir um produto específico
app.get("/produtos/:id", (req, res) => {
    const id = req.params.id;
    Produto.findOne({
        where: { id: id }
    }).then((produto) => {
        if (produto != undefined) {
            res.render("produtosId", { produto: produto }); // Passa o produto para a view
        } else {
            res.redirect("/"); // Se não encontrar o produto, redireciona para a home
        }
    });
});


// Rota para exibir a especificação de um produto
app.get("/produto/:id", (req, res) => {
    const id = req.params.id;
    Produto.findOne({
        where: { id: id }
    }).then((produto) => {
        if (produto != undefined) {
            res.render("produto", { produto: produto }); // Passa o produto para a view
        } else {
            res.redirect("/"); // Redireciona se não encontrar o produto
        }
    });
});


// Servidor rodando na porta 5000
app.listen(5000, () => {
    console.log("App rodando na porta 5000!");
});

//app.get para especificacao para poder ver todos os produtos com descrição e valor