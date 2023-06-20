const container = document.querySelector("#container");

const API = "https://pokeapi.co/api/v2/pokemon";
const limit = 20;
let offset = 0;

const fetchData = async (url, options = {}) => {
    try {
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const cargaInicio = async () => {
    let data = await fetchData(`${API}?offset=${offset}&limit=${limit}`);
    tablaProducts(data.results);
    updateButtons(data);
    console.log(data);
};

const tablaProducts = async (results) => {
    let guardar = "";

    for (const element of results) {
        let pokemonData = await fetchData(element.url);
        let imageUrl = pokemonData.sprites.other["official-artwork"].front_default; // Obtener la URL de la imagen de tamaño mediano

        let abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(", ");
        let stats = pokemonData.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ");
        let types = pokemonData.types.map((type) => type.type.name).join(", ");

        let card = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card mb-4 bg-dark" style=" width: 17rem; wrap: 1rem; height: 30rem; align-items: center; border: 3px aqua solid #ffc219; outline: 4px solid #ffc219;">
                    <h5 class="card-title text-danger" style="font-size: 16px;">Name: ${element.name}</h5>
                    <img src="${imageUrl}" style="max-width: 250px;" class="card-img-top border" alt="...">
                    <div class="card-body">
                    <p class="card-text text-warning">Abilities: ${abilities}</p>
                    <p class="card-text text-warning">Stats: ${stats}</p>
                    <p class="card-text text-warning">Types: ${types}</p>
                    </div>
                </div>
            </div>
        `;
        guardar += card;
    }

    container.innerHTML = `
        <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" >
            ${guardar}
        </div>
    `;
};

const updateButtons = (data) => {
    previousButton.disabled = offset === 0;
    nextButton.disabled = data.next === null;
};

const previousButton = document.querySelector("#previousButton");
previousButton.addEventListener("click", () => {
    if (offset >= limit) {
        offset -= limit;
        cargaInicio();
    }
});

const nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", () => {
    offset += limit;
    cargaInicio();
});

cargaInicio();







