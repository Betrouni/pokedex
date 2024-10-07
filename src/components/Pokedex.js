import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from '../ThemeContext';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        return Promise.all(response.data.results.map(pokemon => 
          Promise.all([
            axios.get(pokemon.url),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
          ])
        ));
      })
      .then(pokemonData => {
        setPokemons(pokemonData.map(([pokemonDetails, speciesDetails]) => ({
          ...pokemonDetails.data,
          frenchName: speciesDetails.data.names.find(name => name.language.name === 'fr').name
        })));
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des Pokémon:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.frenchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`pokedex ${darkMode ? 'dark-mode' : ''}`}>
      <input
        type="text"
        placeholder="Rechercher un Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-list">
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;
