import express from 'express';
import shell from 'shelljs';
import constants from './config/constants';
import path from 'path';
import middlewares from './middlewares/'
import {fetchJobs} from './middlewares/helpers';

const app = express();
const port = constants.PORT;
const baseDir = path.resolve(__dirname, '');

middlewares(app, baseDir);

app.get('/', (req,res)=>{
    res.render('index', {title: 'Hello'})
});

app.listen(port, (err)=>{
    if(!err) console.log(`App running on ${port}`)
});