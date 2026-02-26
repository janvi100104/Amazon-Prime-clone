import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onRemove: () => void;
}

export default function RoomCard({ room, onRemove }: RoomCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">Room {room.roomNo}</h3>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
      <div className="space-y-1 text-sm">
        <p>Capacity: <span className="font-medium">{room.capacity} students</span></p>
        <p>AC: <span className={room.hasAC ? 'text-green-600' : 'text-gray-400'}>
          {room.hasAC ? 'Yes' : 'No'}
        </span></p>
        <p>Washroom: <span className={room.hasAttachedWashroom ? 'text-green-600' : 'text-gray-400'}>
          {room.hasAttachedWashroom ? 'Yes' : 'No'}
        </span></p>
      </div>
    </div>
  );
}