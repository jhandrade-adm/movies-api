const express = require('express') // Importa a biblioteca Express para criar o servidor web
const { MongoClient } = require('mongodb'); // Importa o MongoClient da biblioteca MongoDB para conectar ao banco de dados


const port = 3000 // define a porta 3000
const mongoUrl = 'mongodb://localhost:27017'; // Define a URL de conexão com o banco de dados MongoDB
const dbName = 'ProjetoMovies'; // define o nome do banco de dados
const collectionName = "movies";

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

app.use(express.json()) //meddleware que convert o boda da requisição em objeto js e desponibilizaa na req.body

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

})

app.post('/api/movies', async (req, res) => { //Rota POST para criação de um novo filme (ainda sem lógica implementada)
    const name = req.body.name; // acessa a variavel no body da requisição
    const year = req.body.year;
    const mpaa = req.body.mpaa;
    if (
        name === "" || year < 1887 || mpaa === "" // valida as variaveis
    ) {
        res.sendStatus(400); // retorna 400 em caso alguma dessas variaveis seja verdadeira
    } else {
        const db = client.db(dbName) // acessa o banco de dados
        const collection = db.collection(collectionName) // acessa a collection dentro do banco de dados
        const result = await collection.insertOne({ // insere o objeto da requisição no banco de dados, criando um insertId
            name, //veriaveis do objeto da requisição
            year,
            directors : req.body.directors,
            cast : req.body.cast,
            country : req.body.country,
            synopsis : req.body.synopsis,
            mpaa
        })
        console.log(result) // imprimi o resultado no console
        res.sendStatus(201) // retorna 201 como código de sucesso
    }
})


app.listen(port, () => { // Inicia o servidor na porta definida
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

