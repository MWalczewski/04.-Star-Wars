class Base {
  constructor(name, created, url) {
    this.url = url;
    this.name = name;
    this.created = created;
  }
  whoAmI() {
    console.log(`I am ${this.name}`);
  }
}

class People extends Base {
  constructor(
    name,
    skin_color,
    birth_year,
    mass,
    created,
    url,
    eye_color,
    gender,
    hair_color,
    height,
    homeworld,
    films,
    species,
    straships,
    vehicles
  ) {
    super(name, created, url);
    this.skin_color = skin_color;
    this.birth_year = birth_year;
    this.mass = mass;
    this.eye_color = eye_color;
    this.gender = gender;
    this.hair_color - hair_color;
    this.height = height;
    this.homeworld = homeworld;
    this.films = films;
    this.species = species;
    this.straships = straships;
    this.vehicles = vehicles;
  }
}

class Planets extends Base {
  constructor(name, climate, orbital_period, diameter, created, url) {
    super(name, created, url);
    this.climate = climate;
    this.orbital_period = orbital_period;
    this.diameter = diameter;
  }
}

class Films extends Base {
  constructor(name, title, director, producer, release_date, created, url) {
    super(name, created, url);
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
  }
}

class Species extends Base {
  constructor(name, classification, designation, language, created, url) {
    super(name, created, url);
    this.classification = classification;
    this.designation = designation;
    this.language = language;
  }
}

class Vehicle extends Base {
  constructor(name, manufacturer, model, crew, created, url) {
    super(name, created, url);
    this.manufacturer = manufacturer;
    this.model = model;
    this.crew = crew;
  }
}

class Starships extends Base {
  constructor(name, manufacturer, model, crew, created, url) {
    super(name, created, url);
    this.manufacturer = manufacturer;
    this.model = model;
    this.crew = crew;
  }
}
