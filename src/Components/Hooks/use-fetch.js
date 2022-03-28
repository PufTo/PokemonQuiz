// https://pokeapi.co/api/v2/pokemon-form/35
import { useState, useEffect } from "react";

const useFetch = (index, pokemonID) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  useEffect(() => {
    // if (!index || !pokemonList) return;

    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-form/${pokemonID}`
      );
      const data = await response.json();

      setPokemonName(data.pokemon.name);
      setIsLoading(false);
    };

    fetchData();
  }, [index]);

  return { pokemonName, isLoading };
};

export default useFetch;
