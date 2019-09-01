import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

export default (app, dir) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(morgan('dev'))
    app.set('view engine', 'pug')
    app.set('views', `${dir}/views/`)
    app.use(express.static(`${dir}/public`))
}