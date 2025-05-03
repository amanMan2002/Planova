export interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  price: number;
  categories: string[];
}

export interface Booking {
  id: string;
  userId: string;
  venueId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  paymentDetails: {
    amount: number;
    transactionId: string;
    status: string;
  };
}

export interface User {
  email: string;
  isLoggedIn: boolean;
}