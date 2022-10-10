/* PASAPALABRA
Tu juego debería hacer una pregunta por cada letra del alfabeto, al final del juego, 
y habiendo respondido todas las letras, deberá indicarle al usuario cuantas letras ha fallado y cuantas ha acertado. 
Si el usuario responde con "pasapalabra" el juego deberá estar preparado para entender que en ese momento,
el usuario no responderá esa pregunta, y no estará acertada ni fallada, la dejará para la siguiente ronda. 
El juego deberá, cuando finalize, mostrar un ranking de usuarios con el nombre y ordenados por cantidad de letras acertadas. */

// DECLARE VARIABLES

let points = 0
let wrongAnswers = 0
let userName
let currentPositionLetter = 0
let listOfWords
const maxTime = 240
let timeLeft = maxTime

const rankingOfPlayers = [{ name: "default_player", points: 05 }]
const questions = [
  {
    letter: "a",
    answer: ["abducir", "abrir"],
    status: 0,
    question: [
      `CON LA A.</br> Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien`,
      "CON LA A.</br> Descubrir o hacer patente lo que está cerrado u oculto",
    ],
  },
  {
    letter: "b",
    answer: ["bingo", "bailar"],
    status: 0,
    question: [
      "CON LA B.</br> Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso",
      "CON LA B.</br> Ejercicio físico que consiste en el movimiento de las piernas y los pies al ritmo de la música",
    ],
  },
  {
    letter: "c",
    answer: ["churumbel", "casa"],
    status: 0,
    question: [
      "CON LA C.</br> Niño, crío, bebé",
      "CON LA C.</br> Edificio destinado a vivienda",
    ],
  },
  {
    letter: "d",
    answer: ["diarrea", "dormir"],
    status: 0,
    question: [
      "CON LA D.</br> Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida",
      "CON LA D.</br> Descansar en el sueño",
    ],
  },
  {
    letter: "e",
    answer: ["ectoplasma", "escuchar"],
    status: 0,
    question: [
      "CON LA E.</br> Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación",
      "CON LA E.</br> Oír con atención",
    ],
  },
  {
    letter: "f",
    answer: ["fácil", "frío"],
    status: 0,
    question: [
      "CON LA F.</br> Que no requiere gran esfuerzo, capacidad o dificultad",
      "CON LA F.</br> Que no tiene calor",
    ],
  },
  {
    letter: "g",
    answer: ["galaxia", "gritar"],
    status: 0,
    question: [
      "CON LA G.</br> Conjunto enorme de estrellas, polvo interestelar, gases y partículas",
      "CON LA G.</br> Levantar la voz más de lo acostumbrado",
    ],
  },
  {
    letter: "h",
    answer: ["harakiri", "hacer"],
    status: 0,
    question: [
      "CON LA H.</br> Suicidio ritual japonés por desentrañamiento",
      "CON LA H.</br> Realizar una acción",
    ],
  },
  {
    letter: "i",
    answer: ["iglesia", "ir"],
    status: 0,
    question: [
      "CON LA I.</br> Templo cristiano",
      "CON LA I.</br> Moverse de un lugar a otro",
    ],
  },
  {
    letter: "j",
    answer: ["jabalí", "jugar"],
    status: 0,
    question: [
      "CON LA J.</br> Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba",
      "CON LA J.</br> Practicar un juego",
    ],
  },
  {
    letter: "k",
    answer: ["kamikaze", "kilo"],
    status: 0,
    question: [
      "CON LA K.</br> Persona que se juega la vida realizando una acción temeraria",
      "CON LA K.</br> Unidad de masa del sistema internacional",
    ],
  },
  {
    letter: "l",
    answer: ["licántropo", "levadura"],
    status: 0,
    question: [
      "CON LA L.</br> Hombre lobo",
      "CON LA L.</br> Masa constituida por ciertos hongos unicelulares, capaz de fermentar el cuerpo con que se mezcla",
    ],
  },
  {
    letter: "m",
    answer: ["misántropo", "madrid"],
    status: 0,
    question: [
      "CON LA M.</br> Persona que huye del trato con otras personas o siente gran aversión hacia ellas",
      "CON LA M.</br> Capital de España",
    ],
  },
  {
    letter: "n",
    answer: ["necedad", "nariz"],
    status: 0,
    question: [
      "CON LA N.</br> Demostración de poca inteligencia",
      "CON LA N.</br> Sentido del olfato. ",
    ],
  },
  {
    letter: "ñ",
    answer: ["señal", "puñal"],
    status: 0,
    question: [
      "CONTIENE LA Ñ.</br> Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.",
      "CONTIENE LA Ñ.</br> Arma de acero, de 20 a 30 cm de largo, que solo hiere con la punta",
    ],
  },
  {
    letter: "o",
    answer: ["orco", "oso"],
    status: 0,
    question: [
      "CON LA O.</br> Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien",
      "CON LA O.</br> Mamífero carnívoro plantígrado, de gran tamaño, de pelaje pardo, largo y espeso",
    ],
  },
  {
    letter: "p",
    answer: ["protoss", "pilates"],
    status: 0,
    question: [
      "CON LA P.</br> Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft",
      "CON LA P.</br> Método gimnástico que aúna el ejercicio corporal con el control mental, basado en la respiración y la relajación",
    ],
  },
  {
    letter: "q",
    answer: ["queso", "quieto"],
    status: 0,
    question: [
      "CON LA Q.</br> Producto obtenido por la maduración de la cuajada de la leche",
      "CON LA Q.</br> Que no tiene o no hace movimiento.",
    ],
  },
  {
    letter: "r",
    answer: ["ratón", "repetir"],
    status: 0,
    question: [
      "CON LA R.</br> Roedor",
      "CON LA R.</br> Volver a hacer lo que se había hecho, o decir lo que se había dicho",
    ],
  },
  {
    letter: "s",
    answer: ["stackoverflow", "salud"],
    status: 0,
    question: [
      "CON LA S.</br> Comunidad salvadora de todo desarrollador informático",
      "CON LA S.</br> Estado de bienestar físico y mental",
    ],
  },
  {
    letter: "t",
    answer: ["terminator", "tirar"],
    status: 0,
    question: [
      "CON LA T.</br> Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984",
      "CON LA T.</br> Echar o lanzar algo con violencia",
    ],
  },
  {
    letter: "u",
    answer: ["unamuno", "urano"],
    status: 0,
    question: [
      "CON LA U.</br> Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914",
      "CON LA U.</br> Séptimo planeta del sistema solar,",
    ],
  },
  {
    letter: "v",
    answer: ["vikingos", "viento"],
    status: 0,
    question: [
      "CON LA V.</br> Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa",
      "CON LA V.</br> Movimiento de aire que se produce por la diferencia de temperatura entre dos zonas",
    ],
  },
  {
    letter: "w",
    answer: ["sandwich", "washington"],
    status: 0,
    question: [
      "CONTIENE LA W.</br> Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso",
      "CONTIENE LA W.</br> Ciudad de los Estados Unidos situada en el estado de Columbia",
    ],
  },
  {
    letter: "x",
    answer: ["botox", "xilófono"],
    status: 0,
    question: [
      "CONTIENE LA X.</br> Toxina bacteriana utilizada en cirujía estética",
      "CONTIENE LA X.</br> Instrumento musical de percusión formado por láminas de madera dispuestas en horizontal",
    ],
  },
  {
    letter: "y",
    answer: ["peyote", "yate"],
    status: 0,
    question: [
      "CONTIENE LA Y.</br> Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos",
      "CON LA Y.</br> Embarcación de recreo de gran tamaño",
    ],
  },
  {
    letter: "z",
    answer: ["zen", "zorro"],
    status: 0,
    question: [
      "CON LA Z.</br> Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional",
      "CON LA Z.</br> Mamífero carnívoro de la familia de los cánidos, de cuerpo alargado y cola larga",
    ],
  },
]

// DECLARE DOM ELEMENTS

const startButton = document.getElementById("start-button")
const insertWordButton = document.getElementById("insert-word")
const nextWordButton = document.getElementById("next-word")
const questionEL = document.querySelector(".questions__title")
const userNameEl = document.querySelector(".new-game__input")
const answerEL = document.querySelector(".questions__input")
const endGameButton = document.getElementById("end-game")
const repeatGameButton = document.getElementById("repeat-button")
const countDownEl = document.querySelector(".questions__time--circle")
const showAnswerEL = document.querySelector(".questions__show-answer")
let circleLetterEL = document.querySelectorAll(".circle__letter")

// DECLARE DIVS

const newGameDiv = document.querySelector(".new-game")
const questionsDiv = document.querySelector(".questions")
const endGameDiv = document.querySelector(".end-game")

// ADD EVENT LISTENERS

startButton.addEventListener("click", getUserNameAndStartGame)

insertWordButton.addEventListener("click", insertWord)
nextWordButton.addEventListener("click", nextWord)

repeatGameButton.addEventListener("click", resetGame)
endGameButton.addEventListener("click", () => {
  timeLeft = 0
})
answerEL.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
    document.getElementById("insert-word").click()
  }
})
userNameEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault()
    document.getElementById("start-button").click()
  }
})

// FUNCTIONS

function getUserNameAndStartGame() {
  userName = userNameEl.value
  answerEL.focus()
  if (userName.length > 0) {
    newGameDiv.style.display = "none"
    endGameDiv.style.display = "none"
    questionsDiv.removeAttribute("style")
    document.querySelector(".questions__name").innerHTML =
      "Jugador:   " + userName
    startGame()
  } else {
    return
  }
}

function getCurrenPositiontLetter() {
  currentPositionLetter++

  if (currentPositionLetter > questions.length - 1) {
    currentPositionLetter = 0
  }

  if (questions.every((question) => question.status !== 0)) {
    checkEndGame()
    return
  }
  if (
    questions[currentPositionLetter].status === 1 ||
    questions[currentPositionLetter].status === 2
  )
    getCurrenPositiontLetter()
}

function insertWord() {
  let answer = answerEL.value
  if (answer) {
    checkAnswer(answer)
    getCurrenPositiontLetter()
    addClassesToCircle()
    paintQuestion()
    if (questions.every((question) => question.status !== 0)) {
      circleLetterEL.forEach((letter) => {
        letter.classList.remove("circle__letter--active")
      })
    }
  }
  answerEL.value = ""
  answerEL.focus()
}
function nextWord() {
  answerEL.value = ""
  showAnswerEL.innerHTML = "¡PASAPALABRA!"
  answerEL.focus()
  getCurrenPositiontLetter()
  addClassesToCircle()
  paintQuestion()

  checkEndGame()
}

function paintQuestion() {
  questionEL.innerHTML = questions[currentPositionLetter].question[listOfWords]
}

function addClassesToCircle() {
  //remove all clases
  circleLetterEL.forEach((circle) => {
    circle.classList.remove("circle__letter--active")
  })
  circleLetterEL[currentPositionLetter].classList.add("circle__letter--active")

  questions.forEach((question, index) => {
    if (question.status === 1) {
      circleLetterEL[index].classList.add("circle__letter--correct")
    } else if (question.status === 2) {
      circleLetterEL[index].classList.add("circle__letter--wrong")
    }
  })
}

function getUserAnswer() {
  let userAnswer = answerEL.value
  if (answerEL.value !== "") {
    answerEL.value = ""
    answerEL.focus()
    return userAnswer
  } else {
    answerEL.focus()
    showAnswerEL.innerHTML = "Por favor, introduce una respuesta"
  }
}

function checkAnswer(userAnswer) {
  if (
    userAnswer.toLowerCase() ===
    questions[currentPositionLetter].answer[listOfWords]
  ) {
    questions[currentPositionLetter].status = 1
    showAnswerEL.innerHTML = "¡ACERTASTE!"
  } else {
    questions[currentPositionLetter].status = 2
    showAnswerEL.innerHTML =
      "¡INCORRECTO!" +
      " La respuesta correcta era: " +
      questions[currentPositionLetter].answer[listOfWords]
  }
}

function createCircle() {
  // Make from stackoverflow https://stackoverflow.com/questions/16613809/how-to-create-circles-around-a-circle-with-css-javascript
  let div = 360 / 27
  let radius = 190
  let parentdiv = document.querySelector(".circle")
  let offsetToParentCenter = parseInt(parentdiv.offsetWidth / 2) //assumes parent is square
  let offsetToChildCenter = 20
  let totalOffset = offsetToParentCenter - offsetToChildCenter

  for (let i = 0; i <= 26; ++i) {
    let childdiv = document.createElement("div")
    childdiv.className = "circle__letter"
    childdiv.innerText = questions[i].letter.toUpperCase()
    childdiv.style.position = "absolute"
    childdiv.style.rotate = "90deg"
    let y = Math.sin(div * i * (Math.PI / 180)) * radius
    let x = Math.cos(div * i * (Math.PI / 180)) * radius
    childdiv.style.top = (y + totalOffset).toString() + "px"
    childdiv.style.left = (x + totalOffset).toString() + "px"
    parentdiv.appendChild(childdiv)
  }
}

function countDownTimer() {
  timeLeft = maxTime
  let timer = setInterval(() => {
    timeLeft--
    console.log(timeLeft)
    if (timeLeft <= 0) {
      clearInterval(timer)
      endGame()
    }

    countDownEl.innerHTML = timeLeft
  }, 1000)
}

function startGame() {
  //Random num to choose the question
  listOfWords = Math.trunc(Math.random() * 2)

  addClassesToCircle()
  paintQuestion()
  countDownTimer()
  answerEL.focus()

  endGameButton.removeAttribute("style")
}
function checkEndGame() {
  if (questions.every((question) => question.status !== 0)) {
    timeLeft = 0
    questionsDiv.style.display = "none"
  }
}
function endGame() {
  let correctAnswers = questions.filter(
    (question) => question.status === 1
  ).length
  circleLetterEL.forEach((circle) => {
    circle.classList.remove("circle__letter--active")
  })

  let incorrectAnswers = questions.filter(
    (question) => question.status === 2
  ).length
  document.querySelector(".end-game__title").innerHTML =
    correctAnswers === questions.length
      ? "¡ENHORABUENA, HAS HECHO PASAPALABRA!"
      : "¡NO LO HAS CONSEGUIDO!"
  if (timeLeft === 0) {
    document.querySelector(".end-game__title").innerHTML =
      "¡SE TE HA ACABADO EL TIEMPO!"
  }
  document.querySelector(".end-game__subtitle").innerHTML =
    "Has tenido " +
    correctAnswers +
    " aciertos y " +
    incorrectAnswers +
    " fallos"
  questionsDiv.style.display = "none"
  newGameDiv.style.display = "none"
  endGameDiv.removeAttribute("style")
  endGameButton.style.display = "none"

  rankingOfPlayers.push({
    name: userName,
    points: correctAnswers,
  })
  let orderedRanking = rankingOfPlayers.sort((a, b) => b.points - a.points)
  let rankingHTML = orderedRanking
    .map((player) => `<p>${player.name} - ${player.points}</p>`)
    .join(" ")
  document.querySelector(
    ".end-game__ranking"
  ).innerHTML = `Ranking:</div> <p></p> ${rankingHTML} `
}
function resetGame() {
  questionsDiv.style.display = "none"
  endGameDiv.style.display = "none"
  newGameDiv.removeAttribute("style")

  questions.forEach((question) => {
    question.status = 0
  })
  circleLetterEL.forEach((circle) => {
    circle.classList.remove("circle__letter--correct")
    circle.classList.remove("circle__letter--wrong")
    circle.classList.remove("circle__letter--active")
  })
  currentPositionLetter = 0
  //timeLeft = 0
  countDownEl.innerHTML = maxTime
  showAnswerEL.innerHTML = ""
  userNameEl.value = ""

  endGameButton.style.display = "none"
}

function startApp() {
  resetGame()
  createCircle()
  circleLetterEL = document.querySelectorAll(".circle__letter")
}

// start the app

startApp()
