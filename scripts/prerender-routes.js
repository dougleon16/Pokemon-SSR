(async () => {
  const fs = require("node:fs");
  const routesTxtFile = "routes.txt";
  const TOTAL_POKEMONS = 151;
  const TOTAL_PAGES = 10;

  function generateRoutes(path, total) {
    return Array.from({ length: total }, (_, i) => `/${path}/${i + 1}`);
  }
  const pokemonNameRespone = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  const pokemonNameRoutes = pokemonNameRespone.results.map(
    (pokemon) => `/pokemons/${pokemon.name}`
  );
  const pokemonsRoutes = generateRoutes("pokemons", TOTAL_POKEMONS);
  const pagesRoutes = generateRoutes("pokemons/page", TOTAL_PAGES);

  const routes = [...pokemonsRoutes, ...pagesRoutes, ...pokemonNameRoutes];

  fs.writeFileSync(routesTxtFile, routes.join("\n"));
  console.log(`Wrote ${routes.length} routes to ${routesTxtFile}`);
})();
