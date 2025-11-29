'use client';

import { Bed, Bath, Maximize, MapPin, Heart, Eye, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/supabase';
import { useState } from 'react';

type PropertyCardProps = {
  property: Property;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
};

export default function PropertyCard({ property, onSave, isSaved = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(!saved);
    onSave?.(property.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getListingBadge = (type: string) => {
    const badges = {
      'for-sale': { text: 'For Sale', color: 'bg-green-500' },
      'for-rent': { text: 'For Rent', color: 'bg-blue-500' },
      'short-let': { text: 'Short-let', color: 'bg-[#FFD700] text-gray-900' },
    };
    return badges[type as keyof typeof badges] || badges['for-sale'];
  };

  const badge = getListingBadge(property.listing_type);
  const mainImage = property.images[0] || '/b0dddf10368b36491724e022088b3e8d5261abca.jpg';

  return (
    <Link href={`/property/${property.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
        <div className="relative h-56">
          <Image
            src={mainImage}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`${badge.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
              {badge.text}
            </span>
          </div>
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h3>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-4 h-4 text-[#037EBA]" />
            <span className="text-sm">{property.neighborhood}, {property.city}</span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.size_sqm} m²</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="text-2xl font-bold text-[#1B4F5C]">
              {formatPrice(property.price)}
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-[#037EBA]/10 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-[#037EBA]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
