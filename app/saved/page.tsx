'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, SavedProperty } from '@/lib/supabase';
import PropertyCard from '@/components/PropertyCard';
import BottomNav from '@/components/BottomNav';
import { Heart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth();
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    const { data } = await supabase
      .from('saved_properties')
      .select(`
        *,
        property:properties(*)
      `)
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSavedProperties(data as any);
    }
    setLoading(false);
  };

  const handleUnsave = async (propertyId: string) => {
    if (!user) return;

    await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', propertyId);

    setSavedProperties(prev => prev.filter(sp => sp.property_id !== propertyId));
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
          <h1 className="text-2xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-sm text-gray-600 mt-1">
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
      </header>

      <main className="px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Saved Properties</h2>
            <p className="text-gray-600 mb-6">
              You haven't saved any properties yet. Browse the feed to discover homes you like.
            </p>
            <Link
              href="/feed"
              className="inline-block bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((saved) => (
              saved.property && (
                <PropertyCard
                  key={saved.id}
                  property={saved.property}
                  isSaved={true}
                  onSave={handleUnsave}
                />
              )
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
