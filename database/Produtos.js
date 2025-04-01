const Sequelize = require ("sequelize");
const connection = require ("./database");

const Produto = connection.define('produtos', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    preco: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },

    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

Produto.sync({ force: false }) // Não recriar a tabela se ela já existir
    .then(() => {
        console.log('Tabela "produtos" verificada com sucesso!');
    })
    .catch((err) => {
        console.error('Erro ao verificar a tabela produtos:', err);
    });


module.exports = Produto;