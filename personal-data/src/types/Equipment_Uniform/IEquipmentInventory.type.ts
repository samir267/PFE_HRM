export interface IEquipmentInventory {
  equipmentTypeId: string;
  serialNumber: string;
  assetTag: string;
  purchaseInfo: {
    purchaseDate: Date;
    vendor: string;
    purchasePrice: number;
    warranty: {
      startDate: Date;
      endDate: Date;
      type: string;
    };
  };
  currentStatus: string;
  condition: string;
  location: {
    building: string;
    floor: string;
    room: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
}
