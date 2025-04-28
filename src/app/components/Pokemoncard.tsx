import { Pokemon } from "@/types";

type PokemonCardProps = {
  pokemon: Pokemon;
};

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-24" />
      <h2 className="text-lg font-bold capitalize mt-2">{pokemon.name}</h2>
      <p className="text-sm text-gray-500">#{pokemon.id}</p>
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {pokemon.types.map((type) => (
          <span key={type} className="px-2 py-1 text-xs bg-gray-200 rounded-full">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
