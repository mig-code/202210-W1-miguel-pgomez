/*
ISDI Coders Airlines! ✈️🛩

Programa una inferfaz de usuario para una aerolinea (por terminal...).
Esta aerolinea dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera global, 
cuando se llame a la función:

    1. Se preguntará por el nombre de usuario y dará la bienvenida.
    2. El usuario visualizará todos los vuelos disponibles de una forma amigable: 
       El vuelo con origen: Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
    3. A continuación, el usuario verá el coste medio de los vuelos.
    También podrá ver cuantos vuelos efectúan escalas.
    Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al usuario sus destinos.

PRO!:

Después de ver toda la información el programa pedirá al usuario si es ADMIN/USER, dependiendo de la elección, el programa se comportará de la siguiente manera:

Si eres ADMIN, la función debería permitir:

    Poder crear, más vuelos, pidiendo la información por prompt(), sin poder pasar de 15 vuelos, 
    si se intenta introducir uno más, saltará un alert().
    Poder eliminar vuelos mediante el ID.

Si eres USER la función debería permitir:

    El usuario debe poder buscar por precio. Cuando el usuario ponga el precio, 
    debera mostrar los vuelos que tengan ese precio o mas baratos.


    */

let passengernName, role
const maxNumFlights = 15

const allFlights = [
  { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
  { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
  { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
  { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
  { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
  { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
  { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
  { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
  { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
  { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
]

const showFlightsInfo = (flights) => {
  let flightsInfo = []

  for (let i = 0; i < flights.length; i++) {
    flightsInfo.push(
      `El vuelo ${flights[i].id} con destino ${flights[i].to} desde ${
        flights[i].from
      } tiene un coste de ${flights[i].cost}€ y ${
        flights[i].scale ? "tiene escala" : "no tiene escala"
      }`
    )
  }
  return flightsInfo.join("\n")
}

const showAverageFlightPrice = (flights) => {
  let averagePrice = 0
  for (let i = 0; i < flights.length; i++) {
    averagePrice = averagePrice + flights[i].cost
  }
  return `El precio medio por vuelo es de ${averagePrice / flights.length}€`
}

const showNonDirectFlights = (flights) => {
  let nonDirectflights = 0

  for (let i = 0; i < flights.length; i++) {
    if (flights[i].scale) {
      nonDirectflights++
    }
  }
  return `Hay ${nonDirectflights} vuelos con escala`
}

const showLast5Destinations = (flights) => {
  let last5destinations = []

  for (let i = 0; i < flights.length; i++) {
    if (flights[i].id > 4) {
      last5destinations.push(flights[i].to)
    }
  }
  return `Los últimos 5 vuelos tienen destino a: ${last5destinations.join(
    " - "
  )}`
}

const searchByPrice = () => {
  let cheaperThanFlights = []
  let price = prompt("Hola USER. Introduce el precio máximo")

  if (!isNaN(price) && price) {
    for (let i = 0; i < allFlights.length; i++) {
      if (allFlights[i].cost <= parseFloat(price)) {
        cheaperThanFlights.push(
          `De ${allFlights[i].from} a ${allFlights[i].to}. Precio ${allFlights[i].cost}€`
        )
      }
    }

    if (cheaperThanFlights.length > 0) {
      alert(
        `Los vuelos con un precio menor a ${price} € son a:\n${cheaperThanFlights.join(
          "\n"
        )}`
      )
    } else {
      alert("No hay ningún vuelo por debajo de ese precio")
    }
  } else {
    alert("No has introducido un precio válido")
    searchByPrice()
  }
}

const checkIfFlightExists = (id) => {
  for (let i = 0; i < allFlights.length; i++) {
    if (allFlights[i].id == id) {
      return true
    }
  }
  return false
}

const removeFlight = () => {
  let idToRemove
  alert(showFlightsInfo(allFlights))

  do {
    idToRemove = prompt("Introduce el id del vuelo que quieres eliminar")
    if (!idToRemove || isNaN(idToRemove)) {
      alert("No has introducido una opción válida")
    }
  } while (!idToRemove || isNaN(idToRemove))

  if (checkIfFlightExists(idToRemove)) {
    for (let i = 0; i < allFlights.length; i++) {
      if (allFlights[i].id == idToRemove) {
        allFlights.splice(i, 1)
        alert(`Vuelo ${idToRemove} eliminado`)
        console.log(showFlightsInfo(allFlights))
      }
    }
  } else {
    alert(`El vuelo con el id ${idToRemove} no existe`)
  }
}

const addFlights = () => {
  let to, from, cost, scale

  do {
    to = prompt("Introduce el destino")
    if (!to || !isNaN(to)) {
      alert("No has introducido una opción válida")
    }
  } while (!to || !isNaN(to))

  do {
    from = prompt("Introduce el lugar de salida")
    if (!from || !isNaN(from)) {
      alert("No has introducido una opción válida")
    }
  } while (!from || !isNaN(from))

  do {
    cost = prompt("Introduce el precio del vuelo")
    if (!cost || isNaN(cost)) {
      alert("No has introducido una opción válida")
    }
  } while (!cost || isNaN(cost))

  do {
    scale = prompt("¿TIENE ESCALAS EL VUELO? \nIntroduce SI o NO")
    if (!scale || !(scale === "SI" || scale === "NO")) {
      alert("No has introducido una opción válida")
    }
  } while (!scale || !(scale === "SI" || scale === "NO"))

  if (scale === "SI") {
    scale = true
  } else {
    scale = false
  }

  allFlights.push({
    id: allFlights[allFlights.length - 1].id + 1,
    to: to,
    from: from,
    cost: parseFloat(cost),
    scale: scale,
  })
  alert(showFlightsInfo(allFlights))
  console.log(showFlightsInfo(allFlights))
}

const checkUser = () => {
  do {
    role = prompt(
      "Introduce USER si eres ususario \nIntroduce ADMIN si eres Administrador"
    )
    if (!role || !(role === "ADMIN" || role === "USER")) {
      alert("No has introducido una opción válida")
    }
  } while (!role || !(role === "ADMIN" || role === "USER"))

  selectRoleOptions(role)
}

const selectRoleOptions = (role) => {
  if (role === "ADMIN") {
    do {
      adminOptions()
    } while (confirm("Hola Admin, ¿quieres realizar más operaciones?"))
  }
  if (role === "USER") {
    do {
      searchByPrice()
    } while (confirm("¿Quieres volver a buscar un vuelo?"))
  }
  checkUser()
}

const adminOptions = () => {
  let adminChoice
  do {
    adminChoice = prompt(
      "Introduce INSERTAR si quieres introducir un nuevo vuelo \nIntroduce BORRAR si quieres eliminar un buelo"
    )
    if (
      !adminChoice ||
      !(adminChoice === "INSERTAR" || adminChoice === "BORRAR")
    ) {
      alert("No has introducido una opción válida")
    }
  } while (
    !adminChoice ||
    !(adminChoice === "INSERTAR" || adminChoice === "BORRAR")
  )

  if (adminChoice === "INSERTAR") {
    if (allFlights.length === maxNumFlights) {
      alert("VUELOS LLENOS E IGUALES")
    }
    while (allFlights.length < maxNumFlights) {
      addFlights()

      if (allFlights.length === maxNumFlights) {
        alert("Ya no puedes añadir más vuelos")
        return
      }
      if (!confirm("¿Quieres insertar otro vuelo?")) {
        return
      }
    }
  }
  if (adminChoice === "BORRAR") {
    while (allFlights.length > 0) {
      removeFlight()

      if (allFlights.length === 0) {
        alert("Ya no puedes borrar más vuelos")
        return
      }
      if (!confirm("¿Quieres borrar otro vuelo?")) {
        return
      }
    }
  }
}

const startApp = () => {
  do {
    passengernName = prompt("Hola, por favor, introduce tu nombre")
  } while (!passengernName)

  alert(
    `Hola ${passengernName} voy a mostrarte toda la información disponible sobre los vuelos ✈️`
  )
  alert(showFlightsInfo(allFlights))
  alert(showAverageFlightPrice(allFlights))
  alert(showNonDirectFlights(allFlights))
  alert(showLast5Destinations(allFlights))
  checkUser()
}

// RUN APP

startApp()
