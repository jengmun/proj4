export interface productType {
  product_id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  price: number;
  quantity: number;
}

export interface loginType {
  email: string;
  password: string;
}

export interface accountType {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  postal_code: string;
  password: string;
}

export interface cartType {
  cart_item: string;
  cart_item__image: string;
  cart_item__name: string;
  cart_item__price: number;
  quantity: number;
}
