
function agregarIngrediente(ingrediente, ingredientes) {
    return new Promise((resolve, reject) => {
        if (!ingrediente) {
            reject("¡El ingrediente no puede estar vacío!");
        } else if (ingredientes.includes(ingrediente)) {
            reject(`El ingrediente ${ingrediente} ya ha sido agregado.`);
        } else {
            ingredientes.push(ingrediente);
            resolve(ingredientes);
        }
    });
}

// Función para crear una pizza y devolver una promesa
function hacerPizza(ingredientes) {
    return new Promise((resolve, reject) => {
        //if (ingredientes.includes('piña')) {
          //  setTimeout(() => {
            //    reject('🍍....POOOOR?');
            //}, 500); // Si hay piña, la promesa se rechaza después de 500ms
        //}

        setTimeout(() => {
            resolve(`Aquí está tu pizza 🍕 con ${ingredientes.join(', ')}`);
        }, 1000); // Si todo es correcto, la pizza se hace en 1 segundo
    });
}

function mostrarImagenesPizza(ingredientes) {
    return new Promise((resolve, reject) => {
        const contenedorImagenes = document.getElementById('imagenesPizzas');
        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.classList.add('pedido');

        if (ingredientes.includes('piña')) {
            nuevoContenedor.innerHTML += `<img class="imagen-pizza" src="./assets/img/piña.jpeg" alt="Pizza Hawaiana">`;
        } else if (ingredientes.includes('carne') && ingredientes.includes('cebolla')) {
            nuevoContenedor.innerHTML += `<img class="imagen-pizza" src="./assets/img/suprema.jpg" alt="Pizza Suprema">`;
        } else if (ingredientes.includes('pepperoni') && !ingredientes.includes('carne') && !ingredientes.includes('cebolla')) {
            nuevoContenedor.innerHTML += `<img class="imagen-pizza" src="./assets/img/peperoni.jpeg" alt="Pizza Pepperoni">`;
        } else {
            nuevoContenedor.innerHTML += `<img class="imagen-pizza" src="./assets/img/nodisp.png" alt="Pizza Default">`;
        }

        contenedorImagenes.appendChild(nuevoContenedor);
        resolve("Imagen mostrada correctamente.");
    });
}

function mostrarError(err) {
    const errorMessage = document.getElementById('errorMessage');
    const mensajeError = document.getElementById('mensajeError');
    errorMessage.style.display = 'block';
    mensajeError.textContent = `¡Error en tu orden! ${err}`;
}

let ingredientesPizza = [];

document.getElementById('agregarIngrediente').addEventListener('click', function() {
    const ingredienteInput = document.getElementById('ingrediente');
    const ingrediente = ingredienteInput.value.trim().toLowerCase();

    agregarIngrediente(ingrediente, ingredientesPizza)
        .then((ingredientesActualizados) => {
            ingredienteInput.value = '';
            console.log(`Ingrediente agregado: ${ingrediente}`);
            console.log(ingredientesActualizados);  
        })
        .catch((error) => {
            console.log(error); 
            alert(error);  
        });
});

document.getElementById('realizarPedido').addEventListener('click', function() {
    if (ingredientesPizza.length === 0) {
        alert('¡Primero agrega un ingrediente!');
        return;
    }

    hacerPizza(ingredientesPizza)
        .then((mensaje) => {
            console.log(mensaje);  
            return mostrarImagenesPizza(ingredientesPizza); 
        })
        .then(() => {
            console.log("Pedido completado exitosamente");
            ingredientesPizza = []; 
        })
        .catch((err) => {
            mostrarError(err);  
            ingredientesPizza = []; 
        });
});
