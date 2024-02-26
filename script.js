let pawns = document.querySelectorAll('.pawn');
let selectedColor;

pawns.forEach(pawn => {
    pawn.addEventListener('click', ()=> {
        changeSelectedColor(pawn);
        selectedColor = pawn.id;
    })
});


function changeSelectedColor(colorPawn) {
    pawns.forEach(pawn => {
        pawn.style.opacity = "var(--transparancy)";
        if (pawn === colorPawn) {
            pawn.style.opacity = 1;
        }
    });
}