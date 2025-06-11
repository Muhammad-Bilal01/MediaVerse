import express from "express"

const app = express()

// parse application/json
// app.use()

app.post('/', (req, res) => {
    res.send(`Hello World!`);
});

const PORT = process.env || 4000

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});