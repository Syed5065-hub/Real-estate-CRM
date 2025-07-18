import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Plus, Filter, Search, User, Phone } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Meetings: React.FC = () => {
  const { portal } = useAuth();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const meetings = [
    {
      id: '1',
      title: 'Property Viewing - Downtown Apartment',
      clientName: 'Alice Cooper',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '1 hour',
      type: 'viewing',
      status: 'scheduled',
      location: '123 Main St, Downtown',
      notes: 'First-time buyer, interested in modern amenities',
      avatar: 'AC'
    },
    {
      id: '2',
      title: 'Consultation - Investment Properties',
      clientName: 'Bob Martinez',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '45 minutes',
      type: 'consultation',
      status: 'scheduled',
      location: 'Virtual Meeting',
      notes: 'Looking for rental properties in suburban areas',
      avatar: 'BM'
    },
    {
      id: '3',
      title: 'Contract Signing - Marina Condo',
      clientName: 'Carol White',
      date: '2024-01-21',
      time: '11:30 AM',
      duration: '30 minutes',
      type: 'signing',
      status: 'scheduled',
      location: 'Office Conference Room',
      notes: 'Final paperwork for purchase agreement',
      avatar: 'CW'
    },
    {
      id: '4',
      title: 'Virtual Tour - Heritage Townhouse',
      clientName: 'Dan Brown',
      date: '2024-01-19',
      time: '3:00 PM',
      duration: '30 minutes',
      type: 'virtual_tour',
      status: 'completed',
      location: 'Virtual Meeting',
      notes: 'Client loved the historical features',
      avatar: 'DB'
    },
    {
      id: '5',
      title: 'Follow-up Meeting',
      clientName: 'Eva Green',
      date: '2024-01-18',
      time: '4:00 PM',
      duration: '20 minutes',
      type: 'consultation',
      status: 'cancelled',
      location: 'Phone Call',
      notes: 'Rescheduled due to client emergency',
      avatar: 'EG'
    }
  ];

  const filteredMeetings = meetings.filter(meeting => {
    if (statusFilter === 'all') return true;
    return meeting.status === statusFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'viewing': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'consultation': return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'signing': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'virtual_tour': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'viewing': return MapPin;
      case 'consultation': return User;
      case 'signing': return Calendar;
      case 'virtual_tour': return Video;
      default: return Calendar;
    }
  };

  const upcomingMeetings = filteredMeetings.filter(meeting => 
    meeting.status === 'scheduled' && new Date(meeting.date) >= new Date()
  ).length;

  const todayMeetings = filteredMeetings.filter(meeting => 
    meeting.date === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {portal === 'client' ? 'My Meetings' : 'Meetings'}
            </h1>
            <p className="text-gray-600">
              {portal === 'client' 
                ? 'Your scheduled appointments and consultations'
                : 'Manage client meetings and appointments'
              }
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </button>
            </div>
            {portal !== 'client' && (
              <button className="main-action-btn">
                <Plus size={18} className="mr-2" />
                <span className="font-semibold">Schedule Meeting</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingMeetings}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">{todayMeetings}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search meetings..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-black placeholder-gray-500"
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
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Meetings List */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => {
              const TypeIcon = getTypeIcon(meeting.type);
              return (
                <div key={meeting.id} className="card p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="avatar avatar-md">
                      {meeting.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                          <p className="text-gray-600">{meeting.clientName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting.status)}`}>
                            {meeting.status}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(meeting.type)}`}>
                            <TypeIcon size={12} className="mr-1" />
                            {meeting.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{new Date(meeting.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{meeting.time} ({meeting.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {meeting.location.includes('Virtual') ? (
                            <Video size={16} />
                          ) : meeting.location.includes('Phone') ? (
                            <Phone size={16} />
                          ) : (
                            <MapPin size={16} />
                          )}
                          <span className="truncate">{meeting.location}</span>
                        </div>
                      </div>
                      
                      {meeting.notes && (
                        <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                          {meeting.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Calendar View Placeholder */}
        {viewMode === 'calendar' && (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar View</h3>
            <p className="text-gray-500">Calendar integration coming soon</p>
          </div>
        )}

        {filteredMeetings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-500">No meetings match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meetings;