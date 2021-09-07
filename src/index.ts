import express from 'express'
import {mainRouter} from "./routes";

const app = express()
const port = 5000;

app.use(mainRouter);

app.get('/', (req, res) => {
    res.status(200).send()
});

app.listen(port, () => console.log(`Running on port ${port}`))