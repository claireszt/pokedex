const pokemons_number = 151;

const colors = {
	fire: '#ff9e55',
	grass: '#63bc5b',
	electric: '#f4d23b',
	water: '#5090d6',
	ground: '#d97845',
	rock: '#c6b78c',
	poison: '#aa6bc8',
	bug: '#91c12e',
	dragon: '#0a6dc3',
	psychic: '#fa7179',
	flying: '#8fa9de',
	fighting: '#ce426b',
	normal: '#919aa2',
	dark: '#745c4c',
	ghost: '#5369ad',
	ice: '#73cec0'
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
		if (pokemon.past_types.length == 0) {
			pokemonTypes.push(pokemon.types[i].type.name)
		}
		else {
			pokemonTypes.push(pokemon.past_types[0].types[0].type.name)
		}
	}

	let type1 = `<div class="type">${pokemonTypes[0]}</div>`
	let type2 = ''
	if (pokemonTypes[1] !== undefined) {
		type2 = `<div class="type">${pokemonTypes[1]}</div>`
	}

	const type = main_types.find(type => pokemonTypes[0].indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = `${color}80`;

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
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}" />
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
};

async function fetchSpecies(selectedPoke) {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectedPoke}`);
	const data = await response.json();
	const species = data.flavor_text_entries[0].flavor_text
	return species;
}

const createPokeFiche = (pokemon) => {
	menu = document.querySelector('.top-menu')
	menu.innerHTML = `
	<div><a href="pokedex.html"><i class="fa-solid fa-arrow-left" style="color: #ffffff;"></i><h2 style="text-transform:capitalize; color:#ffffff">${pokemon.name}</h2></a></div>
	<div><i class="fa-regular fa-heart" style="color: #ffffff;"></i>
	<h3 style="color: #ffffff;">#${pokemon.id.toString().padStart(3, '0')}</h3></div>`

	const ficheContainer = document.querySelector('.poke-fiche')

	const pokemonTypes = []

	for (let i = 0; i < pokemon.types.length; i++) {
		if (pokemon.past_types.length == 0) {
			pokemonTypes.push(pokemon.types[i].type.name)
		}
		else {
			pokemonTypes.push(pokemon.past_types[0].types[0].type.name)
		}
	}

	const type1Index = main_types.find(type => pokemonTypes[0].indexOf(type) > -1);
	const color1 = colors[type1Index];
	let color2

	if (pokemonTypes[1] !== undefined) {
		const type2Index = main_types.find(type => pokemonTypes[1].indexOf(type) > -1);
		color2 = colors[type2Index];
	}

	let type1 = `<div style="background-color:${color1}">${pokemonTypes[0]}</div>`
	let type2 = ''
	if (pokemonTypes[1] !== undefined) {
		type2 = `<div style="background-color:${color2}">${pokemonTypes[1]}</div>`
	}

	document.body.style.backgroundColor = `${color1}80`;

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
	const aboutInnerHTML = `
			<div class="fiche-nav">
				<a href="pokedex.html?id=${pokemon.id-1}"><i class="fa-solid fa-chevron-left" style="color: #ffffff;"></i></a>
				<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}" />
				<a href="pokedex.html?id=${pokemon.id+1}"><i class="fa-solid fa-chevron-right" style="color: #ffffff;"></i></a>
			</div>
			<div class="types-fiche">
				${type1} ${type2}
			</div>
			<h3 style="color:${color1}">About</h3>
			<div class="about-fiche">
				<div class="poke-about">
					<p>weight</p>
					${pokeWeight}
				</div>
				<div class="poke-about">
					<p>height</p>
					${pokeHeight}
				</div>
				<div class="poke-about">
					<p>abilities</p>
					${abilities.join(`<br>`)}
				</div>
			</div>
			<p>${species}</p>
	`
	const pokestats = [
		{"name":"hp",
			"stats": {
			"base": pokemon.stats[0].base_stat,
			"max":pokemon.stats[0].base_stat*2+204
		}},
		{"name":"atk",
			"stats": {
			"base": pokemon.stats[1].base_stat,
			"max":pokemon.stats[1].base_stat*2+99
		}},
		{"name":"def",
			"stats": {
			"base": pokemon.stats[2].base_stat,
			"max":pokemon.stats[2].base_stat*2+99
		}},
		{"name":"s atk",
			"stats": {
			"base": pokemon.stats[3].base_stat,
			"max":pokemon.stats[3].base_stat*2+99
		}},
		{"name":"s def",
			"stats": {
			"base": pokemon.stats[4].base_stat,
			"max":pokemon.stats[4].base_stat*2+99
		}},
		{"name":"spd",
			"stats": {
			"base": pokemon.stats[5].base_stat,
			"max":pokemon.stats[5].base_stat*2+99
		}}
	]

	let statsInnerHTML = `
	<h3 style="color:${color1}">Base Stats</h3>	
	`

	for (let stats of pokestats) {
		statsInnerHTML += `
		<div class="stats-div"><div style="color:${color1}">${stats.name}</div><div> ${stats.stats.base.toString().padStart(3, '0')}</div><div class="progress-container"><div class="progress-value" style="background-color:${color1};width:${stats.stats.base*100/stats.stats.max}%"></div></div></div>
		`
	}

	ficheContainer.innerHTML = aboutInnerHTML + statsInnerHTML
		})
}

if (selectedPoke) {
	fetchPokeData(selectedPoke)
}
else {
	fetchPokemons()
}

let searchOpen = false;

const onSearch = () => {
  const search = document.querySelector('.search');

  if (!searchOpen) {
    search.innerHTML = `<div class="input-container">
      <input type="text" id="input" required="">
      <label for="input" class="label">search</label>
      <div class="underline"></div>
    </div>`;
    
    const input = document.querySelector('#input');
    const allElements = document.querySelectorAll('.pokemon');

    allElements.forEach((div) => {
      input.addEventListener("input", function () {
        div.style.display = div.innerText.split('\n')[1].toUpperCase().includes(input.value.toUpperCase()) ? "" : "none";
      });
    });

    searchOpen = true;
  } else {
    search.innerHTML = '';
    searchOpen = false;
  }
};
