let correctRow;
let correctCol;
let mainNumber;
let invertedNumber;
const timeLimit = 10;

function generateNumber() {
    let num;
    do {
        num = Math.floor(Math.random() * 90) + 10; // Número aleatorio de dos dígitos
    } while (String(num)[0] === String(num)[1]); // Asegurarse de que los dígitos no sean iguales
    return num;
}

function invertNumber(num) {
    return parseInt(num.toString().split('').reverse().join(''));
}

function setupGame() {
    const board = document.getElementById("game-board");
    board.innerHTML = ""; // Limpiar el tablero

    mainNumber = generateNumber();
    invertedNumber = invertNumber(mainNumber);
    
    // Generar posiciones para el número invertido en el cuadrado
    correctRow = Math.floor(Math.random() * 5);
    correctCol = Math.floor(Math.random() * 5);

    // Llenar el cuadrado con el número principal
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = (i === correctRow && j === correctCol) ? invertedNumber : mainNumber;
            board.appendChild(cell);
        }
    }

    // Iniciar el temporizador
    startTimer();
}

let timer;
function startTimer() {
    let timeLeft = timeLimit;
    const message = document.getElementById("message");
    message.textContent = `Tienes ${timeLeft} segundos para encontrar el número invertido.`;

    timer = setInterval(() => {
        timeLeft--;
        message.textContent = `Tienes ${timeLeft} segundos para encontrar el número invertido.`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            message.textContent = "Se acabó el tiempo. ¡Inténtalo de nuevo!";
            document.getElementById("submit").disabled = true;
        }
    }, 1000);
}

document.getElementById("submit").addEventListener("click", () => {
    const rowInput = document.getElementById("row").value - 1; // Convertir a índice basado en 0
    const colInput = document.getElementById("col").value - 1; // Convertir a índice basado en 0

    clearInterval(timer); // Detener el temporizador
    const message = document.getElementById("message");

    if (rowInput === correctRow && colInput === correctCol) {
        message.textContent = "¡Correcto! Has encontrado el número invertido a tiempo.";
    } else {
        message.textContent = `Incorrecto. El número invertido estaba en la fila ${correctRow + 1} y la columna ${correctCol + 1}.`;
    }
    
    document.getElementById("restart").style.display = "block";
    document.getElementById("submit").disabled = true; // Desactivar el botón de envío
});

document.getElementById("restart").addEventListener("click", () => {
    setupGame();
    document.getElementById("restart").style.display = "none";
    document.getElementById("submit").disabled = false; // Habilitar el botón de envío
});

// Iniciar el juego al cargar
setupGame();