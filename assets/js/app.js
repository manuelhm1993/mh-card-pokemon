//------------------------- Declaración de variables y constantes
const mainContainer = document.querySelector('main.flex');
const templateCard = document.querySelector('#template-card').content;
const fragment = document.createDocumentFragment();

//------------------------- Declaración de dunciones
const devolverNumeroPokemon = (min, max) => {
    const numeroPokemon = Math.floor(Math.random() * (max - min)) + min;
    return (numeroPokemon === 0) ? 1 : numeroPokemon;
};

const pintarPokemon = (pokemon) => {
    //------------------------- Al no llamar a fetchBlob no es necesario el: .firstElementChild
    const clonTemplateCard = templateCard.cloneNode(true);

    //------------------------- Hace el efecto capitalize, pone la primera letra en mayúscula
    const imagen = clonTemplateCard.querySelector('.card .card-body .card-body-img');
    const tituloCard = clonTemplateCard.querySelector('.card .card-body .card-body-title');
    const hp = tituloCard.querySelector('span');

    imagen.setAttribute('src', pokemon.imagen);
    tituloCard.textContent  = pokemon.nombre;
    hp.textContent = `${pokemon.hp} hp`;
    
    tituloCard.appendChild(hp);
    fragment.appendChild(clonTemplateCard);
    mainContainer.appendChild(fragment);
};

//------------------------- Peticiones fetch
const fetchData = (url, numeroPokemon) => {
    //------------------------- Hace la petición a la API
    fetch(url + numeroPokemon)
    //------------------------- Recibe la respuesta y la transforma en JSON
    .then(res => res.json())
    //------------------------- Toma la respuesta en JSON y le da el tratamiento pertinente
    .then(data => {
        //------------------------- Crear un objeto pokemon con los valores de data
        const pokemon = {
            nombre: data.name,
            imagen: data.sprites.other.dream_world.front_default,
            hp: data.stats[0].base_stat//Daño que puede recibir el pokemon
        };

        pintarPokemon(pokemon);
    })
    //------------------------- Control de errores
    .catch(err => console.log(`Error al cargar el pokemon: ${ err.message }`));
};

//------------------------- De esta manera se solicita un recurso de tipo imagen por fetch
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
