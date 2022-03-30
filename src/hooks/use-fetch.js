import { Polyline } from "@mui/icons-material";
import { useState, useEffect } from "react";

const fetchPokemonName = async (pokemonId) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-form/${pokemonId}`
  );
  const data = await response.json();

  return data.pokemon.name;
};

const fetchImage = async (pokemonId) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
  );

  const result = await response.blob();
  const resultFinal = URL.createObjectURL(result);
  console.log(resultFinal);

  return resultFinal;
};

const useFetch = (pokemonId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
  });

  useEffect(async () => {
    setIsLoading(true);
    // const pokemonData = await fetchData(pokemonId);
    // const pokemonImage = await fetchImage(pokemonId);
    const [pokemonName, pokemonImage] = await Promise.all([
      fetchPokemonName(pokemonId),
      fetchImage(pokemonId),
    ]);
    const pokemonInfo = { name: pokemonName, image: pokemonImage };
    console.log(pokemonInfo);
    setPokemon(pokemonInfo);
    setIsLoading(false);
  }, [pokemonId]);

  return { pokemon, isLoading };
};

export default useFetch;
