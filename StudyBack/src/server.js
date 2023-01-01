const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())

app.use(express.urlencoded({
    extended:false
}));

app.use(express.json());

var UsuarioRouter = require('./controllers/usuario');

app.use('/usuario',UsuarioRouter);

var url='mongodb://127.0.0.1:27017/DBHUB';

mongoose.connect(url,{
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('open', _ => {
    console.log('DB connect',url);
});

db.on('error', err => {
    console.log(err);
});

app.listen(5000, () => {
    console.log('ok');
});