let code = ['black', 'yellow', 'yellow', 'red'];

let colors = document.querySelectorAll('.colorselection');
let selectedColor;

let rows = document.querySelectorAll(".row");
rows = [...rows].reverse();
rows.forEach(row => {
    row.played = false;
})

let placeholders;

game();

function game() {
    round(); 
}

function round() {
    selectColor();
    drawConfirmationButton();
    placePawn();

    let button = document.querySelector('button')
    button.addEventListener("click", ()=> {
        if (checkForFullRow()) {
            let givenAnswer = checkForFullRow();
            let tips = [];

            for (let i = 0; i < code.length; i++) {
                if (code[i] === givenAnswer[i]) {
                    tips.push("black");
                    givenAnswer[i] = "check";
                } else {
                    for (let j = 0; j < code.length; j++) {
                        if (code[i] === givenAnswer[j]) {
                            tips.push("white")
                            givenAnswer[j] = "check";
                            j = code.length;
                        }
                    }
                } 
            }

            console.log(givenAnswer);
            console.log(tips)
            tips.sort((a, b) => (a === 'black') ? -1 : 1);

            console.log(tips)

            drawTips(tips);

            if (tips[3] === 'black') {
                showAnswer();
                return console.log("you won!");
            }

            checkActiveRow(0).played = true;
            return round();
        }
    })
}

function selectColor() {
    colors.forEach(color => {
        color.addEventListener('click', ()=> {
            changeSelectedColor(color);
            selectedColor = color.id;
        })
    });
}

function changeSelectedColor(selectedColor) {
    colors.forEach(color => {
        color.classList.remove("selected");
        if (color === selectedColor) {
            color.classList.add("selected");
        }
    });
}

function drawConfirmationButton() {
    rows.forEach(row => {
        let confirm = row.querySelector('.confirm');
        let number = row.querySelector('.rownumber');
        confirm.innerHTML = null;
        if (checkActiveRow(0) === row) {
            number.style.fontWeight = 'bold';
            number.style.color = 'black';

            confirm.innerHTML = "<button>✓</button>";
        }
    });
}

function checkActiveRow(i) {
    if (rows[i].played === false) {
        return rows[i];
    } else {
        return checkActiveRow(i+1);
    }
}

function placePawn() {
    if (placeholders) {
        placeholders.forEach(placeholder => {
            placeholder.removeEventListener("click", colorPawn);            
        });
    }

    placeholders = checkActiveRow(0).querySelectorAll('.attempt .placeholder');
    console.log(placeholders)
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener("click", colorPawn)   
         
    });
}

function colorPawn(e) {
    if (selectedColor) {
        e.target.className = 'pawn ' + selectedColor;
        e.target.color = selectedColor;
    }
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

function drawTips(tips) {
    let tipPlaceholders = checkActiveRow(0).querySelectorAll('.result .placeholder');
    for (let i = 0; i < tipPlaceholders.length; i++) {
        const placeholder = tipPlaceholders[i];
        if (tips[i] === 'black') {
            placeholder.style.width = 'calc(var(--dimension) / 6)';
            placeholder.style.height = 'calc(var(--dimension) / 6)';
            placeholder.style.margin = 'calc(var(--dimension) / 6)';
            placeholder.style.backgroundColor = "var(--black)";
            placeholder.style.border = "1px solid var(--gravings)"
        } else if(tips[i] === "white") {
            placeholder.style.width = 'calc(var(--dimension) / 6)';
            placeholder.style.height = 'calc(var(--dimension) / 6)';
            placeholder.style.margin = 'calc(var(--dimension) / 6)';
            placeholder.style.backgroundColor = "var(--white)";
            placeholder.style.border = "1px solid var(--gravings)"
        }
    }
}

function showAnswer(){
    let answer = document.querySelectorAll('.answer');
    for (let i = 0; i < answer.length; i++) {
        answer[i].style.display = 'initial';
        answer[i].style.backgroundColor = 'var(--' + code[i] + ')';
        
    }
}
