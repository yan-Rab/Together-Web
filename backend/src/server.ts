import express, { urlencoded } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({extended: true}));

app.use(morgan('dev'));
app.use('/tmp', express.static(path.resolve(__dirname, '..','temp')));
app.use(routes);
app.listen(3333);