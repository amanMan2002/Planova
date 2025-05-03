import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'All',
  'Social Events',
  'Corporate Events',
  'Entertainment Events',
  'Educational Events',
  'Non-Profit Events',
  'Sporting Events',
  'Cultural & Art Events',
  'Religious & Spiritual Events',
  'Trade & Industries Events',
  'Community & Civic Events'
];

const venues = [...Array(20)].map((_, i) => ({
  id: `party-venue-${i}`,
  name: `Party Venue ${i + 1}`,
  location: ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Goa'][i % 5],
  rating: (4 + Math.random()).toFixed(1),
  price: Math.floor(15000 + Math.random() * 45000),
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  categories: ['Entertainment Events', 'Social Events']
}));

const Parties = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [location, setLocation] = useState('all');

  const filteredVenues = venues.filter(venue => {
    if (selectedCategory !== 'All' && !venue.categories.includes(selectedCategory)) return false;
    if (location !== 'all' && venue.location !== location) return false;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (venue.price < min || venue.price > max) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">PARTIES</h1>

      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="15000-25000">₹15,000 - ₹25,000</option>
              <option value="25000-35000">₹25,000 - ₹35,000</option>
              <option value="35000-60000">₹35,000 - ₹60,000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              className="w-full border rounded-md p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="New Delhi">New Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Goa">Goa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{venue.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <span>★ {venue.rating}</span>
                <span className="mx-2">•</span>
                <span>{venue.location}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                ₹{venue.price.toLocaleString()} / 100 Pax
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {venue.categories.map(cat => (
                  <span
                    key={cat}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/check-in/${venue.id}`)}
                className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
              >
                CHECK IN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parties;