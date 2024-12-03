// importo express 
const { count } = require('console');
const express = require('express');
const { title } = require('process');
// specifico la porta
const PORT = 3000;
// creo una istanza del server
const app = express();

// deifinisco la cartella per gli asset statici
app.use(express.static("public"));

const allPosts = require('./data/posts');

//console.log(posts);

// rotte
app.get('/', (req, res) => {
    res.send("Server del mio blog");
});

// app.get('/bacheca', (req, res) => {
//     res.json({
//         posts: posts,
//         count: posts.length
//     });
// });

// root che filtra i post in base ai tags
app.get("/bacheca", (req, res) => {
    // dalla query string prendo il tag da filtrare
    const tagName = req.query.tags;
    // inizializzo postList con tutti i post
    let postList = [...allPosts.posts];

    //se è stato specificato un tag, filtro i post in base a quel tag
    if (tagName) {
        postList = allPosts.posts.filter((post) => {
            //filtro i post in base ai tag specificati
            return post.tags.includes(tagName.toLowerCase());
        });
        // se non ci sono post con il tag specificato restituisce un errore
        if (postList.length === 0) {
            postList = { Errore: `Nessun post contiene il tag ${(req.query.tags).toUpperCase()}` };
        }
    }
    // restituisco un oggetto json con i post filtrati e il conteggio dei post
    res.json({
        posts: postList,
        count: postList.length
    }
    );
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404 - Not Found</h1>');
});

//metto il server in ascolto su localhost alla porta 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});