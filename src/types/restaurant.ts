export interface Restaurant {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: {
    lat: number;
    long: number;
  };
  logo?: string;
  images: string[];
  totalMenus: number;
  totalReviews: number;
  menus: MenuItem[];
  reviews: Review[];
}

export interface MenuItem {
  id: number;
  foodName: string;
  price: number;
  type: 'main' | 'drink';
  image: string;
}

export interface Review {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}