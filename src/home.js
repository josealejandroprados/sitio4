
var tabla = document.getElementById('tabla'),
    elementosTabla = tabla.rows,
    btnNuevo = document.getElementById('btnNuevo')
    btnModificar = document.getElementById('btnModificar'),
    btnEliminar = document.getElementById('btnEliminar'),
    btnSalir = document.getElementById('btnSalir'),
    ID='';

var n = tabla.rows.length;

function getI(id,k){
    //console.log(id);
    this.ID=id;

    for(var i=0; i<n; i++){
        if(i==k+1){
            elementosTabla[i].setAttribute("class","table-active");
        }
        else{
            elementosTabla[i].setAttribute("class","");
        }
    }
    //console.log(elementosTabla[k+1]);
};

btnNuevo.addEventListener('click', () => {
    window.location.href='/nuevo';
});

btnEliminar.addEventListener('click', () => {
    if(this.ID==''){
        alert('¡Seleccione el usuario a eliminar!');
    }
    else{
        //Ingresamos un mensaje de confirmacion de eliminar
        var mensaje = confirm("¿Esta seguro que desea eliminar el usuario?");
        //Detectamos si el usuario acepto eliminar el usuario
        if (mensaje) {
            window.location.href=`/borrar/${ID}`;
        }
    }
    //console.log('borrar');
});

btnModificar.addEventListener('click', () => {
    if(this.ID==''){
        alert('¡Seleccione el usuario a modificar!');
    }
    else{
        window.location.href=`/editar/${ID}`;
    }
    //console.log('Modificar');
});

btnSalir.addEventListener('click', () => {
    alert('Hasta la Proxima, que tengas un excelente dia =)');
    //window.location.href=`/salir`;
});