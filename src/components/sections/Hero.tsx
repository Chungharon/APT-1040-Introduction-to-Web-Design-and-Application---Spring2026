"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Discover the <span className="text-brand-gold">AFRICA</span> Vibes
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Embark on a soulful journey through the heart of the continent. 
            Experience the colors, rhythms, and flavors that define Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-brand-gold hover:bg-white text-brand-dark font-black px-10 h-16 text-lg transition-all shadow-[0_0_40px_rgba(227,176,75,0.2)] hover:shadow-[0_0_50px_rgba(227,176,75,0.4)] border-0 uppercase tracking-wider">
              Watch more
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-brand-dark font-black px-10 h-16 text-lg transition-all uppercase tracking-wider"
              onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative patterns could go here */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
