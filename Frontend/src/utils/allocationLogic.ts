import type { Room, AllocationCriteria } from '../types';

export function allocateRoom(rooms: Room[], criteria: AllocationCriteria): Room | null {
  // Filter rooms by AC and washroom requirements
  const filteredRooms = rooms.filter(room => {
    if (criteria.needAC && !room.hasAC) return false;
    if (criteria.needWashroom && !room.hasAttachedWashroom) return false;
    return room.capacity >= criteria.students;
  });

  // Sort by capacity (ascending)
  filteredRooms.sort((a, b) => a.capacity - b.capacity);

  // Return first matching room or null
  return filteredRooms[0] || null;
}