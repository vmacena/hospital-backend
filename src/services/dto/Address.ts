export interface Address {
  id: number;
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: number;
  complement?: string;
}   