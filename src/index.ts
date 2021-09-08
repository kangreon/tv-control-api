import express from 'express'
import cors from 'cors';
import {mainRouter} from "./routes";

const app = express()
const port = 5000;

app.use(cors());

app.use(mainRouter);

app.get('/', (req, res) => {
    res.status(200).send()
});

app.listen(port, () => console.log(`Running on port ${port}`))
