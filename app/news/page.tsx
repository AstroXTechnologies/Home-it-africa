'use client';

import { useState } from 'react';
import { ArrowLeft, Clock, TrendingUp, Home as HomeIcon, DollarSign, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  readTime: string;
  source: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'African Real Estate Market Shows Strong Growth in 2025',
    excerpt: 'The African real estate market is experiencing unprecedented growth, with major cities showing increased demand for residential and commercial properties.',
    category: 'Market Trends',
    image: '/5ca304c172b6ab5d17bdcbd853a510e0bf97d23f.jpg',
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    source: 'Real Estate Africa'
  },
  {
    id: '2',
    title: 'Smart Home Technology Revolutionizes African Properties',
    excerpt: 'Smart home integration is becoming a key selling point for modern properties across Africa, with buyers prioritizing tech-enabled homes.',
    category: 'Technology',
    image: '/9a0b9bb429efd9945a35a796d631d03c7e5af441.jpg',
    publishedAt: '5 hours ago',
    readTime: '4 min read',
    source: 'PropTech News'
  },
  {
    id: '3',
    title: 'Investment Opportunities in African Urban Development',
    excerpt: 'Major cities are seeing significant investment in infrastructure and housing developments, creating opportunities for investors and homebuyers.',
    category: 'Investment',
    image: '/0a30d059e6172811bd3050d8a76b2b0bb9572257.jpg',
    publishedAt: '1 day ago',
    readTime: '6 min read',
    source: 'Investment Weekly'
  },
  {
    id: '4',
    title: 'Sustainable Building Practices Gain Momentum',
    excerpt: 'Green building certifications and sustainable construction methods are becoming standard in new developments across the continent.',
    category: 'Sustainability',
    image: '/1e6cf0bf1fde0aac5a2ca79c541a192be32965b0.jpg',
    publishedAt: '2 days ago',
    readTime: '5 min read',
    source: 'Green Building Africa'
  },
  {
    id: '5',
    title: 'First-Time Homebuyer Programs Expand Across Africa',
    excerpt: 'New government initiatives and private sector partnerships are making homeownership more accessible for first-time buyers.',
    category: 'Policy',
    image: '/5e01d996cd432c7607be8a8aab8947043d230a30.jpg',
    publishedAt: '3 days ago',
    readTime: '4 min read',
    source: 'Housing Policy Today'
  },
  {
    id: '6',
    title: 'Luxury Property Market Sees Record Sales',
    excerpt: 'High-end residential properties are in high demand, with luxury developments selling out faster than ever before in major African cities.',
    category: 'Luxury',
    image: '/e7dca0feae291dde84c585fc8b5952232195a462.jpg',
    publishedAt: '4 days ago',
    readTime: '5 min read',
    source: 'Luxury Living Africa'
  }
];

const categories = [
  { name: 'All', icon: HomeIcon },
  { name: 'Market Trends', icon: TrendingUp },
  { name: 'Investment', icon: DollarSign },
  { name: 'Technology', icon: Building2 }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/feed">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Real Estate News</h1>
              <p className="text-sm text-gray-600">Stay updated with the latest trends</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#037EBA] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900 hover:bg-white">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{article.source}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <span>{article.publishedAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
