export interface Product {
  createdAt: any;
  popularity: any;
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'men' | 'women' | 'children';
  sizes: string[];
  colors: string[];
  images: string[];
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CustomerInfo {
  fullName: string;
  email?: string;
  phone: string;
  district: string;
  comment?: string;
}

export interface Order {
  id: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  status: 'new' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}