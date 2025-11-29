'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, Property } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize,
  MapPin,
  CheckCircle,
  Loader2,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchProperty(params.id as string);
      checkIfSaved(params.id as string);
    }
  }, [params.id]);

  const fetchProperty = async (id: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) {
      setProperty(data);
      fetchSimilarProperties(data);
    }
    setLoading(false);
  };

  const fetchSimilarProperties = async (currentProperty: Property) => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('city', currentProperty.city)
      .neq('id', currentProperty.id)
      .limit(3);

    if (data) {
      setSimilarProperties(data);
    }
  };

  const checkIfSaved = async (propertyId: string) => {
    if (!user) return;

    const { data } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', propertyId)
      .maybeSingle();

    setIsSaved(!!data);
  };

  const toggleSave = async () => {
    if (!user || !property) return;

    if (isSaved) {
      await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', property.id);
      setIsSaved(false);
    } else {
      await supabase
        .from('saved_properties')
        .insert({ user_id: user.id, property_id: property.id });
      setIsSaved(true);
    }
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
        <Link href="/feed" className="text-[#037EBA] font-semibold hover:underline">
          Back to feed
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const images = property.images.length > 0 ? property.images : ['/b0dddf10368b36491724e022088b3e8d5261abca.jpg'];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="relative">
        <div className="relative h-80 bg-gray-200">
          <Image
            src={images[currentImageIndex]}
            alt={property.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 text-gray-900" />
            </button>
            <button
              onClick={toggleSave}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 flex-1">{property.title}</h1>
            <span className="text-2xl font-bold text-[#1B4F5C]">
              {formatPrice(property.price)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-[#037EBA]" />
            <span className="text-sm">{property.neighborhood}, {property.city}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 py-4 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">{property.bedrooms}</div>
              <div className="text-xs text-gray-600">Bedrooms</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">{property.bathrooms}</div>
              <div className="text-xs text-gray-600">Bathrooms</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">{property.size_sqm}</div>
              <div className="text-xs text-gray-600">m²</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">{property.description}</p>
        </div>

        {property.amenities.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Location</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700">{property.location}</p>
            <p className="text-sm text-gray-600 mt-1">{property.neighborhood}, {property.city}</p>
          </div>
        </div>

        {similarProperties.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Similar Properties</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
              {similarProperties.map((similarProp) => (
                <Link
                  key={similarProp.id}
                  href={`/property/${similarProp.id}`}
                  className="flex-shrink-0 w-48"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div className="relative h-32">
                      <Image
                        src={similarProp.images[0] || '/b0dddf10368b36491724e022088b3e8d5261abca.jpg'}
                        alt={similarProp.title}
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                        {similarProp.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{similarProp.neighborhood}</p>
                      <p className="text-sm font-bold text-[#1B4F5C]">
                        {formatPrice(similarProp.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button
          onClick={toggleSave}
          className="flex-shrink-0 px-6 py-3 border-2 border-[#037EBA] text-[#037EBA] rounded-lg font-semibold hover:bg-[#037EBA]/10 transition-colors"
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <Link
          href={`/virtual-tours/book/${property.id}`}
          className="flex-1 bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white py-3 rounded-lg font-bold text-center hover:shadow-lg transition-all"
        >
          Book Virtual Tour
        </Link>
      </div>
    </div>
  );
}
