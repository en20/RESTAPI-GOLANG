import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <FaSearch
        size={20}
        color="#9CA3AF"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
