'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Property } from '@/lib/supabase';
import { ArrowLeft, Calendar, Clock, Video, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function BookTourPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    platform: 'zoom' as 'zoom' | 'google-meet' | 'whatsapp',
    notes: '',
  });

  useEffect(() => {
    if (params.propertyId) {
      fetchProperty(params.propertyId as string);
    }
  }, [params.propertyId]);

  const fetchProperty = async (id: string) => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      setProperty(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user || !property) return;

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Please select a future date');
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from('virtual_tours').insert({
      user_id: user.id,
      property_id: property.id,
      scheduled_date: formData.date,
      scheduled_time: formData.time,
      platform: formData.platform,
      notes: formData.notes,
      status: 'pending',
    });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
    } else {
      router.push('/virtual-tours/confirmation');
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-gray-600 mb-4">Property not found</p>
        <button
          onClick={() => router.back()}
          className="text-[#037EBA] font-semibold hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Book Virtual Tour</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={property.images[0] || '/b0dddf10368b36491724e022088b3e8d5261abca.jpg'}
                alt={property.title}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 mb-1">{property.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {property.neighborhood}, {property.city}
              </p>
              <p className="text-lg font-bold text-[#1B4F5C]">
                {new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                  minimumFractionDigits: 0,
                }).format(property.price)}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Select Date
              </label>
              <input
                type="date"
                required
                min={getMinDate()}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Select Time
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Video className="inline w-4 h-4 mr-1" />
                Preferred Platform
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'zoom', label: 'Zoom' },
                  { value: 'google-meet', label: 'Google Meet' },
                  { value: 'whatsapp', label: 'WhatsApp' },
                ].map((platform) => (
                  <button
                    key={platform.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, platform: platform.value as any })}
                    className={`py-3 px-4 rounded-lg border-2 transition-all text-sm font-medium ${
                      formData.platform === platform.value
                        ? 'border-[#037EBA] bg-[#037EBA] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {platform.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any specific areas you'd like to focus on?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Confirming booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
