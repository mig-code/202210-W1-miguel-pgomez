/*
BINGO GAME! 🎲🎰

Realiza un programa que simule un Bingo. Cuando se ejecute, pedirá el nombre del jugador y deberá guardarse. 
Durante el primer turno se mostrará un cartón con 15 números (excluyendo el 0 siempre), 
para pasar al siguiente turno el usuario deberá confirmar mediante confirm() visualizándose otro número, 
si coincide con alguno de los existentes en el cartón, cambiará por una "X" o un 0. 
El cartón se mostrará, al final de cada turno, con los cambios efectuados, indicándole al usuario qué número se ha encontrado. 
El programa deberá preguntar al usuario al inicio de cada turno si desea continuar, en caso de que se continúe, 
seguirá el mismo patrón que hasta el momento.

Por supuesto, cuando todos los números de una misma linea estén en "X", mostrará un mensaje "LINEA!",
pero la ejecución seguirá, el juego solo acabará cuando todos los números estén a "X".

Cuando el juego concluya, deberá decirle al usuario en cuantos turnos se ha completado el cartón. 
Por último, deberá preguntar si desea volver a jugar.

Empieza por la versión más básica!

Si funciona con 5 números deberá funcionar con 15, no? 😁
Requisitos de la versión mínima:

Cartón con solo 5 números, sin necesidad de ser generados random. 
Solo necesitamos un número random cuando recorramos el cartón y veamos si hay alguna coincidencia.
No necesitamos asegurarnos que el número random de cada turno no haya salido en turnos anteriores,
recuerda que estamos en la mínima versión posible, eso ya lo solucionaremos.
Si hay coincidencia, remplazaremos el número por una 'x' y mostramos el cartón modificado

Sepáralo todo en funciones, englobado en una funcion global llamada bingo(), 

Pro 👊🏼

    -Cuando se muestre la carta, se preguntará al usuario si realmente quiere ese cartón o generar otro,
    si realmente quiere ese cartón, deberá responder "yes" para proceder
    -Establece un sistema de puntos, en cuantos más turnos se complete el cartón, menos puntos (el sistema de puntos intégralo como quieras), por el contrario, a menos turnos, más puntos.
    -Antes de empezar el juego, muestra el sistema de puntos al usuario.
    Ranking de usuarios (ordenado por puntos).
*/

let userName = ""
let totalNumbersInCard = 15
let highestBingoNumber = 90
let bingoCard = []
let firstLine, secondLine, thirdLine
let hasLine = false
let numbersInthePot = []
let points = highestBingoNumber
let rankingOfPlayers = [{ name: "default_player", points: 05 }]
let confirmExit = false

const welcomeMessage = () => {
  do {
    userName = prompt("Hola, por favor, introduce tu nombre")
  } while (!userName)

  alert(`Hola ${userName}, vamos a jugar una partida de Bingo`)
  alert(
    `Este es el sistema de puntación:\nEmpiezas con ${highestBingoNumber} puntos.\nPor cada nuevo número perderas un punto,\nIntenta conseguir BINGO antes de llegar a 0 puntos `
  )
}

let createBingoCard = () => {
  let arrayOfNumbers = []
  let randomNum
  bingoCard = []

  while (bingoCard.length < 15) {
    randomNum = generateRandomNumber(highestBingoNumber)
    if (!arrayOfNumbers.includes(randomNum)) {
      arrayOfNumbers.push(randomNum)
      bingoCard.push({
        number: randomNum,
        matched: false,
      })
    }
  }

  createLines()
}

let createLines = () => {
  firstLine = bingoCard.slice(0, 5)
  secondLine = bingoCard.slice(5, 10)
  thirdLine = bingoCard.slice(10, 15)
}

let updateBingoCard = (generatedNumber) => {
  if (bingoCard.some((item) => item.number === generatedNumber)) {
    console.log(
      `👏👏El número que ha salido es ${generatedNumber} y está en el cartón`
    )
  } else {
    console.log(`El ${generatedNumber} no está en el cartón`)
  }

  bingoCard.forEach((item) => {
    if (item.number === generatedNumber) {
      item.number = "X"
      item.matched = true
    }
  })
  createLines()
}

let showBingoCard = () => {
  console.log(`Su cartón es \n`)
  console.log(firstLine.map((item) => item.number).join(" - "))
  console.log(secondLine.map((item) => item.number).join(" - "))
  console.log(thirdLine.map((item) => item.number).join(" - "))
  console.log(`\n`)
}

let checkLines = () => {
  if (firstLine.every((item) => item.number === "X")) {
    console.log("¡¡ENHORABUENA HAS HECHO LÍNEA!!")
    hasLine = true
  }
  if (secondLine.every((item) => item.number === "X")) {
    console.log("¡¡ENHORABUENA HAS HECHO LÍNEA!!")
    hasLine = true
  }
  if (thirdLine.every((item) => item.number === "X")) {
    console.log("¡¡ENHORABUENA HAS HECHO LÍNEA!!")
    hasLine = true
  }
}

let checkWin = (card) => {
  return card.every((item) => item.matched)
}

const generateRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum + 1)
}

let newNumber = () => {
  let randomNum

  do {
    randomNum = generateRandomNumber(highestBingoNumber)
  } while (numbersInthePot.includes(randomNum))

  numbersInthePot.push(randomNum)
  return randomNum
}

let updateScore = () => {
  points--
}
let showRankings = () => {
  rankingOfPlayers.push({
    name: userName,
    points: points,
  })
  let orderedRanking = rankingOfPlayers.sort((a, b) => b.points - a.points)
  let rankingMessage = `El ranking actual es:\n`
  orderedRanking.forEach((item) => {
    rankingMessage = rankingMessage + `\n${item.name} con ${item.points} puntos`
  })
  console.log(rankingMessage)
}

const bingo = () => {
  welcomeMessage()
  do {
    createBingoCard()
    showBingoCard()
  } while (confirm("¿Quieres un nuevo cartón?"))
  console.log("Empieza el Bingo \n")

  do {
    updateBingoCard(newNumber())

    if (!hasLine) {
      checkLines()
    }
    showBingoCard()
    console.log(`\n`)
    updateScore()

    if (!checkWin(bingoCard)) {
      confirmExit = confirm("Quieres un núevo número")
    } else {
      console.log(`🎉🎉Has hecho bingo con ${points} puntos🎉🎉`)
      showRankings()
    }
  } while (!checkWin(bingoCard) && confirmExit)

  hasLine = false
  points = highestBingoNumber
  numbersInthePot = []
}

//RUN APP
do {
  bingo()
} while (confirm("¿Quieres echar otra partida?"))
