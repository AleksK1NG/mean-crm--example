export interface Order {
  user?: string;
  date?: Date;
  order?: number;
  list: OrderPosition[];
  _id?: string;
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id?: string;
}
