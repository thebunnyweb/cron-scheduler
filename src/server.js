import express from 'express';
import shell from 'shelljs';
import constants from './config/constants';
import path from 'path';
import middlewares from './middlewares/'
import './config/firebase';
import firebase from 'firebase';
import {fetchJobs} from './middlewares/helpers'
import modules from './modules/routes';
import {masterJobScheduler} from './middlewares/helpers'

const app = express();
const port = constants.PORT;
const baseDir = path.resolve(__dirname, '');

middlewares(app, baseDir);
modules(app)


app.listen(port, (err)=>{
    if(!err) console.log(`App running on ${port}`)
    masterJobScheduler();
});