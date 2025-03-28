const express = require('express') // Importa a biblioteca Express para criar o servidor web
const { MongoClient } = require('mongodb'); // Importa o MongoClient da biblioteca MongoDB para conectar ao banco de dados


const port = 3000 // define a porta 3000
const mongoUrl = 'mongodb://localhost:27017'; // Define a URL de conexão com o banco de dados MongoDB
const dbName = 'movies'; // define o nome do banco de dados

const client = new MongoClient(mongoUrl); // Cria uma instância do cliente MongoDB para gerenciar a conexão
const app = express() // Inicializa a aplicação Express

const connect2db = async () => { // Função assíncrona para conectar ao banco de dados MongoDB
    await client.connect();
    console.log("banco conectado")
}

const disconnect2db = async () => { // Função assíncrona para desconectar do banco de dados MongoDB
    await client.close();
    console.log("banco desconectado")
}

connect2db() // Chama a função para conectar ao banco de dados ao iniciar o servidor

app.use(express.static('public')) // Configura o Express para servir arquivos estáticos da pasta 'public

app.get('/api/movies', (req, res) => { // Rota GET que retorna uma lista de filmes estática em formato JSON
    const movies = [
        {
            _id: "123456",
            name: "Hotel Ruanda",
            year: 1987,
            directors: ["Gabi", "Thais"],
            cast: ["João", "Daniel"],
            country: "Congo",
            synopsis: "Loren Ipsum",
            mpaa: "PG-13"
        },
        {
            _id: "123456",
            name: "Hotel Ruanda",
            year: 1987,
            directors: ["Gabi", "Thais"],
            cast: ["João", "Daniel"],
            country: "Congo",
            synopsis: "Loren Ipsum",
            mpaa: "PG-13"
        }
    ]
    res.json(movies) // Envia a resposta como um JSON contendo os detalhes do filme
})

app.get('/api/movies/:name', (req, res) => { // Rota GET que retorna um único filme com base no nome (exemplo estático)
    const movie = {
        _id: "123456",
        name: "Hotel Ruanda",
        year: 1987,
        directors: ["Gabi", "Thais"],
        cast: ["João", "Daniel"],
        country: "Congo",
        synopsis: "Loren Ipsum",
        mpaa: "PG-13"
    }
    res.json(movie) // Envia a resposta como um JSON contendo os detalhes do filme
    /* 
    Nome do filme
    Ano do filme
    Lista de diretores
    Lista de atores
    País de produção
    Sinopse
    Identificador do filme
    Classificação etária
    */
})

app.post('/api/movies', (req, res) => { //Rota POST para criação de um novo filme (ainda sem lógica implementada)
    res.sendStatus(201)
})


app.listen(port, () => { // Inicia o servidor na porta definida
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

