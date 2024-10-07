import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

function AppContent() {
  const { darkMode } = useTheme();
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Pokédex</h1>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
