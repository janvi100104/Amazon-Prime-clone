export interface Room {
  id: string;
  roomNo: string;
  capacity: number;
  hasAC: boolean;
  hasAttachedWashroom: boolean;
}

export interface AllocationCriteria {
  students: number;
  needAC: boolean;
  needWashroom: boolean;
}