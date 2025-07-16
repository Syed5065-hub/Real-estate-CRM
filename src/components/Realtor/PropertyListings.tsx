import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../../types';

const PropertyListings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: '$450,000',
      location: 'Downtown, City Center',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sq ft',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Parking', 'Gym', 'Pool', 'Balcony'],
      status: 'available',
      type: 'apartment',
      realtorId: '1',
    },
    {
      id: '2',
      title: 'Luxury Family Home',
      price: '$750,000',
      location: 'Suburban Hills',
      bedrooms: 4,
      bathrooms: 3,
      area: '2,500 sq ft',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Garden', 'Garage', 'Fireplace', 'Study'],
      status: 'available',
      type: 'house',
      realtorId: '1',
    },
    {
      id: '3',
      title: 'Cozy Studio Loft',
      price: '$320,000',
      location: 'Arts District',
      bedrooms: 1,
      bathrooms: 1,
      area: '800 sq ft',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Exposed Brick', 'High Ceilings', 'Hardwood Floors'],
      status: 'pending',
      type: 'apartment',
      realtorId: '1',
    },
    {
      id: '4',
      title: 'Waterfront Condo',
      price: '$650,000',
      location: 'Marina District',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sq ft',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Water View', 'Concierge', 'Spa', 'Rooftop'],
      status: 'sold',
      type: 'condo',
      realtorId: '1',
    },
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'sold': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'apartment': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'house': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'condo': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'townhouse': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <div className="p-6 space-y-6 font-[Montserrat,Open_Sans,sans-serif]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-black">Property Listings</h1>
          <p className="text-gray-600 text-base mt-1">Browse and manage your properties</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
          <Plus size={20} />
          Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-black placeholder-gray-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-56 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-black appearance-none"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow">
                <span className="text-sm font-bold text-black">{property.price}</span>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(property.status)}`}> 
                  {property.status}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-black">{property.title}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <MapPin size={14} />
                  <span className="text-sm">{property.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed size={14} />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={14} />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={14} />
                  <span>{property.area}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(property.type)}`}> 
                  {property.type}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                    <Edit size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {property.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
                {property.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{property.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListings;