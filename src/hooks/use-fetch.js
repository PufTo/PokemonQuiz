import { useState, useEffect } from "react";

const fetchData = async (pokemonId) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-form/${pokemonId}`
  );
  const data = await response.json();

  return data;
};

const useFetch = (pokemonId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  useEffect(async () => {
    setIsLoading(true);
    const data = await fetchData(pokemonId);
    setPokemonName(data.pokemon.name);
    setIsLoading(false);
  }, [pokemonId]);

  return { pokemonName, isLoading };
};

export default useFetch;
