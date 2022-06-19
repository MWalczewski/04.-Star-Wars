// function init() {
//   console.log("loaded");
// }

const mainLink = "https://swapi.dev/api/"; //BASE_URL
let allResults = [];
let mainData = "";
let currentCollection = null;
let showDetailsOfItem = null;
let displayDetails = [];

// function changePageSize(event) {
//   console.log("page changed", event.target.value);
// }

// function prevPage() {
//   console.log("go to previous page");
// }

// function nextPage() {
//   console.log("go to next page");
// }

// PIERWSZE 10 REZULTATOW
// async function downloadCollection(collection) {
//   const response = await fetch(`${mainLink}${collection}`);
//   currentCollection = await response.json();
//   return currentCollection;
// }

// POBIERANIE WSZYSTKICH DANYCH z KOLEKCJI
async function downloadCollection(collection) {
  allResults = [];
  let url = `${mainLink}${collection}`;
  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    allResults.push(...data.results);
    url = data.next;

    // console.log(allResults);
  }
  // console.log(allResults);
  return allResults;
}
// TWORZENIE BUTTONÓW KOLEKCJI + DODAWANIE NAZWY KOLEKCJI
async function buttons() {
  const response = await fetch(mainLink);
  mainData = await response.json();
  const buttons = document.getElementById("buttons");
  collectionButtons = Object.keys(mainData).map((name) => {
    // console.log("collection name:", name);
    const button = document.createElement("button");
    button.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    buttons.appendChild(button);
    button.addEventListener("click", buttonClick);
  });
}
// WYŚWIETLANIE TABELI DANEJ KOLEKCJI
async function buttonClick(event) {
  const collection = event.target.innerHTML.toLowerCase();
  await downloadCollection(collection);
  currentCollection = collection;
  // console.log("current collection: ", currentCollection.results);

  table(collection);
}
// TWORZENIE TABELI
function table(collection) {
  let thead = document.getElementById("thead");
  let table = document.getElementById("table");
  let displayCollection = "";

  if (collection === "people") {
    let collectionObject = allResults.map(
      ({ name, skin_color, birth_year, mass, created, url }) =>
        new People(name, skin_color, birth_year, mass, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Skin color</th>
    <th>Birth year</th>
    <th>Mass</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.name}</td>
        <td>${element.skin_color}</td>
        <td>${element.birth_year}</td>
        <td>${element.mass}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  } else if (collection === "planets") {
    let collectionObject = allResults.map(
      ({ name, climate, orbital_period, diameter, created, url }) =>
        new Planets(name, climate, orbital_period, diameter, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Climate</th>
    <th>Orbital Period</th>
    <th>Diameter</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.name}</td>
        <td>${element.climate}</td>
        <td>${element.orbital_period}</td>
        <td>${element.diameter}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  } else if (collection === "films") {
    let collectionObject = allResults.map(
      ({ name, title, director, producer, release_date, created, url }) =>
        new Films(name, title, director, producer, release_date, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Title</th>
    <th>Director</th>
    <th>Producer</th>
    <th>Release Date</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.title}</td>
        <td>${element.director}</td>
        <td>${element.producer}</td>
        <td>${element.release_date
          .slice(2, 10)
          .split("-")
          .reverse()
          .join("-")}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  } else if (collection === "species") {
    let collectionObject = allResults.map(
      ({ name, classification, designation, language, created, url }) =>
        new Species(name, classification, designation, language, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Classification</th>
    <th>Designation</th>
    <th>Language</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.name}</td>
        <td>${element.classification}</td>
        <td>${element.designation}</td>
        <td>${element.language}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  } else if (collection === "vehicles") {
    let collectionObject = allResults.map(
      ({ name, manufacturer, model, crew, created, url }) =>
        new Vehicle(name, manufacturer, model, crew, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Manufacturer</th>
    <th>Model</th>
    <th>Crew</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.name}</td>
        <td>${element.manufacturer}</td>
        <td>${element.model}</td>
        <td>${element.crew}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  } else if (collection === "starships") {
    let collectionObject = allResults.map(
      ({ name, manufacturer, model, crew, created, url }) =>
        new Starships(name, manufacturer, model, crew, created, url)
    );
    let titles = `<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Manufacturer</th>
    <th>Model</th>
    <th>Crew</th>
    <th>Created</th>
    <th>Action</th>
  </tr>`;
    thead.innerHTML = titles;
    collectionObject.forEach((element) => {
      displayCollection += `
      <tr id="${element.url}">
        <td>${element.url.split("/").at(-2)}</td>
        <td>${element.name}</td>
        <td>${element.manufacturer}</td>
        <td>${element.model}</td>
        <td>${element.crew}</td>
        <td>${element.created.slice(2, 10).split("-").reverse().join("-")}</td>
        <td><img id="info-button" class="info-button" data-id="${
          element.url
        }" src="./images/info.jpg"/><img class="delete-button" data-id="${
        element.url
      }" src="./images/trash.png"/></td>
      </tr>`;
    });
  }
  table.innerHTML = displayCollection;

  // console.log("currentCollection", currentCollection);

  // USUWANIE ELEMENTU Z TABELI
  function deleteElement(event) {
    let itemToDelete = null;
    // console.log("delete", event.target.dataset.id);
    const { id } = event.target.dataset;
    itemToDelete = document.getElementById(id);
    // itemToDelete.style.display = "none";
    itemToDelete.remove();
  }

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteElement);
  });

  // WYŚWIETLANIE DODATKOWEJ TABELI Z DETALAMI DANEGO ELEMENTU
  async function showDetails(event) {
    let tableToHide = document.getElementById("secondary-table");
    tableToHide.style.display = "block";
    displayDetails = [];
    // console.log("pokaz dane tego itemu", event.target.dataset.id);
    const response = await fetch(`${event.target.dataset.id}`);
    showDetailsOfItem = await response.json();
    let detailsThead = document.getElementById("details-thead");
    let detailsTable = document.getElementById("details-table");
    if (collection === "people") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Name</td>
      <td>${showDetailsOfItem.name}</td>
      </tr>
      <tr>
      <td>Birth Year</td>
      <td>${showDetailsOfItem.birth_year}</td>
      </tr>
      <tr>
      <td>Eye Color</td>
      <td>${showDetailsOfItem.eye_color}</td>
      </tr>
      <tr>
      <td>Gender</td>
      <td>${showDetailsOfItem.gender}</td>
      </tr>
      <tr>
      <td>Height</td>
      <td>${showDetailsOfItem.height}</td>
      </tr>
      <tr>
      <td>Mass</td>
      <td>${showDetailsOfItem.mass}</td>
      </tr>
      <tr>
      <td>Skin Color</td>
      <td>${showDetailsOfItem.skin_color}</td>
      </tr>
      <tr>
      <td>Homeworld</td>
      <td>${showDetailsOfItem.homeworld}</td>
      </tr>
      <tr>
      <td>Films</td>
      <td>${showDetailsOfItem.films}</td>
      </tr>
      <tr>
      <td>Species</td>
      <td>${showDetailsOfItem.species}</td>
      </tr>
      <tr>
      <td>Starships</td>
      <td>${showDetailsOfItem.starships}</td>
      </tr>
      <tr>
      <td>Vehicles</td>
      <td>${showDetailsOfItem.vehicles}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>Created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>Edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>
      `;
    } else if (collection === "planets") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Name</td>
      <td>${showDetailsOfItem.name}</td>
      </tr>
      <tr>
      <td>Diameter</td>
      <td>${showDetailsOfItem.diameter}</td>
      </tr>
      <tr>
      <td>Rotation Period</td>
      <td>${showDetailsOfItem.rotation_period}</td>
      </tr>
      <tr>
      <td>orbital_period</td>
      <td>${showDetailsOfItem.orbital_period}</td>
      </tr>
      <tr>
      <td>gravity</td>
      <td>${showDetailsOfItem.gravity}</td>
      </tr>
      <tr>
      <td>population</td>
      <td>${showDetailsOfItem.population}</td>
      </tr>
      <tr>
      <td>climate</td>
      <td>${showDetailsOfItem.climate}</td>
      </tr>
      <tr>
      <td>terrain</td>
      <td>${showDetailsOfItem.terrain}</td>
      </tr>
      <tr>
      <td>surface_water</td>
      <td>${showDetailsOfItem.surface_water}</td>
      </tr>
      <tr>
      <td>residents</td>
      <td>${showDetailsOfItem.residents}</td>
      </tr>
      <tr>
      <td>films</td>
      <td>${showDetailsOfItem.films}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>`;
    } else if (collection === "films") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Title</td>
      <td>${showDetailsOfItem.title}</td>
      </tr>
      <tr>
      <td>Episode ID</td>
      <td>${showDetailsOfItem.episode_id}</td>
      </tr>
      <tr>
      <td>Opening Crawl</td>
      <td>${showDetailsOfItem.opening_crawl}</td>
      </tr>
      <tr>
      <td>Director</td>
      <td>${showDetailsOfItem.director}</td>
      </tr>
      <tr>
      <td>Producer</td>
      <td>${showDetailsOfItem.producer}</td>
      </tr>
      <tr>
      <td>Release Date</td>
      <td>${showDetailsOfItem.release_date}</td>
      </tr>
      <tr>
      <td>Species</td>
      <td>${showDetailsOfItem.species}</td>
      </tr>
      <tr>
      <td>Starships</td>
      <td>${showDetailsOfItem.starships}</td>
      </tr>
      <tr>
      <td>Vehicles</td>
      <td>${showDetailsOfItem.vehicles}</td>
      </tr>
      <tr>
      <td>Characters</td>
      <td>${showDetailsOfItem.characters}</td>
      </tr>
      <tr>
      <td>Planets</td>
      <td>${showDetailsOfItem.Planets}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>`;
    } else if (collection === "species") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Name</td>
      <td>${showDetailsOfItem.name}</td>
      </tr>
      <tr>
      <td>Classification</td>
      <td>${showDetailsOfItem.classification}</td>
      </tr>
      <tr>
      <td>Designation</td>
      <td>${showDetailsOfItem.designation}</td>
      </tr>
      <tr>
      <td>Average Height</td>
      <td>${showDetailsOfItem.average_height}</td>
      </tr>
      <tr>
      <td>Average Lifespan</td>
      <td>${showDetailsOfItem.average_lifespan}</td>
      </tr>
      <tr>
      <td>Eye colors</td>
      <td>${showDetailsOfItem.eye_colors}</td>
      </tr>
      <tr>
      <td>Skin colors</td>
      <td>${showDetailsOfItem.skin_colors}</td>
      </tr>
      <tr>
      <td>Language</td>
      <td>${showDetailsOfItem.language}</td>
      </tr>
      <tr>
      <td>Homeworld</td>
      <td>${showDetailsOfItem.homeworld}</td>
      </tr>
      <tr>
      <td>People</td>
      <td>${showDetailsOfItem.people}</td>
      </tr>
      <tr>
      <td>Films</td>
      <td>${showDetailsOfItem.films}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>`;
    } else if (collection === "vehicles") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Name</td>
      <td>${showDetailsOfItem.name}</td>
      </tr>
      <tr>
      <td>Model</td>
      <td>${showDetailsOfItem.model}</td>
      </tr>
      <tr>
      <td>Vehicle Class</td>
      <td>${showDetailsOfItem.vehicle_class}</td>
      </tr>
      <tr>
      <td>Manufacturer</td>
      <td>${showDetailsOfItem.manufacturer}</td>
      </tr>
      <tr>
      <td>Length</td>
      <td>${showDetailsOfItem.length}</td>
      </tr>
      <tr>
      <td>Cost in Credits</td>
      <td>${showDetailsOfItem.cost_in_credits}</td>
      </tr>
      <tr>
      <td>Crew</td>
      <td>${showDetailsOfItem.crew}</td>
      </tr>
      <tr>
      <td>Passengers</td>
      <td>${showDetailsOfItem.passengers}</td>
      </tr>
      <tr>
      <td>Max Atmosphering Speed</td>
      <td>${showDetailsOfItem.max_atmosphering_speed}</td>
      </tr>
      <tr>
      <td>Cargo Capacity</td>
      <td>${showDetailsOfItem.cargo_capacity}</td>
      </tr>
      <tr>
      <td>Consumables</td>
      <td>${showDetailsOfItem.consumables}</td>
      </tr>
      <tr>
      <td>Films</td>
      <td>${showDetailsOfItem.films}</td>
      </tr>
      <tr>
      <td>Pilots</td>
      <td>${showDetailsOfItem.pilots}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>`;
    } else if (collection === "starships") {
      let detailsTitles = `<tr>
      <th><img id="close-button" class="close-button" src="./images/close.png"/></th>
      </th>
      </tr>
      <tr>
      <th>Attribute</th>
      <th>Value</th>
      </tr>`;
      detailsThead.innerHTML = detailsTitles;
      displayDetails += `<tr>
      <td>Name</td>
      <td>${showDetailsOfItem.name}</td>
      </tr>
      <tr>
      <td>Model</td>
      <td>${showDetailsOfItem.model}</td>
      </tr>
      <tr>
      <td>Starship Class</td>
      <td>${showDetailsOfItem.starhip_class}</td>
      </tr>
      <tr>
      <td>Manufacturer</td>
      <td>${showDetailsOfItem.manufacturer}</td>
      </tr>
      <tr>
      <td>Length</td>
      <td>${showDetailsOfItem.length}</td>
      </tr>
      <tr>
      <td>Cost in Credits</td>
      <td>${showDetailsOfItem.cost_in_credits}</td>
      </tr>
      <tr>
      <td>Crew</td>
      <td>${showDetailsOfItem.crew}</td>
      </tr>
      <tr>
      <td>Passengers</td>
      <td>${showDetailsOfItem.passengers}</td>
      </tr>
      <tr>
      <td>Max Atmosphering Speed</td>
      <td>${showDetailsOfItem.max_atmosphering_speed}</td>
      </tr>
      <tr>
      <td>Hyperdrive Rating</td>
      <td>${showDetailsOfItem.hyperdrive_rating}</td>
      </tr>
      <tr>
      <td>MGLT</td>
      <td>${showDetailsOfItem.MGLT}</td>
      </tr>
      <tr>
      <td>Cargo Capacity</td>
      <td>${showDetailsOfItem.cargo_capacity}</td>
      </tr>
      <tr>
      <td>Consumables</td>
      <td>${showDetailsOfItem.consumables}</td>
      </tr>
      <tr>
      <td>Films</td>
      <td>${showDetailsOfItem.films}</td>
      </tr>
      <tr>
      <td>Pilots</td>
      <td>${showDetailsOfItem.pilots}</td>
      </tr>
      <tr>
      <td>URL</td>
      <td>${showDetailsOfItem.url}</td>
      </tr>
      <tr>
      <td>created</td>
      <td>${showDetailsOfItem.created}</td>
      </tr>
      <tr>
      <td>edited</td>
      <td>${showDetailsOfItem.edited}</td>
      </tr>`;
    }

    detailsTable.innerHTML = displayDetails;
    // console.log("wystwietlam dane tego itemu: ", showDetailsOfItem);

    // FUNKCJA ZAMYKAJĄCA DODATKOWĄ TABELĘ
    function closeDetails() {
      let tableToHide = document.getElementById("secondary-table");
      if (tableToHide.style.display === "none") {
      } else {
        tableToHide.style.display = "none";
      }
    }

    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", closeDetails);
  }
  const detailsButtons = document.querySelectorAll(".info-button");
  detailsButtons.forEach((button) => {
    button.addEventListener("click", showDetails);
  });
}

buttons();
