let x = document.querySelectorAll('.tecla');
for (let i = 0; i < x.length; i++) {
    x[i].addEventListener('mouseover', function () {
        x[i].classList.add('lapislazuli');
    });

    x[i].addEventListener('mouseout', function () {
        if (x[i].classList.contains('lapislazuli')) {
            x[i].classList.remove('lapislazuli');
        }
    });
    
}

document.addEventListener('keydown', (event)=>{
    const key = event.key.toUpperCase();
    const keyDiv = document.querySelector(`.tecla[tecla="${key}"]`);

    if (keyDiv){
        const soundFile = keyDiv.getAttribute('sound');
        const audio = new Audio(soundFile)
        audio.play();
    }
});

