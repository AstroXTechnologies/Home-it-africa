'use client';

import { ArrowRight, MessageCircle, Star, Menu, X, Home, Building2, Video, Info, Phone, Bed, Bath, Maximize, MapPin, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="font-['Pacifico'] text-xl md:text-2xl text-[#1B4F5C]">Home-It Africa</span>
                <span className="font-['Lato'] text-[10px] md:text-xs text-[#FFD700]">Powered by GidiSteel</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-gray-700 hover:text-[#037EBA] transition-colors">Home</a>
              <a href="#projects" className="text-sm font-medium text-gray-700 hover:text-[#037EBA] transition-colors">Projects</a>
              <a href="#virtual-tour" className="text-sm font-medium text-gray-700 hover:text-[#037EBA] transition-colors">Virtual Tour</a>
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-[#037EBA] transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-[#037EBA] transition-colors">Contact</a>
            </nav>

            {/* CTA Button */}
            <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
              Let's Talk
              <Phone className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block py-2 text-sm font-medium text-gray-700">Home</a>
              <a href="#projects" className="block py-2 text-sm font-medium text-gray-700">Projects</a>
              <a href="#virtual-tour" className="block py-2 text-sm font-medium text-gray-700">Virtual Tour</a>
              <a href="#about" className="block py-2 text-sm font-medium text-gray-700">About</a>
              <a href="#contact" className="block py-2 text-sm font-medium text-gray-700">Contact</a>
              <button className="w-full mt-2 bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white px-6 py-3 rounded-full text-sm font-semibold">
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-[#1B4F5C] to-[#0d2830] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/0a30d059e6172811bd3050d8a76b2b0bb9572257.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></span>
                <span className="text-[#FFD700] text-xs md:text-sm font-semibold">Trusted by 10,000+ Clients</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                The <span className="text-[#FFD700]">#1</span> Real Estate Platform in Nigeria
              </h1>

              <p className="text-base md:text-lg text-gray-300 max-w-xl">
                Where Dreams Become Apartments: Transforming Visions into Vibrant Living Spaces with Premium Properties Across Nigeria.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login" className="flex items-center justify-center gap-2 bg-white text-[#1B4F5C] px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all group">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1B4F5C] transition-all">
                  <MessageCircle className="w-5 h-5" />
                  Let's Talk
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">8.5K+</div>
                  <div className="text-xs md:text-sm text-gray-300">Properties Sold</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
                  <div className="text-xs md:text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FFD700]">Only 2%</div>
                  <div className="text-xs md:text-sm text-gray-300">Commission Fee</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Card */}
            <div className="relative hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[#1B4F5C]" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Premium Properties</div>
                      <div className="text-gray-300 text-sm">Verified & Luxury Listings</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#037EBA] rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Virtual Tours 24/7</div>
                      <div className="text-gray-300 text-sm">Explore from Anywhere</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00B894] rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold">100% Verified</div>
                      <div className="text-gray-300 text-sm">Secure Transactions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4F5C] mb-4">
              Our Competitive Edge
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that speak for themselves. See why we're the most trusted real estate company in Africa.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { icon: '/1.png', number: '8,500+', label: 'Properties Sold' },
              { icon: '/2.png', number: '15+', label: 'Years of Trust' },
              { icon: '/DIV-119.png', number: '10,000+', label: 'Active Clients' },
              { icon: '/3.png', number: '50+', label: 'Locations' },
              { icon: '/4.png', number: '2%', label: 'Facilitator Fee' },
              { icon: '/DIV-158.png', number: '4.9/5', label: 'Client Rating' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-12 h-12 mx-auto mb-4">
                  <Image src={stat.icon} alt={stat.label} width={48} height={48} className="w-full h-full object-contain" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-[#1B4F5C] mb-2">{stat.number}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="projects" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4F5C] mb-4">
              Our Premium Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of luxury properties across Nigeria's most prestigious locations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: '/b0dddf10368b36491724e022088b3e8d5261abca.jpg', title: 'Luxury Villa Estate', price: '₦85,000,000', location: 'Kubwa, Abuja', bed: 4, bath: 3, area: 450 },
              { img: '/1e6cf0bf1fde0aac5a2ca79c541a192be32965b0.jpg', title: 'Modern Penthouse', price: '₦120,000,000', location: 'Kubwa, Abuja', bed: 5, bath: 4, area: 380 },
              { img: '/5ca304c172b6ab5d17bdcbd853a510e0bf97d23f.jpg', title: 'Exotic Duplex', price: '₦45,000,000', location: 'Kubwa, Abuja', bed: 6, bath: 5, area: 520 },
              { img: '/9a0b9bb429efd9945a35a796d631d03c7e5af441.jpg', title: 'Executive Mansion', price: '₦200,000,000', location: 'Kubwa, Abuja', bed: 7, bath: 6, area: 650 },
              { img: '/5e01d996cd432c7607be8a8aab8947043d230a30.jpg', title: 'Smart Haven Villa', price: '₦95,000,000', location: 'Kubwa, Abuja', bed: 5, bath: 4, area: 480 },
              { img: '/e7dca0feae291dde84c585fc8b5952232195a462.jpg', title: 'Waterfront Apartment', price: '₦75,000,000', location: 'Kubwa, Abuja', bed: 3, bath: 3, area: 280 }
            ].map((property, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={property.img}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#FFD700] text-[#1B4F5C] px-3 py-1 rounded-full text-sm font-bold">
                    {property.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 text-[#037EBA]" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bed} Bed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bath} Bath</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{property.area} m²</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#1B4F5C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#163d47] transition-colors">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section id="virtual-tour" className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4F5C] mb-4">
              Experience Properties Like Never Before
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our properties from anywhere in the world with our cutting-edge Virtual Tour technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { icon: '/DIV-552 (2) copy.png', title: 'Save Time', desc: 'Explore properties instantly without travel' },
              { icon: '/DIV-563 (1) copy.png', title: 'Unbeatable Cost', desc: 'Save on transportation and accommodation' },
              { icon: '/DIV-563 (1) copy.png', title: 'Safe & Secure', desc: 'Experience properties safely from home' }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <Image src={benefit.icon} alt={benefit.title} width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-[#1B4F5C] to-[#0d2830] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(/99f7729a5674be0f9c100dcae34d36860bfeadb6\\ \\(1\\)\\ copy\\ copy.png)', backgroundSize: 'cover' }}></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Property Journey Today
            </h2>
            <p className="text-gray-300">
              Join thousands of satisfied clients who found their dream homes with us.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037EBA] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#037EBA] to-[#00B894] text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFC107] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#1B4F5C]">
                Home-It Africa
              </h3>
              <p className="text-sm text-[#1B4F5C]">
                Your trusted partner in finding the perfect property across Nigeria.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#1B4F5C] mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Buy</a></li>
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Rent</a></li>
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Short Term</a></li>
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">New Projects</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1B4F5C] mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Property Management</a></li>
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Property Valuation</a></li>
                <li><a href="#" className="text-sm text-[#1B4F5C] hover:text-[#037EBA] transition-colors">Legal Agreements</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#1B4F5C] mb-4">Contact</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 bg-white/80 border border-[#1B4F5C]/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#037EBA]"
                />
                <button className="w-full bg-[#1B4F5C] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#153d47] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#1B4F5C]/20 text-center">
            <p className="text-sm text-[#1B4F5C]">
              © 2024 Home-It Africa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
