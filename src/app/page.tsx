'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/types';
import { PokemonCard } from './components/Pokemoncard';
import { SearchBar } from './components/SearchBar';
import { TypeFilter } from './components/TypeFilter';
import { Loading } from './components/LoadingAndError';
import { Error } from './components/LoadingAndError';
import axios from 'axios';

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.data;
        console.log(data.results);
        
        const detailed = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await axios.get(pokemon.url);
            const details = await res.data;
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
              types: details.types.map((t: any) => t.type.name),
            };
          })
        );


        setPokemons(detailed);
        setFilteredPokemons(detailed);
      } catch (e) {
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const allTypes = Array.from(new Set(pokemons.flatMap((p) => p.types)));

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Pokemon Finder</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TypeFilter types={allTypes} selectedType={selectedType} onSelect={setSelectedType} />
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="text-center text-gray-500">No Pokemon found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
