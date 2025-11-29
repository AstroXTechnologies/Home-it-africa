'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNav from '@/components/BottomNav';
import { User, Settings, Heart, Video, Home, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#037EBA]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-gradient-to-br from-[#1B4F5C] to-[#0d2830] px-4 pt-8 pb-16">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#037EBA] to-[#00B894] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{profile.full_name}</h1>
          <p className="text-gray-300 text-sm mb-3">{user.email}</p>
          {profile.phone_number && (
            <p className="text-gray-300 text-sm">{profile.phone_number}</p>
          )}
        </div>
      </header>

      <main className="px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">My Activity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-600">Saved</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-600">Tours</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-xs text-gray-600">Viewed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
          <h2 className="text-sm font-semibold text-gray-500 uppercase px-6 pt-6 mb-3">Preferences</h2>
          <div className="space-y-1">
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">Looking for</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {profile.looking_for
                      ? profile.looking_for === 'short-let'
                        ? 'Short-let'
                        : profile.looking_for.charAt(0).toUpperCase() + profile.looking_for.slice(1)
                      : 'Not set'}
                  </div>
                </div>
              </div>
            </div>
            {profile.preferred_locations && profile.preferred_locations.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="font-medium text-gray-900 mb-2">Preferred Locations</div>
                <div className="flex flex-wrap gap-2">
                  {profile.preferred_locations.map((location, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#037EBA]/10 text-[#037EBA] rounded-full text-sm"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
          <Link
            href="/settings"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">Account Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full bg-white border border-red-200 text-red-600 py-4 rounded-2xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </main>

      <BottomNav />
    </div>
  );
}
