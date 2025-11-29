/*
  # HomeitAfrica Platform Schema

  ## Overview
  Creates the complete database schema for HomeitAfrica social media for properties platform.
  Includes user profiles, properties, virtual tours, saved properties, and notifications.

  ## New Tables
  
  1. `profiles`
     - `id` (uuid, references auth.users, primary key)
     - `full_name` (text)
     - `phone_number` (text)
     - `avatar_url` (text, nullable)
     - `looking_for` (text, enum: 'rent', 'buy', 'short-let')
     - `preferred_locations` (text array, nullable)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  2. `properties`
     - `id` (uuid, primary key)
     - `title` (text)
     - `description` (text)
     - `property_type` (text, enum: 'apartment', 'duplex', 'studio', 'land', 'villa', 'mansion')
     - `listing_type` (text, enum: 'for-sale', 'for-rent', 'short-let')
     - `price` (bigint)
     - `location` (text)
     - `city` (text)
     - `neighborhood` (text)
     - `bedrooms` (integer)
     - `bathrooms` (integer)
     - `size_sqm` (integer)
     - `amenities` (text array)
     - `images` (text array)
     - `featured` (boolean, default false)
     - `available` (boolean, default true)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  3. `saved_properties`
     - `id` (uuid, primary key)
     - `user_id` (uuid, references profiles)
     - `property_id` (uuid, references properties)
     - `created_at` (timestamptz)
     - Unique constraint on (user_id, property_id)
  
  4. `virtual_tours`
     - `id` (uuid, primary key)
     - `user_id` (uuid, references profiles)
     - `property_id` (uuid, references properties)
     - `scheduled_date` (date)
     - `scheduled_time` (time)
     - `platform` (text, enum: 'zoom', 'google-meet', 'whatsapp')
     - `status` (text, enum: 'pending', 'confirmed', 'completed', 'cancelled')
     - `meeting_link` (text, nullable)
     - `notes` (text, nullable)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  5. `notifications`
     - `id` (uuid, primary key)
     - `user_id` (uuid, references profiles)
     - `type` (text)
     - `title` (text)
     - `message` (text)
     - `read` (boolean, default false)
     - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Properties are publicly readable but only admins can create/update
  - Virtual tours are only visible to the user who booked them
  - Saved properties are private to each user

  ## Important Notes
  - All tables use UUID primary keys with gen_random_uuid()
  - Timestamps default to now()
  - RLS policies are restrictive by default - explicit access only
  - User profiles are linked to Supabase auth.users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone_number text,
  avatar_url text,
  looking_for text CHECK (looking_for IN ('rent', 'buy', 'short-let')),
  preferred_locations text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('apartment', 'duplex', 'studio', 'land', 'villa', 'mansion')),
  listing_type text NOT NULL CHECK (listing_type IN ('for-sale', 'for-rent', 'short-let')),
  price bigint NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  neighborhood text NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  size_sqm integer DEFAULT 0,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved properties"
  ON saved_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved properties"
  ON saved_properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved properties"
  ON saved_properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create virtual_tours table
CREATE TABLE IF NOT EXISTS virtual_tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  scheduled_date date NOT NULL,
  scheduled_time time NOT NULL,
  platform text NOT NULL CHECK (platform IN ('zoom', 'google-meet', 'whatsapp')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  meeting_link text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE virtual_tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own virtual tours"
  ON virtual_tours FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own virtual tours"
  ON virtual_tours FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own virtual tours"
  ON virtual_tours FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_saved_properties_user_id ON saved_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_tours_user_id ON virtual_tours(user_id);
CREATE INDEX IF NOT EXISTS idx_virtual_tours_scheduled_date ON virtual_tours(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
