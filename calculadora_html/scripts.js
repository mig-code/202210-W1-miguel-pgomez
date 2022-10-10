

// DECLARE MAIN VARIABLES

let result
let arrayOfNum = []
let accumulateResult = 0
let canIprint = true
let arrayOfOperations = []
let numberIsResult = false

//DECLARE DOM ELEMENTS
const displayEL = document.querySelector(".calculator__display")
const allButtons = document.querySelectorAll(".calculator__btn")
const buttonAc = document.querySelector("#btn-ac")
const buttonC = document.querySelector("#btn-c")
const buttonAdd = document.querySelector("#btn-add")
const buttonSubstract = document.querySelector("#btn-substract")
const buttonMultiply = document.querySelector("#btn-multiply")
const buttonDivide = document.querySelector("#btn-divide")
const buttonResult = document.querySelector("#btn-result")
const buttonChangeNegative = document.querySelector("#btn-negative")

// ADDING EVENT LISTENERS
//
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    getButtonClicked(button.innerText)
  })
})

buttonAc.addEventListener("click", () => {
  resetCalculator()
  removeAllClases()
})

buttonC.addEventListener("click", buttonCOnClick)
buttonChangeNegative.addEventListener("click", changeSymbol)

// FUNCTIONS

function changeSymbol() {
  if (numberIsResult) {
    displayEL.innerText = arrayOfNum[0]
    arrayOfNum.pop()
  }
  if (displayEL.innerText.length > 0) {
    if (displayEL.innerText.startsWith("-")) {
      displayEL.innerText = displayEL.innerText.slice(1)
    } else {
      displayEL.innerText = "-" + displayEL.innerText
    }
  }
  numberIsResult = false
 
}

function buttonCOnClick() {
  let lastResult
  if (numberIsResult) {
    lastResult = arrayOfNum[0]
    resetCalculator()
    displayEL.innerText = lastResult
    numberIsResult = false
    return
  }
  if (
    displayEL.innerText.endsWith("+") ||
    displayEL.innerText.endsWith("-") ||
    displayEL.innerText.endsWith("x") ||
    displayEL.innerText.endsWith("÷")
  ) {
    resetCalculator()
  } else if (arrayOfNum.length === 0) {
    resetCalculator()
  } else {
    cleanDisplay()
  }
  numberIsResult = false
}

function getButtonClicked(event) {
  if (!canIprint && event !== "C") {
    cleanDisplay()
    canIprint = true
   
  }

  if (checkIfIsNumber(event) || event === ".") {
    if (event === "." && displayEL.innerText.includes(".")) {
      return
    } else if (
      displayEL.innerText.endsWith("+") ||
      displayEL.innerText.endsWith("-") ||
      displayEL.innerText.endsWith("x") ||
      displayEL.innerText.endsWith("÷")
    ) {
      cleanDisplay()
      printInDisplay(event)
    } else {
      printInDisplay(event)
    }
  } else {
    if (
      event === "+" ||
      event === "-" ||
      event === "x" ||
      event === "÷" ||
      event === "="
    ) {
      if (
        displayEL.innerText.endsWith("+" || "-" || "x" || "÷") &&
        event !== "="
      ) {
        displayEL.innerText = arrayOfNum[0] + event
        arrayOfOperations[0] = event
      } else if (!isNaN(displayEL.innerText) && displayEL.innerText !== "") {
        arrayOfNum.push(parseFloat(displayEL.innerText))
      }

      cleanDisplay()
      calculate(event)
    }
  }
}

function calculate(event) {
  numberIsResult = false
  if (event !== "=") {
    if (arrayOfOperations.length < 2) {
      arrayOfOperations.push(event)
    }
  }

  if ((event === "=" || event === "C") && arrayOfNum.length === 1) {
    displayEL.innerText = arrayOfNum[0]
    canIprint = false
    numberIsResult = true
  }

  if (arrayOfNum.length === 1 && event !== "=") {
    arrayOfOperations = []
    displayEL.innerText = arrayOfNum[0] + event
    if (event !== arrayOfOperations[0] && event !== "=") {
      arrayOfOperations.push(event)
      addActiveClassOperation(arrayOfOperations[0])
    }
  }

  if (arrayOfNum.length > 1) {
    addActiveClassOperation(arrayOfOperations[0])

    if (event === "=" && arrayOfOperations.length === 0) {
      arrayOfNum.shift()
      displayEL.innerText = arrayOfNum[0]
      canIprint = false
      return
    }

    switch (arrayOfOperations[0]) {
      case "+":
        accumulateResult = arrayOfNum[0] + arrayOfNum[1]
        arrayOfNum[0] = accumulateResult
        displayEL.innerHTML =
          accumulateResult + (arrayOfOperations[1] ? arrayOfOperations[1] : "")
        arrayOfNum.pop()
        addActiveClassOperation(arrayOfOperations[1])
        numberIsResult = true
        break

      case "-":
        accumulateResult = arrayOfNum[0] - arrayOfNum[1]
        arrayOfNum[0] = accumulateResult
        displayEL.innerHTML =
          String(accumulateResult) +
          (arrayOfOperations[1] ? arrayOfOperations[1] : "")
        addActiveClassOperation(arrayOfOperations[1])
        arrayOfNum.pop()
        numberIsResult = true
        break

      case "x":
        
        accumulateResult = arrayOfNum[0] * arrayOfNum[1]
        arrayOfNum[0] = accumulateResult
        displayEL.innerHTML =
          accumulateResult + (arrayOfOperations[1] ? arrayOfOperations[1] : "")
        addActiveClassOperation(arrayOfOperations[1])
        
        arrayOfNum.pop()
        numberIsResult = true

        break
      case "÷":
        if (arrayOfNum[1] === 0) {
          accumulateResult = 0
        } else {
          accumulateResult = (arrayOfNum[0] / arrayOfNum[1]).toFixed(2)
        }
        arrayOfNum[0] = parseFloat(accumulateResult)
        displayEL.innerHTML =
          accumulateResult + (arrayOfOperations[1] ? arrayOfOperations[1] : "")
        addActiveClassOperation(arrayOfOperations[1])
        arrayOfNum.pop()
        numberIsResult = true

        break

      default:
        break
    }
   
    if (event === "=") {
     

      if (arrayOfNum > 1) {
        displayEL.innerHTML = String(accumulateResult)
        numberIsResult = true
      }

      arrayOfOperations = []
      removeAllClases()
      canIprint = false
    }
    arrayOfOperations.shift()
  }
}

function addActiveClassOperation(userOperation) {
 
  switch (userOperation) {
    case "+":
      buttonAdd.classList.add("active")
      buttonSubstract.classList.remove("active")
      buttonMultiply.classList.remove("active")
      buttonDivide.classList.remove("active")

      break
    case "-":
      buttonSubstract.classList.add("active")
      buttonAdd.classList.remove("active")
      buttonMultiply.classList.remove("active")
      buttonDivide.classList.remove("active")
      break
    case "x":
      buttonMultiply.classList.add("active")
      buttonDivide.classList.remove("active")
      buttonAdd.classList.remove("active")
      buttonSubstract.classList.remove("active")
      break
    case "÷":
      buttonDivide.classList.add("active")
      buttonMultiply.classList.remove("active")
      buttonAdd.classList.remove("active")
      buttonSubstract.classList.remove("active")
    default:
      break
  }
}

function checkIfIsNumber(char) {
  return !isNaN(char)
}

function printInDisplay(num) {
  displayEL.innerText += num
}

function cleanDisplay() {
  displayEL.innerText = ""
}

function resetCalculator() {
  displayEL.innerText = ""
  accumulateResult = 0
  arrayOfNum = []
  arrayOfOperations = []

  numberIsResult = false
}

function removeAllClases() {
  buttonAdd.classList.remove("active")
  buttonSubstract.classList.remove("active")
  buttonMultiply.classList.remove("active")
  buttonDivide.classList.remove("active")
}


