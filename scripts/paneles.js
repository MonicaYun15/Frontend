let x = document.querySelectorAll('.panel');
for (let i = 0; i < x.length; i++) {
    x[i].addEventListener('click', function () {
        x[i].classList.toggle('abierto');
        x[i].classList.add('clicked');
        
        setTimeout(() => {
            x[i].classList.remove('clicked');
        }, 300); // Tiempo de la animación de reducción de tamaño (0.3s)
    });

    x[i].addEventListener('mouseover', function () {
        x[i].classList.add('dimgray');
    });

    x[i].addEventListener('mouseout', function () {
        if (x[i].classList.contains('dimgray')) {
            x[i].classList.remove('dimgray');
        }
    });
}
