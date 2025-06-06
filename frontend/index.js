
const button = document.getElementById('btnCargarLibros')
const listaLibros = document.getElementById('listaLibros')
const buttonForm = document.getElementById('btnForm')
const buttonCrearLibro = document.getElementById('btnGuardar')
const buttonSearch = document.getElementById('btnSearch')

const obtenerLibros = async () => {

    const url = 'http://localhost:3000/api/libros/'

    const pacientes = await fetch(url, {
        method: 'GET',
    })

    const data = pacientes.json();

    return data;

}

const eliminarLibro = async (id) => {

    const url = `http://localhost:3000/api/libros/${id}`

    await fetch(url, {
        method: 'DELETE',
    })

}

const modificarLibro = async (id, nuevoAutor) => {

    const url = `http://localhost:3000/api/libros/${id}`;
        
    await fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ autor: nuevoAutor })
    });

}

const mostrarFormulario = () => {

    document.getElementById('formulario').style.display = 'block';

}

const crearLibro = async () => {

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const anio = parseInt(document.getElementById("anio").value);

    if (titulo === null || titulo.trim() === '' || autor === null || autor.trim() === '' || isNaN(anio) || anio <= 0){

        alert('Los 3 campos deben ser completados obligatoriamente')

    } else{

        const nuevoLibro = {titulo, autor, anio}

        const url = `http://localhost:3000/api/libros/`
    
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nuevoLibro)
        })
    
        document.getElementById('formulario').style.display = 'none';

    }

}

const buscarLibro = async () => {

    const titulo = document.getElementById('search').value

    const url = `http://localhost:3000/api/libros?search=${titulo}`;

    const data = await fetch(url, {
        method: 'GET',
    })
    
    const libros = await data.json()

    if (libros) {
        let cuerpo = '';

        libros.forEach(libro => {
            cuerpo += `
                <tr>
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.anio}</td>
                    <td><button class="btn btn-primary btn-modificar" data-id="${libro.id}">Modificar</button></td>
                    <td><button class="btn btn-danger btn-eliminar" data-id="${libro.id}">Eliminar</button></td>
                </tr>
            `;
        });

        const tabla = `
            <table class="table text-center table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Año de publicación</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    ${cuerpo}
                </tbody>
            </table>
        `

        listaLibros.innerHTML = tabla

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                eliminarLibro(id);
            });
        });

        document.querySelectorAll('.btn-modificar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nuevoAutor = prompt('Ingrese el nuevo autor del libro:');
                if (nuevoAutor !== null && nuevoAutor.trim() !== '') {
                    modificarLibro(id, nuevoAutor)
                }
            })
        })
    }

}

const mostrarLibros = async () => {

    const libros = await obtenerLibros();

    if (libros) {

        let cuerpo = '';

        libros.forEach(libro => {
            cuerpo += `
                <tr>
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.anio}</td>
                    <td><button class="btn btn-primary btn-modificar" data-id="${libro.id}">Modificar</button></td>
                    <td><button class="btn btn-danger btn-eliminar" data-id="${libro.id}">Eliminar</button></td>
                </tr>
            `;
        });

        const tabla = `
            <table class="table text-center table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Año de publicación</th>
                        <th>Modificar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    ${cuerpo}
                </tbody>
            </table>
        `

        listaLibros.innerHTML = tabla

        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                eliminarLibro(id);
            });
        });

        document.querySelectorAll('.btn-modificar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const nuevoAutor = prompt('Ingrese el nuevo autor del libro:');
                if (nuevoAutor === null || nuevoAutor.trim() === '') {
                    alert('El nombre del autor no puede estar vacío.');
                } else {
                    modificarLibro(id, nuevoAutor);
                }
            })
        })

    }
}




const main = () => {

    button.addEventListener('click', mostrarLibros)

    buttonForm.addEventListener('click', mostrarFormulario)

    buttonCrearLibro.addEventListener('click', crearLibro)

    buttonSearch.addEventListener('click', (e) => {
        e.preventDefault();
        buscarLibro();
    })

}

main();