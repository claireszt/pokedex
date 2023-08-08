const pokemons_number = 151;

const colors = {
	fire: '#fc7030',
	grass: '#7ccc54',
	electric: '#fcd434',
	water: '#6c94f4',
	ground: '#e4c46c',
	rock: '#bca43c',
	fairy: '#80746a',
	poison: '#a444a4',
	bug: '#acbc24',
	dragon: '#743cfc',
	psychic: '#ff84c4',
	flying: '#ac94f4',
	fighting: '#c4342c',
	normal: '#80746a',
	dark: '#745c4c',
	ghost: '#784cd0',
	ice: '#9cdcdc',
	steel: '#bcbcd4'
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
    createPokemonCard(pokemon)
}

const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const pokemonTypes = []

    for (let i = 0 ; i < pokemon.types.length ; i++) {
        pokemonTypes.push(pokemon.types[i].type.name)
    }

    let type1 = `<div class="type">${pokemonTypes[0]}</div>`
    let type2 = ''
    if (pokemonTypes[1] !== undefined) {
        type2 = `<div class="type">${pokemonTypes[1]}</div>`
    }

	const type = main_types.find(type => pokemonTypes[0].indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = `${color}70`;

	const pokeInnerHTML = `
		<a href="pokedex.html?id=${pokemon.id}">
			<div class="info">
				<span class="number">#${pokemon.id
								.toString()
								.padStart(3, '0')}</span>
				<h3 class="name" style="color:${color}">${name}</h3>
				<div id="allTypes">${type1} ${type2}</div>
			</div>
			<div class="img-container">
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="${name}" />
				<div class="favorite"><i class="fa-regular fa-heart" style="color: #ffffff;"></i></div>
			</div>
		</a>
			`;

	pokemonEl.innerHTML = pokeInnerHTML;

	document.querySelector('.poke-container').appendChild(pokemonEl);
}

const selectedPoke = location.href.split("=")[1]

const fetchPokeData = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`
	const res = await fetch(url)
	const pokemon = await res.json()
	createPokeFiche(pokemon)
	createBottomSheet(pokemon)
};

const createPokeFiche = (pokemon) => {
	const ficheContainer = document.querySelector('.fiche-container')

	const pokemonTypes = []

    for (let i = 0 ; i < pokemon.types.length ; i++) {
        pokemonTypes.push(pokemon.types[i].type.name)
    }

	const type1Index = main_types.find(type => pokemonTypes[0].indexOf(type) > -1);
	const color1 = colors[type1Index];
	let color2

	if (pokemonTypes[1] !== undefined) {
		const type2Index = main_types.find(type => pokemonTypes[1].indexOf(type) > -1);
		color2 = colors[type2Index];
	}

	let type1 = `<div style="background-color:${color1}">${pokemonTypes[0]}</p></div>`
    let type2 = ''
    if (pokemonTypes[1] !== undefined) {
        type2 = `<div style="background-color:${color2}">${pokemonTypes[1]}</div>`
    }
	
	document.body.style.backgroundColor = `${color1}70`;

	const ficheInnerHTML = `
		<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png" alt="${name}" />
		<h1>${pokemon.name}</h1>
		<div class="types-fiche">${type1} ${type2}</div>
	`

	ficheContainer.innerHTML = ficheInnerHTML
}

const createBottomSheet = (pokemon) => {
	const bottomSheet = document.createElement('div');

	//info
	bottomSheet.classList.add('info-bottom');

	const infoInnerHTML = `
	<div id="title"><h1>info</h1> <i class="fa-solid fa-circle-info" style="color: #000000;"></i></div>
	`

	bottomSheet.innerHTML = infoInnerHTML
	document.querySelector('.fiche-container').appendChild(bottomSheet);
}

if (selectedPoke) {
	fetchPokeData(selectedPoke)
}
else {
	fetchPokemons()
}
