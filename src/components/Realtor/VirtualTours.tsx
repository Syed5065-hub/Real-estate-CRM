import React, { useState } from 'react';
import { Video, Plus, Play, Eye, Share2, Calendar, MapPin, Search, Filter } from 'lucide-react';

const VirtualTours: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const virtualTours = [
    {
      id: '1',
      propertyTitle: 'Modern Downtown Apartment',
      address: '123 Main St, Downtown',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8:45',
      views: 156,
      status: 'published',
      createdDate: '2024-01-15',
      scheduledTours: 12,
      price: '$450,000'
    },
    {
      id: '2',
      propertyTitle: 'Luxury Family Home',
      address: '456 Oak Avenue, Suburban Hills',
      thumbnail: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:30',
      views: 89,
      status: 'draft',
      createdDate: '2024-01-18',
      scheduledTours: 8,
      price: '$750,000'
    },
    {
      id: '3',
      propertyTitle: 'Cozy Studio Loft',
      address: '789 Art Street, Arts District',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '6:20',
      views: 234,
      status: 'published',
      createdDate: '2024-01-10',
      scheduledTours: 18,
      price: '$320,000'
    },
    {
      id: '4',
      propertyTitle: 'Waterfront Condo',
      address: '321 Marina Drive, Marina District',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '10:15',
      views: 67,
      status: 'processing',
      createdDate: '2024-01-20',
      scheduledTours: 5,
      price: '$650,000'
    }
  ];

  const filteredTours = virtualTours.filter(tour => {
    const matchesSearch = tour.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tour.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const totalViews = filteredTours.reduce((sum, tour) => sum + tour.views, 0);
  const totalTours = filteredTours.filter(tour => tour.status === 'published').length;
  const totalScheduled = filteredTours.reduce((sum, tour) => sum + tour.scheduledTours, 0);

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Tours</h1>
            <p className="text-gray-600">Create and manage virtual property tours</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            Create Tour
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tours</p>
                <p className="text-2xl font-bold text-gray-900">{totalTours}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{totalScheduled}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalTours > 0 ? Math.round(totalViews / totalTours) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search virtual tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input pl-10 pr-8 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>

        {/* Virtual Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={tour.thumbnail}
                  alt={tour.propertyTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all">
                    <Play size={24} className="text-violet-600 ml-1" />
                  </button>
                </div>
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {tour.duration}
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tour.status)}`}>
                    {tour.status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tour.propertyTitle}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin size={14} />
                    <span className="text-sm">{tour.address}</span>
                  </div>
                  <p className="text-lg font-bold text-violet-600">{tour.price}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{tour.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{tour.scheduledTours} scheduled</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 btn-secondary text-sm py-2">
                    <Eye size={16} className="mr-1" />
                    Preview
                  </button>
                  <button className="flex-1 btn-primary text-sm py-2">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No virtual tours found</h3>
            <p className="text-gray-500 mb-6">No tours match your search criteria.</p>
            <button className="btn-primary">
              <Plus size={20} className="mr-2" />
              Create Your First Tour
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTours;