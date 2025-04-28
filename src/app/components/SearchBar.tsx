type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        className="border p-2 rounded w-60"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  