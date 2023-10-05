//importamos express
const express = require('express');
//creamos un metodo router
const router = express.Router();

//variables globales
var mensajeConexion='';



//importar funciones de conexion a database
const {conectarBBDD, conectar, obtenerUsuarios, agregar, borrarUsuario, obtenerUsuario, modificarUsuario, terminarConexion} = require('../mysql-conector.js');

router.get('/', (req,res) => {
    //res.send('viva yo');
    res.render('index1');
});

router.get('/conexionBD/:host/:puerto/:BBDD/:usuario/:password', (req,res) => {
    
    let host = req.params.host;
    let puerto = req.params.puerto;
    let BBDD = req.params.BBDD;
    let usuario = req.params.usuario;
    let password = req.params.password;
    
    console.log(host,puerto,BBDD,usuario,password);

    conectarBBDD(host,puerto,BBDD,usuario,password);
    mensajeConexion=conectar();
    console.log(mensajeConexion);
    res.redirect('/home');
    /*
    if(mensajeConexion=='Exito'){
        res.redirect('/home');
    }
    else{
        res.redirect('/');
    }*/
});

router.get('/home', (req,res) => {
    obtenerUsuarios(res);
});

router.get('/nuevo', (req,res) => {
    res.render('nuevo');
});

// router.post('/agregar/:nombre/:email', (req,res) => {
router.post('/agregar', (req,res) => {
    //let nombre = req.params.nombre;
    //let email = req.params.email;
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email
    };

    //console.log(nombre,email);

    agregar(usuario.nombre,usuario.email,res);
});

router.get('/borrar/:id', (req,res) => {
    let id = req.params.id;

    //console.log(id);
    borrarUsuario(id,res);
});

router.get('/editar/:id', (req,res) => {
    let id = req.params.id;
    
    //console.log(id);
    obtenerUsuario(id,res);
});

router.post('/update/:id', (req,res) => {
    const {id} = req.params;
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email
    }

    //console.log(id);
    //console.log(usuario.nombre);
    //res.send('works cajeta ura');
    modificarUsuario(id,usuario.nombre,usuario.email,res);
});

router.get('/salir', (req,res) => {
    terminarConexion();
    res.redirect('/');
});

module.exports = router;