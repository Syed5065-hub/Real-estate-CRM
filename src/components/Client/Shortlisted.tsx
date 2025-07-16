import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Square, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react';

const Shortlisted: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const shortlistedProperties = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: '$450,000',
      location: 'Downtown, City Center',
      bedrooms: 2,
      bathrooms: 2,
      area: '1,200 sq ft',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Parking', 'Gym', 'Pool', 'Balcony'],
      description: 'Beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.',
      realtor: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'sarah@realestate.com'
      },
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Luxury Family Home',
      price: '$750,000',
      location: 'Suburban Hills',
      bedrooms: 4,
      bathrooms: 3,
      area: '2,500 sq ft',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Garden', 'Garage', 'Fireplace', 'Study'],
      description: 'Spacious family home with beautiful garden and modern amenities in a quiet neighborhood.',
      realtor: {
        name: 'Michael Chen',
        phone: '+1 (555) 234-5678',
        email: 'michael@realestate.com'
      },
      addedDate: '2024-01-16'
    },
    {
      id: '3',
      title: 'Waterfront Condo',
      price: '$650,000',
      location: 'Marina District',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,800 sq ft',
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Water View', 'Concierge', 'Spa', 'Rooftop'],
      description: 'Stunning waterfront condo with panoramic views and luxury amenities.',
      realtor: {
        name: 'Emily Davis',
        phone: '+1 (555) 345-6789',
        email: 'emily@realestate.com'
      },
      addedDate: '2024-01-17'
    }
  ];

  if (selectedProperty) {
    const property = shortlistedProperties.find(p => p.id === selectedProperty);
    if (!property) return null;

    return (
      <div className="h-full bg-white overflow-auto">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-6 left-6">
            <button
              onClick={() => setSelectedProperty(null)}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
          </div>
          <div className="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-xl font-bold text-gray-900">{property.price}</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin size={20} />
              <span className="text-lg">{property.location}</span>
            </div>
            
            <div className="flex items-center gap-8 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Bed size={20} />
                <span className="font-medium">{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} />
                <span className="font-medium">{property.bathrooms} bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={20} />
                <span className="font-medium">{property.area}</span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {property.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-center font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Realtor</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar avatar-lg">
                {property.realtor.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{property.realtor.name}</h4>
                <p className="text-gray-600">Licensed Real Estate Agent</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Phone size={20} />
                Call
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Mail size={20} />
                Email
              </button>
              <button className="btn-primary flex items-center justify-center gap-2">
                <Calendar size={20} />
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shortlisted Properties</h1>
          <p className="text-gray-600">Your saved favorite properties ({shortlistedProperties.length} of 7)</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(shortlistedProperties.length / 7) * 100}%` }}
          />
        </div>

        {shortlistedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties shortlisted yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing properties and save your favorites to build your shortlist of dream homes.
            </p>
            <button className="btn-primary">
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shortlistedProperties.map((property) => (
              <div key={property.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-lg font-bold text-gray-900">{property.price}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Heart size={14} fill="currentColor" />
                    <span className="text-sm font-medium">Saved</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin size={16} />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Bed size={16} />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath size={16} />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square size={16} />
                      <span>{property.area}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setSelectedProperty(property.id)}
                      className="flex-1 btn-secondary"
                    >
                      View Details
                    </button>
                    <button className="flex-1 btn-primary">
                      Contact Realtor
                    </button>
                  </div>

                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                    Added on {new Date(property.addedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortlisted;