let code = ['black', 'yellow', 'yellow', 'red'];

let colors = document.querySelectorAll('.colorselection');
let selectedColor;

let rows = document.querySelectorAll(".row");
rows = [...rows].reverse();
let placeholders;

startGame()

function startGame() {
    colorSelection();
    confirmFilledRow();
    placeholders = checkActiveRow(0).querySelectorAll('.attempt .placeholder');
    changeColorsOnActiveRow();

    let button = document.querySelector('button')
    button.addEventListener("click", ()=> {
        if (checkForFullRow()) {
            console.log(checkForFullRow())
        }
    })
}

function colorSelection() {
    colors.forEach(pawn => {
        pawn.addEventListener('click', ()=> {
            changeSelectedColor(pawn);
            selectedColor = pawn.id;
        })
    });
}

function changeSelectedColor(colorPawn) {
    colors.forEach(pawn => {
        pawn.classList.remove("selected");
        if (pawn === colorPawn) {
            pawn.classList.add("selected");
        }
    });
}

function confirmFilledRow() {
    rows.forEach(row => {
        row.played = false;
        if (checkActiveRow(0) === row) {
            let confirm = row.querySelector('.confirm');
            confirm.innerHTML = "<button>ok</button>";
        }
    });
}

function checkActiveRow(i) {
    if (rows[i].played === false) {
        return rows[i];
    } else {
        checkActiveRow(i+1);
    }
}

function changeColorsOnActiveRow() {
    placeholders.forEach(placeholder => {
        placeholder.addEventListener("click", ()=> {
            if (selectedColor) {
                placeholder.className = 'pawn ' + selectedColor;
                placeholder.color = selectedColor;
            }
        })   
         
    });
}




function checkForFullRow() {
    let code = [null, null, null, null]
    for (let i = 0; i < placeholders.length; i++) {
        if (placeholders[i].color) {
            code[i] = placeholders[i].color;
        }
    }

    if (!code.includes(null)) {
        return code
    } else {
        return false
    }
}