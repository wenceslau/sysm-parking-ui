export interface Register {
  parkedVehicles: CheckInVehicle[];
  checkoutVehicles: CheckOutVehicle[];
}

export interface CheckInVehicle {
  plate: string;
  vehicleType: string;
  checkIn: Date;
}

export interface CheckOutVehicle {
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
