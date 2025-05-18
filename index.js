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

app.get('/api/movies', async (req, res) => { // Rota GET que retorna uma lista de filmes estática em formato JSON
    //TODO: Fazer um get de todos os filmes que estão no banco de dados
    const db = client.db(dbName) // acessa o banco de dados
    const collection = db.collection(collectionName) // acessa a collection dentro do banco de dados
    const result = await collection.find({}).toArray()
    console.log(result) // imprimi o resultado no console
    //res.status(200) // retorna 200 como código de sucesso
    res.json(result) // Exibe o resultado como objeto Json
})

/*[
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
})*/

app.get('/api/movies/name/:name', async (req, res) => { // Rota GET que retorna um único filme com base no nome (exemplo estático)
    //TODO: Fazer um get do filme pelo nome
    const db = client.db(dbName) // acessa o banco de dados
    const collection = db.collection(collectionName) // acessa a collection dentro do banco de dados
    const result = await collection.findOne({ name: req.params.name }) // Encontra o item pelo parametro name
    console.log(result) // imprimi o resultado no console

    if (result) {
        res.json(result) //Exibe o resultado como um objeto Json
    } else {
        res.sendStatus(404)
    }
    //res.status(200) // retorna 200 como código de sucesso
    


    /*console.log(req.params.name)
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
    res.json(movie) // Envia a resposta como um JSON contendo os detalhes do filme*/

})


app.delete('/api/movies/name/:name', async (req, res) => { // Rota GET que retorna um único filme com base no nome (exemplo estático)
    //TODO: Fazer um get do filme pelo nome
    const db = client.db(dbName) // acessa o banco de dados
    const collection = db.collection(collectionName) // acessa a collection dentro do banco de dados
    const result = await collection.deleteOne({ name: req.params.name }) // Encontra o item pelo parametro name
    console.log(result) // imprimi o resultado no console

    if (result.deletedCount) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
    //res.status(200) // retorna 200 como código de sucesso
    //res.json(result) //nesse caso só retorno o status
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
            directors: req.body.directors,
            cast: req.body.cast,
            country: req.body.country,
            synopsis: req.body.synopsis,
            mpaa
        })
        console.log(result) // imprimi o resultado no console
        res.sendStatus(201) // retorna 201 como código de sucesso
    }
})



app.put('/api/movies/name/:name', async (req, res) => {
    console.log(req.body)
    const db = client.db(dbName) // acessa o banco de dados
    const collection = db.collection(collectionName) // acessa a collection dentro do banco de dados

    const result = await collection.updateOne(
        { name: req.params.name }, // Encontra o item pelo parametro name
        {
            //Substitui os novos dados inseridos no body
            $set: {
                year: req.body.year,
                directors: req.body.directors,
                cast: req.body.cast,
                country: req.body.country,
                synopsis: req.body.synopsis,
                mpaa: req.body.mpaa
            }//,
            // $unset: {
            //     abc: 1
            // }
        }
    )

    console.log(result)

    if (result.matchedCount) {
        res.sendStatus(200)
        return
    } else {
        res.sendStatus(404)
        return
    }
})


app.listen(port, () => { // Inicia o servidor na porta definida
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

