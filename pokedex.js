const pokemons_number = 151;

const colors = {
    normal: '#F5F5F5',
    fighting: '#E6E0D4',
    flying: '#F5F5F5',
    poison: '#98d7a5',
    ground: '#f4e7da',
	rock: '#d5d5d4',
    bug: '#f8d5a3',
    ghost: '#ffffff',
    steel: '#ffffff',
	fire: '#FDDFDF',
	water: '#DEF3FD',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	psychic: '#eaeda1',
    ice: '#ffffff',
	dragon: '#97b3e6',
    dark: '#ffffff',
	fairy: '#fceaff',
};
const main_types = Object.keys(colors);


const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i)
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const pokemon = await res.json()

    const pokemonTypes = []

    for (let i = 0 ; i < pokemon.types.length ; i++) {
        pokemonTypes.push(pokemon.types[i].type.name)
    }

    let type1 = pokemonTypes[0]
    let type2 = ''
    if (pokemonTypes[1] !== undefined && pokemonTypes[1] !== 'fairy') {
        type2 = `<img id="label" src="img/label-pixel/${pokemonTypes[1]}.png">`
    }

    document.querySelector('.pokedexContainer').innerHTML += `
        <div class="pokemonCard">
            <img src="${pokemon.sprites.front_default}">
            <p>#${pokemon.id.toString().padStart(3,"0")}</p>
            <h3>${pokemon.name}</h3>
            <span><img id="label" src="img/label-pixel/${type1}.png"> ${type2}</span>
        </div>
    `
};

fetchPokemons()