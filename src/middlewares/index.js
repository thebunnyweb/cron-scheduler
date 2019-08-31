import express from 'express';

export default (app, dir) => {
    app.set('view engine', 'pug')
    app.set('views', `${dir}/views/`)
    app.use(express.static(`${dir}/public`))
}