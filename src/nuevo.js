//alert("probando agregar.ejs");

const nombre = document.forms[0].elements[0];
const email = document.forms[0].elements[1];

var btnAgregar = document.getElementById('btnAgregar');

btnAgregar.addEventListener('click', () => {
    window.location.href=`agregar/${nombre.value}/${email.value}`;
});