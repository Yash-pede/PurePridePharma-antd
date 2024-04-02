export interface ProductType {
  id: string;
  name: string;
  updated_at: Date;
  price: number;
  description: string;
  imageURL: string;
}
export enum OrderStatus {
  PENDING = "Pending",
  FULFILLED = "Fulfilled",
  CANCELLED = "Cancelled",
  INPROCESS = "InProcess",
  DEFECTED = "Defected",
}
export enum UserRoleTypes {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  DISTRIBUTORS = "DISTRIBUTORS",
  SALES = "SALES",
  CUSTOMERS = "CUSTOMERS",
  UNDEFINED = "UNDEFINED",
}

export type challanProductAddingType = {
  product_id: string;
  quantity: number;
  discount: number;
};
