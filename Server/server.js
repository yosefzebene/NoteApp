import Express from "express";

const app = Express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('I am a note app');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
