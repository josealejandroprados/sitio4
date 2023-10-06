//importar mysql
const mysql = require('mysql2');
//importamos parametros de conexion a la BBDD
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = require('./config.js');

var conexion='';

const conectarBBDD = () => {
    //crear instancia de conexion
    conexion = mysql.createConnection(
        {
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            port: DB_PORT
        }
    );
}

const conectar = () => {
    conexion.connect(err => {
        if(err){
            //console.error(err);
        }
        else{
            //console.log("conexion exitosa a la base de datos");
        }
    });
}

const consultaLogin = (usuario,password,res) => {
    const sql = `SELECT * FROM login WHERE usuario='${usuario}' AND password='${password}'`;

    conexion.query(sql, (err,resultado) => {
        
        if(err){
            //console.error(err);
        }
        else if(resultado.length==0){
            //si el resultado es vacio => error
            res.render('errorlogin',{mensaje: 'Error!, Verifique su usuario y contraseña!'});
        }
        else if(resultado.length==1){
            //si obtenemos un resultado => renderizar vista
            //console.log('login exitoso');
            const u = Object.values(resultado[0].usuario).join('');
            res.render('mensajeRedireccion',{mensaje: 1, usuario: u});
        }
    });
}

const registrarUser = (usuario, password,res) => {
    //console.log(usuario,password);
    const sql = `INSERT INTO login (id_usuario, usuario, password) VALUES (${null},"${usuario}","${password}")`;
    conexion.query(sql, (err) => {
        if(err) throw err
        //console.log("registro exitoso");

        conexion.end();//terminar conexion

        res.render('mensajeRedireccion',{mensaje: 2, usuario: usuario});
    });
}

let obtenerUsuarios = (res) => {
    const sql = 'SELECT * FROM usuarios';
    conexion.query(sql,(err,result) => {
        if(err){
            //throw err
        }
        //console.log(result);
        res.render('home',{data: result});
    });
}

const agregar = (nombre, email,res) => {
    const sql = `INSERT INTO usuarios (id_usuario, email, nombre) VALUES (${null},"${email}","${nombre}")`;
    conexion.query(sql, (err) => {
        if(err) throw err
        //console.log("insercion correcta");
        res.render('mensajeRedireccion',{mensaje: 3, usuario: ''});
    });
}

const borrarUsuario = (id,res) => {
    const sql = `DELETE FROM usuarios WHERE id_usuario=${id}`;
    conexion.query(sql, (err) => {
        if(err){
            //throw err
        }
        //console.log("usuario eliminado correctamente");
        res.render('mensajeRedireccion',{mensaje: 5, usuario: ''});
    });
}

let obtenerUsuario = (id,res) => {
    const sql = `SELECT * FROM usuarios WHERE id_usuario=${id}`;

    conexion.query(sql, (err, result) => {
        if(err){
            //throw err
        }
        //console.log(result);
        //res.send('works cajeta modificar');
        res.render('modificar',{data: result});
    });
}

const modificarUsuario = (id,nombre,email,res) => {
    
    conexion.query(`UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE id_usuario='${id}'`, (err) => {
        if (err){
            //throw err;
        }
        //console.log("modificacion exitosa");
        res.render('mensajeRedireccion',{mensaje: 4, usuario: ''});
    });
}

const terminarConexion = () => {
    conexion.end();
}

module.exports = {
    conectarBBDD,
    conectar,
    obtenerUsuarios,
    agregar,
    consultaLogin,
    registrarUser,
    borrarUsuario,
    obtenerUsuario,
    modificarUsuario,
    terminarConexion
};