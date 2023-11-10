import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import User from '../models/User'
import {sequelize} from "../database/dbConnection";

const app: Express = express()

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app