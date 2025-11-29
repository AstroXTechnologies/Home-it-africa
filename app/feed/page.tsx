'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Property } from '@/lib/supabase';
import PropertyCard from '@/components/PropertyCard';
import BottomNav from '@/components/BottomNav';
import { User, Bell, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FeedPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchProperties();
      fetchSavedProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false });

    if (data) {
      setProperties(data);
    }
    setLoading(false);
  };

  const fetchSavedProperties = async () => {
    const { data } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', user!.id);

    if (data) {
      setSavedProperties(new Set(data.map(sp => sp.property_id)));
    }
  };

  const handleSaveProperty = async (propertyId: string) => {
    if (!user) return;

    const isSaved = savedProperties.has(propertyId);

    if (isSaved) {
      await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);

      setSavedProperties(prev => {
        const newSet = new Set(prev);
        newSet.delete(propertyId);
        return newSet;
      });
    } else {
      await supabase
        .from('saved_properties')
        .insert({ user_id: user.id, property_id: propertyId });

      setSavedProperties(prev => new Set(prev).add(propertyId));
    }
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
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="font-['Pacifico'] text-xl text-[#1B4F5C]">
            Home-It Africa
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link href="/profile" className="w-10 h-10 bg-gradient-to-br from-[#037EBA] to-[#00B894] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedProperties.has(property.id)}
                onSave={handleSaveProperty}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
