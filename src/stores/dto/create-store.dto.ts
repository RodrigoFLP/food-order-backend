export class CreateStoreDto {
  id: number;
  name: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  addressReference: string;
  phoneNumber: string;
  isDeliveryEnabled: boolean;
  isPickupEnabled: boolean;
  isSchedulingEnabled: boolean;
  productException: boolean;
}
