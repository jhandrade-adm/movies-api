const express = require('express')
const { MongoClient } = require('mongodb');


const port = 3000
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'movies';

const client = new MongoClient(mongoUrl);
const app = express()

const connect2db = async () => {
    await client.connect();
    console.log("banco conectado")
}

const disconnect2db = async () => {
    await client.close();
    console.log("banco desconectado")
}

connect2db()

app.use(express.static('public'))

app.get('/api/movies', (req, res) => {
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
    res.json(movies)
})

app.get('/api/movies/:name', (req, res) => {
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
    res.json(movie)
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

app.post('/api/movies', (req, res) => {
    res.sendStatus(201)
})


app.listen(port, () => {
    console.log(`App de exemplo esta rodando na porta ${port}`)
})

