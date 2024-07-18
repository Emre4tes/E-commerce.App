export interface Order {
  amount: number;
  order: any;
  id: number;
  name: string;
  price: number;
  qty: number;
  weight: number;
}

export interface Shipping {
  carrier: string;
  address: {
    name: string;
    phone: string;
    address_line1: string;
    city_locality: string;
    state_province: string;
    postal_code: string;
    country_code: string;
  };
  cost: number;
}

export interface Tax {
  amount: number;
}

export interface OrderSummary {
  order: Order[];
  shipping: Shipping;
  tax: Tax;
}
