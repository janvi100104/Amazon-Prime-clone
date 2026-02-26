import { useState } from 'react';
import type { Room, AllocationCriteria } from '../types';
import { allocateRoom } from '../utils/allocationLogic';
import Toast from './Toast';

interface AllocationToolProps {
  rooms: Room[];
}

export default function AllocationTool({ rooms }: AllocationToolProps) {
  const [students, setStudents] = useState('');
  const [needAC, setNeedAC] = useState(false);
  const [needWashroom, setNeedWashroom] = useState(false);
  const [result, setResult] = useState<Room | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleAllocate = () => {
    if (parseInt(students) <= 0) {
      setToastMessage('Number of students must be positive!');
      setToastType('error');
      setShowToast(true);
      return;
    }

    const criteria: AllocationCriteria = {
      students: parseInt(students),
      needAC,
      needWashroom
    };

    const allocatedRoom = allocateRoom(rooms, criteria);
    setResult(allocatedRoom);

    if (allocatedRoom) {
      setToastMessage(`Room ${allocatedRoom.roomNo} allocated successfully!`);
      setToastType('success');
    } else {
      setToastMessage('No suitable room available for the given criteria.');
      setToastType('error');
    }
    setShowToast(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Room Allocation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Number of Students *</label>
          <input
            type="number"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
            placeholder="Enter number of students"
            aria-label="Number of Students"
          />
        </div>
        <div className="flex items-end space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={needAC}
              onChange={(e) => setNeedAC(e.target.checked)}
              className="mr-2"
              aria-label="Need Air Conditioning"
            />
            Need AC
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={needWashroom}
              onChange={(e) => setNeedWashroom(e.target.checked)}
              className="mr-2"
              aria-label="Need Attached Washroom"
            />
            Need Washroom
          </label>
        </div>
      </div>
      <button
        onClick={handleAllocate}
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Allocate Room
      </button>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Allocation Result</h3>
          <div className="space-y-1">
            <p><span className="font-medium">Room Number:</span> {result.roomNo}</p>
            <p><span className="font-medium">Capacity:</span> {result.capacity} students</p>
            <p><span className="font-medium">Air Conditioning:</span> {result.hasAC ? 'Yes' : 'No'}</p>
            <p><span className="font-medium">Attached Washroom:</span> {result.hasAttachedWashroom ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}

      <Toast 
        message={toastMessage} 
        type={toastType} 
        show={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}