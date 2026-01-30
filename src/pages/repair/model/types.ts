export type RepairShop = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  distance?: number;
  placeUrl?: string;
};
