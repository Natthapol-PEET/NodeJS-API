const express = require('express');
const bodyParser = require('body-parser');

 var app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));


var movies = [
    {
        id: 0,
        name: "The Flash",
        type: "series",
        isPublished: false
    },
    {
        id: 1,
        name: "Arrow",
        type: "series",
        isPublished: true
    },
    {
        id: 2,
        name: "Harry Potter",
        type: "movie",
        isPublished: false
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello Fucking World</h1>');
});

// http://localhost:3000/api/movies
app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.post('/api/movies', (req, res) => {
    const movie = {
            id: movies.length + 1,
            name: req.body.name,
            type: req.body.typeMovie,
            isPublished: req.body.isPublished
    };

    console.log(req.body);

    movies.push(movie);
    res.send(movie);
});

// http://localhost:3000/api/movies/0
app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.body.id));
    if(!movie) {
        res.status(404).send('The movie with the given ID was not found ')
    }else {
        movie.name = req.body.name;
        movie.type = req.body.typeMovie;
        movie.isPublished = req.body.isPublished;
    
        res.send(movie);
    }
})

// http://localhost:3000/api/movies/2
app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) {
        res.status(404).send('The movie with the given ID was not found ')
    }else {

        const index = movies.indexOf(movie);
        movies.splice(index, 1);
    
        res.send(movie);
    }
});
      

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );