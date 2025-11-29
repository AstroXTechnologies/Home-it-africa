'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, VirtualTour } from '@/lib/supabase';
import BottomNav from '@/components/BottomNav';
import { Calendar, Clock, Video, Plus, Loader2, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function VirtualToursPage() {
  const { user, loading: authLoading } = useAuth();
  const [tours, setTours] = useState<VirtualTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTours();
    }
  }, [user]);

  const fetchTours = async () => {
    const { data } = await supabase
      .from('virtual_tours')
      .select(`
        *,
        property:properties(*)
      `)
      .eq('user_id', user!.id)
      .order('scheduled_date', { ascending: true });

    if (data) {
      setTours(data as any);
    }
    setLoading(false);
  };

  const upcomingTours = tours.filter(
    tour => tour.status === 'pending' || tour.status === 'confirmed'
  );

  const pastTours = tours.filter(
    tour => tour.status === 'completed' || tour.status === 'cancelled'
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPlatformIcon = (platform: string) => {
    return <Video className="w-4 h-4" />;
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Virtual Tours</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-[#037EBA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'past'
                  ? 'bg-[#037EBA] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
          </div>
        ) : activeTab === 'upcoming' ? (
          upcomingTours.length === 0 ? (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">No upcoming virtual tours scheduled.</p>
              <Link
                href="/explore"
                className="inline-block bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Explore Properties
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/property/${tour.property_id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={tour.property?.images[0] || '/b0dddf10368b36491724e022088b3e8d5261abca.jpg'}
                        alt={tour.property?.title || ''}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                        {tour.property?.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>{tour.property?.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.scheduled_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(tour.scheduled_time)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(tour.status)}`}>
                          {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          {getPlatformIcon(tour.platform)}
                          <span>{tour.platform.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          pastTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No past virtual tours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/property/${tour.property_id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all opacity-75"
                >
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={tour.property?.images[0] || '/b0dddf10368b36491724e022088b3e8d5261abca.jpg'}
                        alt={tour.property?.title || ''}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                        {tour.property?.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>{tour.property?.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(tour.scheduled_date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(tour.scheduled_time)}</span>
                        </div>
                      </div>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(tour.status)}`}>
                        {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </main>

      <Link
        href="/explore"
        className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        <Plus className="w-6 h-6" />
      </Link>

      <BottomNav />
    </div>
  );
}
