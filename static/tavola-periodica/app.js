const showCube = [
    [1, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, 2],
    [3, 4, false, false, false, false, false, false, false, false, false, false, 5, 6, 7, 8, 9, 10],
    [11, 12, false, false, false, false, false, false, false, false, false, false, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    [55, 56, false, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
    [87, 88, false, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
    [false, false, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, false],
    [false, false, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, false],
]

const row_of_atomic_number = [
    0, 17,
    0, 1, 12, 13, 14, 15, 16, 17,
    0, 1, 12, 13, 14, 15, 16, 17,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
]
   


const wrapper = document.getElementById("wrapper")

for (var i = 0; i < 9; i++) {
    var inner = ""

    if (i == 7)
        inner += "<div class='row space-top'>"
    else
        inner += "<div class='row'>"

    for (var j = 0; j < 18; j++) {
        if (showCube[i][j]) {
            const atomicNumber = showCube[i][j]
            const periodicTableElement = periodicTable[atomicNumber - 1]

            inner += `
            <div id="${atomicNumber}" draggable="true" onclick="show(${atomicNumber})" class='cube color-${periodicTableElement.color}'>
                <div class="cube-name">${periodicTableElement.name}</div>
                <div class="cube-atomicNumber">${periodicTableElement.atomicNumber}</div>
                <div class="cube-symbol">${periodicTableElement.symbol}</div>
                <div class="cube-atomicMass">${periodicTableElement.atomicMass}</div>
            </div>`
        }
        else {
            inner += "<div class='cube hide'></div>"
        }
    }

    inner += "</div>"
    
    wrapper.innerHTML += inner
}

let x_values = [ 560, 490, 420, 350, 280, 210, 140, 70, 0, 300, 300 - 70, 300 - 140, 300 - 210, 300 - 280, 300 - 350, 300 - 420, 300 - 490, 300 - 560 ]
function moveDescription(row) {
    document.getElementById("description").style.left = `calc(50vw - ${x_values[row]}px)`
}

function show(atomicNumber) {
    const row = row_of_atomic_number[atomicNumber - 1]
    console.log(row)

    if (row < 0 || row >= 18)
        return hide()

    const periodicTableElement = periodicTable[atomicNumber - 1]

    document.getElementById("description").classList.add("show")

    moveDescription(row)

    document.getElementById("left-arrow").onclick = () => show(atomicNumber - 1)
    document.getElementById("right-arrow").onclick = () => show(atomicNumber + 1)

    document.getElementById("description-atomic-number").innerHTML = periodicTableElement.atomicNumber
    document.getElementById("description-symbol").innerHTML = periodicTableElement.symbol
    document.getElementById("description-name").innerHTML = periodicTableElement.name
    document.getElementById("description-img").src = periodicTableElement.img

    document.getElementById("description-text").innerHTML = periodicTableElement.descrizione

    document.getElementById("classe").innerHTML = periodicTableElement.classe
    document.getElementById("numeroOssidazione").innerHTML = periodicTableElement.numeroOssidazione
    document.getElementById("atomicMass").innerHTML = periodicTableElement.atomicMass
    document.getElementById("tempFusione").innerHTML = periodicTableElement.tempFusione
    document.getElementById("tempEbollizione").innerHTML = periodicTableElement.tempEbollizione
    document.getElementById("raggioAtomico").innerHTML = periodicTableElement.raggioAtomico
    document.getElementById("densita").innerHTML = periodicTableElement.densita
    document.getElementById("annoScoperta").innerHTML = periodicTableElement.annoScoperta
    document.getElementById("elettronegativita").innerHTML = periodicTableElement.elettronegativita
}

function hide() {
    document.getElementById("description").classList.remove("show")
}


const dragElements = document.querySelectorAll('[draggable="true"]');
let id = undefined

dragElements.forEach(el => {
    el.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text/plain", event.target.id);
    })
});


const dropZone = document.getElementById("drop-zone")

dropZone.addEventListener("dragover", event => {
    event.preventDefault()
})

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();

    const draggedId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedId);

    // Controlliamo se l'elemento esiste nel DOM e ha l'attributo draggable
    if (draggedElement && draggedElement.getAttribute("draggable") === "true") {
        const clonedElement = draggedElement.cloneNode(true);
        clonedElement.removeAttribute("onclick");

        if (dropZone.innerHTML.trim() !== "") {
            const plusElement = document.createElement("div");
            plusElement.classList.add("plus");
            plusElement.innerHTML = "+";
            clonedElement.insertBefore(plusElement, clonedElement.firstChild);
            clonedElement.classList.add("space-for-plus");
        }

        dropZone.appendChild(clonedElement);
    }
});

// Impediamo il drag & drop di file o contenuti esterni
window.addEventListener("dragover", (event) => {
    event.preventDefault();
});

window.addEventListener("drop", (event) => {
    event.preventDefault();
});


function clearDropZone() {
    dropZone.innerHTML = "";
    result.innerHTML = "";
}

document.getElementById("clear-drop-zone").addEventListener("click", clearDropZone);



document.getElementById("arrow-container").addEventListener("click", () => {
    const lista_numeri = Array.from(dropZone.children).map(el => el.id).join(",")
    console.log(lista_numeri)

    if (lista_numeri === "") {
        alert("Inserisci almeno un elemento chimico")
        return
    }

    fetch("/intelligenza-artificiale-chat?user_prompt=" + JSON.stringify(lista_numeri))
        .then(async response => {
            response = await response.json()
            document.getElementById("result").innerHTML = response.message
        })
        .catch(async error => {
            alert("Errore nella richiesta")
            document.getElementById("result").innerHTML = error.message
        })
});