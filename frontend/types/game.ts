export type GameInterface = {
  _id?: string; 
  title: string;
  description: string;
  price: number;
  img: string; 
  developer: string;
  releaseDate: string; 
  genre: string; 
  video: string; 
};


export interface CartItem extends GameInterface {
  quantity: number;
}

export type CartState = {
  cartItems: CartItem[];
}

  