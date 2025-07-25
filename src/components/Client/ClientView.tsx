import React, { useState, useRef } from 'react';
import { Heart, X, Star, MapPin, Bed, Bath, Square, ArrowLeft, Filter } from 'lucide-react';
import { Property } from '../../types';

const ClientView: React.FC = () => {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const properties: Property[] = [
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
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
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
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Exposed Brick', 'High Ceilings', 'Hardwood Floors'],
      status: 'available',
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
      image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Water View', 'Concierge', 'Spa', 'Rooftop'],
      status: 'available',
      type: 'condo',
      realtorId: '1',
    },
    {
      id: '5',
      title: 'Historic Brownstone',
      price: '$580,000',
      location: 'Heritage District',
      bedrooms: 3,
      bathrooms: 2,
      area: '1,600 sq ft',
      image: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Original Details', 'Patio', 'Basement', 'Parking'],
      status: 'available',
      type: 'townhouse',
      realtorId: '1',
    },
    {
      id: '6',
      title: 'Modern Penthouse',
      price: '$1,200,000',
      location: 'Uptown',
      bedrooms: 4,
      bathrooms: 4,
      area: '3,000 sq ft',
      image: 'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Terrace', 'City Views', 'Chef Kitchen', 'Wine Cellar'],
      status: 'available',
      type: 'condo',
      realtorId: '1',
    },
  ];

  const [visibleProperties, setVisibleProperties] = useState<Property[]>(properties);
  const shortlistedProperties = visibleProperties.filter(prop => shortlisted.includes(prop.id));
  const [liked, setLiked] = useState<string[]>([]);

  const handleReject = (id: string) => {
    setVisibleProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const handleSuperLike = (id: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter(sid => sid !== id));
    } else if (shortlisted.length < 7) {
      setShortlisted([...shortlisted, id]);
    }
  };

  if (showShortlisted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowShortlisted(false)}
              className="btn-ghost p-2 rounded-xl"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Shortlisted Properties
              </h1>
              <p className="text-gray-600">{shortlistedProperties.length} of 7 properties saved</p>
            </div>
          </div>

          {shortlistedProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties shortlisted yet</h3>
              <p className="text-gray-500 mb-6">Start browsing to find your perfect home</p>
              <button
                onClick={() => setShowShortlisted(false)}
                className="btn btn-primary"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shortlistedProperties.map((property) => (
                <div key={property.id} className="property-card">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-gray-900">{property.price}</span>
                    </div>
                    <div className="absolute top-4 left-4 badge badge-success">
                      Shortlisted
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{property.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Bed size={16} />
                        <span>{property.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath size={16} />
                        <span>{property.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Square size={16} />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="btn btn-secondary flex-1">
                        View Details
                      </button>
                      <button className="btn btn-primary flex-1">
                        Contact Realtor
                      </button>
                      <button
                        className="btn btn-danger flex-1"
                        onClick={() => {
                          setShortlisted(prev => prev.filter(id => id !== property.id));
                        }}
                      >
                        Remove from Shortlist
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPropertyIndex >= properties.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Properties Reviewed!
          </h2>
          <p className="text-gray-600 mb-8">
            You've reviewed all available properties. Check your shortlisted items or start over.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowShortlisted(true)}
              className="btn btn-primary w-full"
            >
              View Shortlisted ({shortlistedProperties.length})
            </button>
            <button
              onClick={() => {
                setCurrentPropertyIndex(0);
                setShortlisted([]);
              }}
              className="btn btn-secondary w-full"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-8 px-2">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">Browse Properties</h1>
            <p className="text-gray-600">View all available properties in a list</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 rounded-lg p-2 shadow hover:bg-gray-50 transition">
              <Filter size={20} />
            </button>
            <button
              onClick={() => setShowShortlisted(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-emerald-700 transition text-sm"
            >
              Saved ({shortlistedProperties.length})
            </button>
          </div>
        </div>

        {/* List View of Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProperties.map((property, idx) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-xl font-bold text-emerald-700">{property.price}</span>
                </div>
                {shortlisted.includes(property.id) && (
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold">
                    Shortlisted
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <span className="text-base">{property.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Bed size={18} />
                    <span className="font-medium">{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={18} />
                    <span className="font-medium">{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square size={18} />
                    <span className="font-medium">{property.area}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-4 border-t bg-gray-50">
                <button
                  onClick={() => handleReject(property.id)}
                  className="bg-red-100 text-red-600 rounded-full p-3 shadow hover:bg-red-200 transition"
                  aria-label="Reject property"
                >
                  <X size={22} />
                </button>
                <button
                  onClick={() => handleSuperLike(property.id)}
                  className="bg-yellow-100 text-yellow-700 rounded-full p-3 shadow hover:bg-yellow-200 transition"
                  aria-label="Super like property (add to shortlist)"
                  disabled={shortlisted.length >= 7}
                >
                  <Star size={22} />
                </button>
                <button
                  onClick={() => handleLike(property.id)}
                  className={`rounded-full p-3 shadow transition border-2 ${liked.includes(property.id)
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'bg-emerald-100 text-gray-400 border-emerald-100 hover:bg-emerald-200'}`}
                  aria-label="Like property"
                >
                  {liked.includes(property.id)
                    ? <Heart size={22} fill="currentColor" />
                    : <Heart size={22} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientView;