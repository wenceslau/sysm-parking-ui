export interface Register {
  parkedVehicles: ParkedVehicle[];
  checkoutVehicles: CheckoutVehicle[];
}

export interface ParkedVehicle {
  plate: string;
  checkIn: Date;
}

export interface CheckoutVehicle {
  plate: string;
  checkOut: Date;
  duration: number;
  amount: number;
}

export interface Registration {
  plate: string;
  vehicleType: string;
  checkIn: Date;
  checkOut: Date;
  duration: number;
  amount: number;
}
