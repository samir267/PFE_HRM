export interface IUniformType {
  name: 'SHIRT' | 'PANTS' | 'JACKET' | 'OTHER';
  availableSizes: string[];
  availableColors: string[];
  defaultCustomizationOptions?: {
    embroidery?: boolean;
    logo?: boolean;
    positions?: ('LEFT_CHEST' | 'RIGHT_CHEST' | 'BACK' | 'NONE')[];
  };
  basePrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
