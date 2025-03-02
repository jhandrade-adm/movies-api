const express = require('express')
const app = express()
const port = 3000

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