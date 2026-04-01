"use client";

import { Globe, Mail, Phone, MapPin, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = 2026;
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo and About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-brand-gold" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Africa <span className="text-brand-gold">vibe</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed font-light">
              Celebrating the richness of African heritage through festivals, arts, cuisine, and ancient rituals. Join our vibrant community and explore the heartbeat of the continent.
            </p>
            <div className="flex gap-4">
               {[Share2, Globe, Mail].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b-2 border-brand-gold w-fit pb-1">Explore</h3>
            <ul className="space-y-4 text-white/70">
              {["Home", "Festivals", "Arts", "Cuisine", "Rituals"].map((l) => (
                <li key={l}><Link href={`#${l.toLowerCase()}`} className="hover:text-brand-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b-2 border-brand-gold w-fit pb-1">Programs</h3>
            <ul className="space-y-4 text-white/70">
              <li>Arts Apprenticeship</li>
              <li>Culinary Mastery</li>
              <li>Festival Touring</li>
              <li>Cultural Exchange</li>
              <li>Spiritual Guidance</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-b-2 border-brand-gold w-fit pb-1">Contact Us</h3>
            <ul className="space-y-4 text-white/70">
               <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold" />
                <span>hello@africavibe.com</span>
              </li>
               <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold" />
                <span>+234 123 456 7890</span>
              </li>
               <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-gold" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-white/40 text-sm">
          <p>© {currentYear} Africa Vibe. All rights reserved. Crafted with heart and heritage.</p>
        </div>
      </div>
    </footer>
  );
}
