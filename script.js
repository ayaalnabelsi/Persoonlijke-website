
/*website waar we info van vragen */
const url = base = "https://fdnd.directus.app/items/person/"

/* Selecteert het formulier met class studentsearch uit de HTML */
const form = document.querySelector('form.studentsearch')

/* Selecteert het output element uit de HTML */
const kleurOutput = document.querySelector('output')

/* Selecteert het eerste select element uit de HTML */
const select = document.querySelector('select')

/*lege variabele om info hierin op te slaan*/
let ayaA

/*Geholpen door Justus*/
/* Voegt een submit event toe aan het formulier */
form.addEventListener('submit', (event) => {

  /* Zorgt ervoor dat de pagina niet opnieuw laadt bij submit */
  event.preventDefault()

  /* Haalt de waarde op van het eerste inputveld in het formulier */
  const query = event.target[0].value

  /* Laat in de console zien wat de gebruiker heeft ingevuld */
  console.log(query)

  /* Roept de functie aan om studenten te zoeken die lijken op Aya */
  haalStudentenDieOpALijken(query);
})


/*Aya API*/

/* Roept direct de functie aan om persoon met id 284 op te halen */
haalPersonOp(284);

/* Selecteert het eerste ul element in de pagina */
let person = document.querySelector("ul")

/* async zorg ervoor dat rest van javascript blijft werken terwijl de date opgehaald wordt */
async function haalPersonOp(id) {

  /*await zorgt ervoor dat de code stopt totdat er iets is opgehaald*/
  /* Haalt de persoon op van de API met het meegegeven id */
  let response = await fetch(url + id)

  /* om het voor de computer duidelijk te maken vraag je om een json bestand te maken*/
  /* Zet de response om naar een JSON object */
  let responseJSON = await response.json()

  /* Slaat alleen de data (de persoon zelf) op in ayaA */
  ayaA = responseJSON.data
  /*hier krijg je alleen de data terug*/


  /* Maakt een stukje HTML aan met de naam en avatar van Aya */
  let ayaAHTML =
    `<li>
        <h2> ${ayaA.name}</h2>
        <img src="${ayaA.avatar}" alt="${ayaA.name}">
      </li>`;

  /* Selecteert de ul binnen de header */
  let lijst = document.querySelector('header ul');

  /* Maakt de lijst eerst leeg */
  lijst.innerHTML = ""

  /* Voegt de nieuwe HTML toe aan de lijst */
  lijst.insertAdjacentHTML('beforeend', ayaAHTML)
}

/*geholpen door Sanne*/

/* Async functie om studenten te zoeken die lijken op Aya */
async function haalStudentenDieOpALijken(kenmerk) {

  /* Haalt de waarde van Aya op van het gekozen kenmerk */
  let mijnWaarde = ayaA[kenmerk]

 
  let response = await fetch(
    url + `?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&filter[${kenmerk}]=${mijnWaarde}`
  );

  /* Zet de response weer om naar JSON */
  let responseJSON = await response.json();

  /* Haalt alleen de array met personen eruit */
  let Persons = responseJSON.data;

  /* Selecteert de ul waar de studenten in moeten komen */
  const lijst = document.querySelector('#lijst-mensen');

  /* Maakt de lijst eerst leeg */
  lijst.innerHTML = "";

  /* Loopt door alle gevonden personen heen */
  Persons.forEach((persoon) => {

    /* Maakt voor elke persoon een stukje HTML */
    let itemHTML = `
        <li>
          <h2>${persoon.name}</h2>
        </li>`;

    /* Voegt de persoon toe aan de lijst in de HTML */
    lijst.insertAdjacentHTML('beforeend', itemHTML);

  });
}
