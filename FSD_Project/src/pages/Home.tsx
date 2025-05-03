import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Plan Your Event Today</h1>
          <p className="text-2xl mb-12">With Planova</p>
          
          {/* Search Filters */}
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search venues..."
                  className="pl-10 w-full p-2 border rounded-md"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <select className="pl-10 w-full p-2 border rounded-md">
                  <option>Select Location</option>
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 w-full p-2 border rounded-md"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" />
                <select className="pl-10 w-full p-2 border rounded-md">
                  <option>Guest Count</option>
                  <option>50-100</option>
                  <option>100-200</option>
                  <option>200-500</option>
                  <option>500+</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">WEDDINGS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                  alt="Venue"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Hotel Elite</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>★ 4.8</span>
                    <span className="mx-2">•</span>
                    <span>New Delhi</span>
                  </div>
                  <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
                    CHECK IN
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/wedding" className="text-pink-500 hover:text-pink-600">
              View All Wedding Venues →
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">PARTIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                  alt="Venue"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Dream Castle</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>★ 4.7</span>
                    <span className="mx-2">•</span>
                    <span>Mumbai</span>
                  </div>
                  <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
                    CHECK IN
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/parties" className="text-pink-500 hover:text-pink-600">
              View All Party Venues →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;