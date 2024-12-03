// importo express 
const express = require('express');
// specifico la porta
const PORT = 3000;
// creo una istanza del server
const app = express();

// deifinisco il percorso per gli asset statici
app.use(express.static("public"));

//const allPosts = require('./data/posts');
const postsRouter = require("./routers/posts");

// rotte
app.get('/', (req, res) => {
    res.send("Server del mio blog");
});

// rotte api
app.use("/posts", postsRouter);

// rotta di fallback
app.all('*', (req, res) => {
    res.status(404).send('<h1>Error 404 - Not Found</h1>');
});

//metto il server in ascolto su localhost alla porta 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});