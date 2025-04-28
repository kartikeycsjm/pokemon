type TypeFilterProps = {
    types: string[];
    selectedType: string;
    onSelect: (type: string) => void;
  };
  
  export function TypeFilter({ types, selectedType, onSelect }: TypeFilterProps) {
    return (
      <select
        className="border p-2 rounded w-60"
        value={selectedType}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>
    );
  }
  