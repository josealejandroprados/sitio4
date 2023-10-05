//importar mysql
const mysql = require('mysql2');

var conexion='';
var mensajeConexion ='';
//let todos =[];

const conectarBBDD = (host,puerto,BBDD,usuario,password) => {
    //crear instancia de conexion
    conexion = mysql.createConnection(
        {
            host: host,
            user: usuario,
            password: password,
            database: BBDD,
            port: puerto
        }
    );
}

const conectar = () => {
    conexion.connect(err => {
        if(err){
            mensajeConexion='Error';
        }
        else{
            console.log("conexion exitosa");
            mensajeConexion='Exito';
        }
    });
    return mensajeConexion;
}

let obtenerUsuarios = (res) => {
    const sql = 'SELECT * FROM usuarios';
    conexion.query(sql,(err,result) => {
        if(err){
            throw err
        }
        //console.log(result);
        res.render('home',{data: result});
    });
}

const agregar = (nombre, email,res) => {
    const sql = `INSERT INTO usuarios (id_usuario, email, nombre) VALUES (${null},"${email}","${nombre}")`;
    conexion.query(sql, (err) => {
        if(err) throw err
        console.log("insercion correcta");
        res.redirect('/home');
    });
}

const borrarUsuario = (id,res) => {
    const sql = `DELETE FROM usuarios WHERE id_usuario=${id}`;
    conexion.query(sql, (err) => {
        if(err) throw err
        console.log("usuario eliminado correctamente");
        res.redirect('/home');
    });
}

let obtenerUsuario = (id,res) => {
    const sql = `SELECT * FROM usuarios WHERE id_usuario=${id}`;

    conexion.query(sql, (err, result) => {
        if(err){
            throw err
        }
        //console.log(result);
        //res.send('works cajeta modificar');
        res.render('modificar',{data: result});
    });
}

const modificarUsuario = (id,nombre,email,res) => {
    
    conexion.query(`UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE id_usuario='${id}'`, (err) => {
        if (err) throw err;
        console.log("modificacion exitosa");
        res.redirect('/home');
    });
}

const terminarConexion = () => {
    conexion.end();
}

module.exports = {conectarBBDD, conectar, obtenerUsuarios, agregar,
                borrarUsuario, obtenerUsuario, modificarUsuario, terminarConexion};