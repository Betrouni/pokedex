import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const typeTranslations = {
  normal: 'Normal',
  fire: 'Feu',
  water: 'Eau',
  electric: 'Électrik',
  grass: 'Plante',
  ice: 'Glace',
  fighting: 'Combat',
  poison: 'Poison',
  ground: 'Sol',
  flying: 'Vol',
  psychic: 'Psy',
  bug: 'Insecte',
  rock: 'Roche',
  ghost: 'Spectre',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  steel: 'Acier',
  fairy: 'Fée'
};

const statTranslations = {
  hp: 'PV',
  attack: 'Attaque',
  defense: 'Défense',
  'special-attack': 'Attaque Spéciale',
  'special-defense': 'Défense Spéciale',
  speed: 'Vitesse'
};

const typeColors = {
  normal: ['#A8A878', '#6D6D4E'],
  fire: ['#F08030', '#9C531F'],
  water: ['#6890F0', '#445E9C'],
  electric: ['#F8D030', '#A1871F'],
  grass: ['#78C850', '#4E8234'],
  ice: ['#98D8D8', '#638D8D'],
  fighting: ['#C03028', '#7D1F1A'],
  poison: ['#A040A0', '#682A68'],
  ground: ['#E0C068', '#927D44'],
  flying: ['#A890F0', '#6D5E9C'],
  psychic: ['#F85888', '#A13959'],
  bug: ['#A8B820', '#6D7815'],
  rock: ['#B8A038', '#786824'],
  ghost: ['#705898', '#493963'],
  dragon: ['#7038F8', '#4924A1'],
  dark: ['#705848', '#49392F'],
  steel: ['#B8B8D0', '#787887'],
  fairy: ['#EE99AC', '#9B6470']
};

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const [frenchName, setFrenchName] = useState('');
  const { id } = useParams();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]).then(([pokemonResponse, speciesResponse]) => {
      setPokemon(pokemonResponse.data);
      const frName = speciesResponse.data.names.find(name => name.language.name === 'fr').name;
      setFrenchName(frName);
    }).catch(error => {
      console.error("Erreur lors du chargement des détails du Pokémon:", error);
    });
  }, [id]);

  if (!pokemon) return <div>Chargement...</div>;

  const mainType = pokemon.types[0].type.name;
  const [color1, color2] = typeColors[mainType];
  const cardStyle = {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    borderRadius: '20px',
    padding: '20px',
    color: '#fff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className={`pokemon-detail ${darkMode ? 'dark-mode' : ''}`} style={cardStyle}>
      <button onClick={() => navigate(-1)} className="back-button">Retour</button>
      <div className="detail-content">
        <img src={pokemon.sprites.front_default} alt={frenchName} />
        <h2>{frenchName}</h2>
        <p>Type : {pokemon.types.map(type => typeTranslations[type.type.name]).join(', ')}</p>
        <h3>Capacités :</h3>
        <ul>
          {pokemon.abilities.map(ability => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <h3>Statistiques :</h3>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>{statTranslations[stat.stat.name]}: {stat.base_stat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;