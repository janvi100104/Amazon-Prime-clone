import { useState } from 'react';

interface SearchFilterProps {
  onFilter: (filters: {
    minCapacity: number;
    acFilter: 'any' | 'yes' | 'no';
    washroomFilter: 'any' | 'yes' | 'no';
  }) => void;
}

export default function SearchFilter({ onFilter }: SearchFilterProps) {
  const [minCapacity, setMinCapacity] = useState('');
  const [acFilter, setAcFilter] = useState<'any' | 'yes' | 'no'>('any');
  const [washroomFilter, setWashroomFilter] = useState<'any' | 'yes' | 'no'>('any');

  const handleApply = () => {
    onFilter({
      minCapacity: parseInt(minCapacity) || 0,
      acFilter,
      washroomFilter
    });
  };

  const handleReset = () => {
    setMinCapacity('');
    setAcFilter('any');
    setWashroomFilter('any');
    onFilter({
      minCapacity: 0,
      acFilter: 'any',
      washroomFilter: 'any'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Minimum Capacity</label>
          <input
            type="number"
            value={minCapacity}
            onChange={(e) => setMinCapacity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            placeholder="Enter minimum capacity"
            aria-label="Minimum Capacity"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Air Conditioning</label>
          <select
            value={acFilter}
            onChange={(e) => setAcFilter(e.target.value as 'any' | 'yes' | 'no')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Air Conditioning Filter"
          >
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Attached Washroom</label>
          <select
            value={washroomFilter}
            onChange={(e) => setWashroomFilter(e.target.value as 'any' | 'yes' | 'no')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Attached Washroom Filter"
          >
            <option value="any">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}