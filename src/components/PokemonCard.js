import React from 'react';
import { Link } from 'react-router-dom';

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

function PokemonCard({ pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const [color1, color2] = typeColors[mainType];
  const cardStyle = {
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card" style={cardStyle}>
      <div className="card-content">
        <img src={pokemon.sprites.front_default} alt={pokemon.frenchName} />
        <h3>{pokemon.frenchName}</h3>
        <p>Type : {typeTranslations[mainType]}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;
