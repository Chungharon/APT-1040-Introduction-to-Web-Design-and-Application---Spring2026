"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/app/actions/registrations";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  error: null as string | null,
};

export function NewsletterSection() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      return await subscribeToNewsletter(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Welcome to the Vibe! Check your inbox.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section id="newsletter" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-brown/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-bold tracking-widest uppercase">Join the Inner Circle</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
              JOIN THE <span className="text-brand-gold">VIBE</span> <br />
              GET THE SOUL OF AFRICA
            </h2>
            
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Subscribe to receive curated cultural gems, festival early-access, 
              and exclusive secrets from the heart of the continent.
            </p>

            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/20 p-10 rounded-3xl backdrop-blur-md"
              >
                <CheckCircle2 className="w-16 h-16 text-brand-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">You&apos;re officially part of the Vibe!</h3>
                <p className="text-white/60">Check your inbox for a special piece of the continent.</p>
              </motion.div>
            ) : (
              <form action={formAction} className="relative max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-brand-gold transition-colors" />
                    <Input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Enter your email address" 
                      className="bg-white/5 border-white/20 pl-12 h-16 rounded-2xl text-lg focus:ring-brand-gold focus:border-brand-gold transition-all"
                    />
                  </div>
                  <Button 
                    disabled={isPending}
                    className="bg-brand-gold hover:bg-white text-brand-dark font-black px-10 h-16 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all uppercase tracking-widest disabled:opacity-50"
                  >
                    {isPending ? "Connecting..." : "Join Now"}
                  </Button>
                </div>
                
                {state.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-brand-gold text-sm font-bold"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {state.error}
                  </motion.div>
                )}
              </form>
            )}
            
            <p className="mt-20 text-white/30 text-xs uppercase tracking-[0.3em] font-medium">
              We respect your rhythm. Zero spam, just pure Africa.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
