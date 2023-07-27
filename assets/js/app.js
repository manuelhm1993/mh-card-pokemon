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
    const clonTemplateCard = templateCard.firstElementChild.cloneNode(true);

    //------------------------- Hace el efecto capitalize, pone la primera letra en mayúscula
    const nombrePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    //------------------------- Hace el efecto capitalize, pone la primera letra en mayúscula
    const tituloCard = clonTemplateCard.querySelector('.card .card-body .card-body-title');
    const experiencia = tituloCard.querySelector('span');

    tituloCard.textContent  = nombrePokemon;
    experiencia.textContent = data.base_experience;

    fetchBlob(data.sprites.other.dream_world.front_default, clonTemplateCard);
    
    tituloCard.appendChild(experiencia);
    fragment.appendChild(clonTemplateCard);
    mainContainer.appendChild(fragment);
};

const fetchData = (url, numeroPokemon) => {
    //------------------------- Hace la petición a la API
    fetch(url + numeroPokemon)
    //------------------------- Recibe la respuesta y la transforma en JSON
    .then(res => res.json())
    //------------------------- Toma la respuesta en JSON y le da el tratamiento pertinente
    .then(data => pintarPokemon(data))
    //------------------------- Control de errores
    .catch(err => console.log(`Error al cargar el pokemon: ${ err.message }`));
};

const fetchBlob = (url, template) => {
    //------------------------- Hace la petición a la API
    fetch(url)
    //------------------------- Recibe la respuesta y la transforma en BLOB
    .then(res => res.blob())
    //------------------------- Toma la respuesta en BLOB y construye una url de imagen
    .then(data => {
        const objectURL = URL.createObjectURL(data);
        template.querySelector('.card .card-body .card-body-img').src = objectURL;
    })
    //------------------------- Control de errores
    .catch(err => console.log(err.message));
};

//------------------------- Eventos
document.addEventListener('DOMContentLoaded', (e) => {
    fetchData('https://pokeapi.co/api/v2/pokemon/', devolverNumeroPokemon(1, 151));
});
