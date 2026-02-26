import { useState } from 'react';
import type { Room } from '../types';
import Toast from './Toast';

interface AddRoomFormProps {
  onAddRoom: (room: Room) => void;
  existingRooms: Room[];
}

export default function AddRoomForm({ onAddRoom, existingRooms }: AddRoomFormProps) {
  const [roomNo, setRoomNo] = useState('');
  const [capacity, setCapacity] = useState('');
  const [hasAC, setHasAC] = useState(false);
  const [hasWashroom, setHasWashroom] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (existingRooms.some(room => room.roomNo === roomNo)) {
      setToastMessage('Room number already exists!');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    if (parseInt(capacity) <= 0) {
      setToastMessage('Capacity must be positive!');
      setToastType('error');
      setShowToast(true);
      return;
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      roomNo,
      capacity: parseInt(capacity),
      hasAC,
      hasAttachedWashroom: hasWashroom
    };

    onAddRoom(newRoom);
    setToastMessage('Room added successfully!');
    setToastType('success');
    setShowToast(true);
    
    // Reset form
    setRoomNo('');
    setCapacity('');
    setHasAC(false);
    setHasWashroom(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Room Number *</label>
          <input
            type="text"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Enter room number"
            aria-label="Room Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity *</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
            placeholder="Enter capacity"
            aria-label="Room Capacity"
          />
        </div>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={(e) => setHasAC(e.target.checked)}
              className="mr-2"
              aria-label="Has Air Conditioning"
            />
            Air Conditioning
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasWashroom}
              onChange={(e) => setHasWashroom(e.target.checked)}
              className="mr-2"
              aria-label="Has Attached Washroom"
            />
            Attached Washroom
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Room
        </button>
      </form>
      <Toast 
        message={toastMessage} 
        type={toastType} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}