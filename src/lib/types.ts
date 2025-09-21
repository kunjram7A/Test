export type ListingCategory = 'accommodations' | 'food' | 'shops';

export type Listing = {
  id: string;
  title: string;
  type: string; // e.g., 'PG', 'Hostel', 'Restaurant', 'Stationery'
  rating: number;
  imageUrl: string;
  imageHint: string;
  price?: string;
  gender?: 'Boys' | 'Girls' | 'Co-ed';
  category: ListingCategory;
};

export type Helpline = {
  name: string;
  number: string;
  description: string;
};

export type TransportRoute = {
  routeNumber: string;
  start: string;
  end: string;
  timings: string;
};
