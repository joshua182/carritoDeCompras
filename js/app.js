// variables
const carrito = document.querySelector('.carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito');
const listarCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //cuando agrgas un curso precionando "Agragar al carrito"
listarCursos.addEventListener('click', agregarCurso);

//Elimina cursos del carrito
carrito.addEventListener('click', eliminarCurso); 
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }    
}

// Elimina un cusro del carrito
function eliminarCurso(e) {
     if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo articulosCarrito por el id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //irera sobre el carrito y muestra el html
    }
}


//Lee el HTML al que se le dio click y extrae la informacion del curso
function leerDatosCurso(curso){


//Crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }

    //Revisa si un articulo ya se encuentra en el carrito
    const existe = articulosCarrito.some(curso => curso.id ===infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id ===infoCurso.id){
                curso.cantidad++;
                return curso;// Retorna el objeto actualizado
            }else{
                return curso;// Retorna los objetos que no estan duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Agrega elemtos al arreglo de articulosCarrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    }    

    console.log(articulosCarrito);
    
    //manda llamar carritoHTML
    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpia el html
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        const { imagen, titulo, precio, cantidad, id } = curso;

        row.innerHTML = `
        <td><img src="${imagen}" width = "100"> </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
       //Agrega el HTML del carrito en el tbody
       contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma rapida de eliminar HTML
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
