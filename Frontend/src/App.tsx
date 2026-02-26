import { useState } from 'react';
import AddRoomForm from './components/AddRoomForm';
import RoomList from './components/RoomList';
import SearchFilter from './components/SearchFilter';
import AllocationTool from './components/AllocationTool';
import type { Room } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [rooms, setRooms] = useLocalStorage<Room[]>('hostel_rooms', []);
  const [filters, setFilters] = useState({
    minCapacity: 0,
    acFilter: 'any' as 'any' | 'yes' | 'no',
    washroomFilter: 'any' as 'any' | 'yes' | 'no'
  });

  // Compute filtered rooms directly
  const filteredRooms = (() => {
    let result = [...rooms];
    
    // Apply capacity filter
    if (filters.minCapacity > 0) {
      result = result.filter(room => room.capacity >= filters.minCapacity);
    }
    
    // Apply AC filter
    if (filters.acFilter !== 'any') {
      const needAC = filters.acFilter === 'yes';
      result = result.filter(room => room.hasAC === needAC);
    }
    
    // Apply washroom filter
    if (filters.washroomFilter !== 'any') {
      const needWashroom = filters.washroomFilter === 'yes';
      result = result.filter(room => room.hasAttachedWashroom === needWashroom);
    }
    
    return result;
  })();

  const handleAddRoom = (newRoom: Room) => {
    setRooms(prev => [...prev, newRoom]);
  };

  const handleRemoveRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Smart Hostel Room Allocation System</h1>
          <p className="text-blue-100 mt-1">Manage hostel rooms and allocate students efficiently</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4 max-w-6xl">
        <div className="mb-8">
          <AddRoomForm onAddRoom={handleAddRoom} existingRooms={rooms} />
        </div>
        
        <div className="mb-8">
          <SearchFilter onFilter={handleFilter} />
        </div>
        
        <div className="mb-8">
          <RoomList rooms={filteredRooms} onRemoveRoom={handleRemoveRoom} />
        </div>
        
        <div>
          <AllocationTool rooms={rooms} />
        </div>
      </main>
    </div>
  );
}

export default App
