import type { Room } from '../types';
import RoomCard from './RoomCard';

interface RoomListProps {
  rooms: Room[];
  onRemoveRoom: (id: string) => void;
}

export default function RoomList({ rooms, onRemoveRoom }: RoomListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Room Inventory ({rooms.length})</h2>
      {rooms.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No rooms added yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map(room => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onRemove={() => onRemoveRoom(room.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}