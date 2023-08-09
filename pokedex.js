
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
let menu

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
	menu = document.querySelector('.top-menu')
	menu.innerHTML = `<i class="fa-solid fa-bars"></i>
	<h1>pokedex</h1>
	<div onclick="onSearch()"><i class="fa-solid fa-magnifying-glass"></i></div>`

	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const pokemonTypes = []

	for (let i = 0; i < pokemon.types.length; i++) {
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
	menu = document.querySelector('.top-menu')
	menu.innerHTML = `<a href="pokedex.html"><i class="fa-solid fa-arrow-left"></i></a>
	<div><i class="fa-regular fa-heart"></i>
	<h3>#${pokemon.id.toString().padStart(3, '0')}</h3></div>`

	const ficheContainer = document.querySelector('.fiche-container')

	const pokemonTypes = []

	for (let i = 0; i < pokemon.types.length; i++) {
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
		<h1 style="text-transform:capitalize">${pokemon.name}</h1>
		<div class="types-fiche">${type1} ${type2}</div>
	`

	ficheContainer.innerHTML = ficheInnerHTML
}

async function fetchSpecies(selectedPoke) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPoke}`);
	const data = await response.json();
	const species = data.genera[7].genus;
	return species;
}


const createBottomSheet = (pokemon) => {
	const bottomSheet = document.createElement('div');

	//info
	bottomSheet.classList.add('info-bottom');
	let pokeWeight
	if (pokemon.weight.toString().length == 1) {
		pokeWeight = `0.${pokemon.weight} kg`
	}
	else {
		pokeWeight = pokemon.weight.toString().slice(0, pokemon.weight.toString().length - 1) + '.' + pokemon.weight.toString().slice(-1) + ' kg'
	}

	let pokeHeight
	if (pokemon.height.toString().length == 1) {
		pokeHeight = `0.${pokemon.height} m`
	}
	else {
		pokeHeight = pokemon.height.toString().slice(0, pokemon.height.toString().length - 1) + '.' + pokemon.height.toString().slice(-1) + ' m'
	}

	const abilities = pokemon.abilities.map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1))

	fetchSpecies(pokemon.id)
		.then((species) => {
			const infoInnerHTML = `
	<div id="title"><h1>info</h1> <i class="fa-solid fa-circle-info" style="color: #000000;"></i></div>
	<table>
		<tr>
			<td class="table-title">Species<td>
			<td class="table-data">${species}</td>
		</tr>
		<tr>
			<td class="table-title">Weight<td>
			<td class="table-data">${pokeWeight}</td>
		</tr>
		<tr>
			<td class="table-title">Height<td>
			<td class="table-data">${pokeHeight}</td>
		</tr>
		<tr>
			<td class="table-title">Abilities<td>
			<td class="table-data">${abilities.join(`<br>`)}</td>
		</tr>
	</table>

	<div id="title"><h1>evolutions</h1> <i class="fa-solid fa-arrow-trend-up"></i></div>

	
	`

			bottomSheet.innerHTML = infoInnerHTML
			document.querySelector('.fiche-container').appendChild(bottomSheet);

		}

		)
}



if (selectedPoke) {
	fetchPokeData(selectedPoke)
}
else {
	fetchPokemons()
}

// search
const onSearch = () => {
	const search = document.querySelector('.search')
	search.innerHTML = `<div class="input-container">
	<input type="text" id="input" required="">
	<label for="input" class="label">search</label>
	<div class="underline"></div>
  </div>
  `

	const input = document.querySelector('#input')
	const allElements = document.querySelectorAll('.pokemon')

	allElements.forEach((div) => {
		input.addEventListener("input", function () {
			div.style.display = div.innerText.split('\n')[1].toUpperCase().includes(input.value.toUpperCase()) ? "" : "none"
		})
	})

}