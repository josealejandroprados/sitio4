//importamos express
const express = require('express');
//creamos un metodo router
const router = express.Router();

//variables globales
var mensajeConexion='';



//importar funciones de conexion a database
const {conectarBBDD, conectar, consultaLogin, obtenerUsuarios, agregar,borrarUsuario,
    obtenerUsuario, modificarUsuario, terminarConexion, registrarUser} = require('../mysql-conector.js');

router.get('/', (req,res) => {
    //res.send('viva yo');
    res.render('login');
});

router.post('/login', (req,res) => {
    const user = {
        usuario: req.body.usuario,
        password: req.body.password
    };

    conectarBBDD();
    conectar();

    consultaLogin(user.usuario,user.password,res);
});


router.get('/registrarse', (req,res) => {
    res.render('registro');
});

router.post('/registrar', (req,res) => {

    conectarBBDD();
    conectar();

    const newUser = {
        usuario: req.body.usuario,
        password: req.body.password
    };
    

    registrarUser(newUser.usuario,newUser.password,res);

});

router.get('/home', (req,res) => {
    obtenerUsuarios(res);
});

router.get('/nuevo', (req,res) => {
    res.render('nuevo');
});

// router.post('/agregar/:nombre/:email', (req,res) => {
router.post('/agregar', (req,res) => {
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