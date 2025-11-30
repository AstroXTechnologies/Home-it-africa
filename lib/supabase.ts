import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone_number: string | null;
  avatar_url: string | null;
  looking_for: 'rent' | 'buy' | 'short-let' | null;
  preferred_locations: string[] | null;
  created_at: string;
  updated_at: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  property_type: 'apartment' | 'duplex' | 'studio' | 'land' | 'villa' | 'mansion';
  listing_type: 'for-sale' | 'for-rent' | 'short-let';
  price: number;
  location: string;
  city: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  created_at: string;
  updated_at: string;
};

export type VirtualTour = {
  id: string;
  user_id: string;
  property_id: string;
  scheduled_date: string;
  scheduled_time: string;
  platform: 'zoom' | 'google-meet' | 'whatsapp';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meeting_link: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  property?: Property;
};

export type SavedProperty = {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
};
