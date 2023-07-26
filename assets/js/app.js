//------------------------- Declaración de variables y constantes
const mainContainer = document.querySelector('main.flex');
const templateCard = document.querySelector('#template-card').content;
const fragment = document.createDocumentFragment();

//------------------------- Declaración de dunciones
const devolverNumeroPokemon = (min, max) => {
    const numeroPokemon = Math.floor(Math.random() * (max - min)) + min;
    return (numeroPokemon === 0) ? 1 : numeroPokemon;
};

const pintarPokemon = (data) => {
    
};

const fetchData = (url, numeroPokemon) => {
    //------------------------- Hace la petición a la API
    fetch(url + numeroPokemon)
    //------------------------- Recibe la respuesta y la transforpa en JSON
    .then(res => res.json())
    //------------------------- Toma la respuesta en JSON y le da el tratamiento pertinente
    .then(data => pintarPokemon(data))
    //------------------------- Control de errores
    .catch(err => console.log(`Error al cargar el pokemon: ${ err.message }`));
};

//------------------------- Eventos
document.addEventListener('DOMContentLoaded', (e) => {
    fetchData('https://pokeapi.co/api/v2/pokemon/', devolverNumeroPokemon(1, 151));
});
