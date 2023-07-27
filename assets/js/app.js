//------------------------- Declaración de variables y constantes
const mainContainer = document.querySelector('main.flex');
const templateCard = document.querySelector('#template-card').content;
const fragment = document.createDocumentFragment();

//------------------------- Declaración de dunciones
const devolverNumeroPokemon = (min, max) => {
    const numeroPokemon = Math.floor(Math.random() * (max - min)) + min;
    return (numeroPokemon === 0) ? 1 : numeroPokemon;
};

//------------------------- Crea un objeto con los html de querySelector
const devolverElementosHTMLTemp = (template) => {
    const objetoHTML = {
        imagen: template.querySelector('.card .card-body .card-body-img'),
        tituloCard: template.querySelector('.card .card-body .card-body-title'),
        hp: template.querySelector('.card .card-body .card-body-title span'),
        experiencia: template.querySelector('.card .card-body .card-body-text'),
        descripcion: template.querySelectorAll('.card .card-footer .card-footer-social')
    };

    return objetoHTML;
};

//------------------------- Asigna una habilidad a cada elemento del footer
const recorrerHabilidades = (pokemon, descripcionHabilidades) => {
    descripcionHabilidades.forEach(div => {
        const htmlTituloHabilidad = div.querySelector('h3');
        const htmlPuntosHabilidad = div.querySelector('p');

        let tituloHabilidad = '';
        let puntosHabilidad = '';

        switch(htmlPuntosHabilidad.dataset.habilidad) {
            case 'ataque':
                puntosHabilidad = 'Ataque';
                tituloHabilidad = `${ pokemon.habilidad.ataque }K`;
                break;
            case 'especial':
                puntosHabilidad = 'Especial';
                tituloHabilidad = `${ pokemon.habilidad.especial }K`;
                break;
            case 'defensa':
                puntosHabilidad = 'Defensa';
                tituloHabilidad = `${ pokemon.habilidad.defensa }K`;
                break;
        }

        htmlTituloHabilidad.textContent = tituloHabilidad;
        htmlPuntosHabilidad.textContent = puntosHabilidad;
    });
};

//------------------------- Renderiza el template de la card
const pintarPokemon = (pokemon) => {
    //------------------------- Al no llamar a fetchBlob no es necesario el: .firstElementChild
    const clonTemplateCard = templateCard.cloneNode(true);
    const objetoHTML = devolverElementosHTMLTemp(clonTemplateCard);

    objetoHTML.imagen.setAttribute('src', pokemon.imagen);
    objetoHTML.tituloCard.textContent  = pokemon.nombre;
    objetoHTML.hp.textContent = `${pokemon.hp} hp`;
    objetoHTML.experiencia.textContent = `${ pokemon.experiencia } Exp`;

    recorrerHabilidades(pokemon, objetoHTML.descripcion);
    
    objetoHTML.tituloCard.appendChild(objetoHTML.hp);
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
            hp: data.stats[0].base_stat,//Daño que puede recibir el pokemon
            experiencia: data.base_experience,
            //------------------------- Propiedad objeto para las habilidades del pokemon
            habilidad: {
                ataque: data.stats[1].base_stat,
                especial: data.stats[3].base_stat,
                defensa: data.stats[2].base_stat
            }
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
