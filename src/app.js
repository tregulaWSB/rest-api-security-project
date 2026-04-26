const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.send("Test")
})

app.listen(80, () => console.log(`App is listening on http://localhost:80`));