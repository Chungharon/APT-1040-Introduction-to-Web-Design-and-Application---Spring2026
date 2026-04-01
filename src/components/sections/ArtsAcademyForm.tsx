"use client";

import { motion } from "framer-motion";
import { User, Phone, BookOpen, GraduationCap, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { registerArtsAcademy } from "@/app/actions/registrations";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  error: null as string | null,
};

export function ArtsAcademyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await registerArtsAcademy(formData);
      return result;
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Arts application submitted! The spirits are with you.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <section id="arts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-brand-dark mb-4">🎭 JOIN THE ARTS ACADEMY 🎨</h2>
          <p className="text-brand-dark/70 text-lg">Master the traditional and contemporary arts of Africa</p>
        </motion.div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-brand-green/20 overflow-hidden bg-white">
          <CardHeader className="bg-brand-green text-white p-8">
            <CardTitle className="text-2xl font-bold">Arts Academy Registration</CardTitle>
            <CardDescription className="text-white/80 font-medium">Connect with masters and unleash your creative potential.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-20 h-20 text-brand-green mb-4" />
                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Application Received!</h3>
                <p className="text-brand-dark/70 mt-2 text-lg">The ancestors are pleased. We will contact you shortly.</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 bg-brand-green text-white font-bold px-8 py-6 rounded-full hover:bg-brand-dark transition-all"
                >
                  Register Another Artist
                </Button>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-10">
                {state.error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-bold">{state.error}</p>
                  </div>
                )}

                {/* Identity Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-green/10 pb-2 uppercase tracking-wide">
                    <User className="w-5 h-5" /> Artist&apos;s Identity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="afname" className="text-brand-dark font-bold">First Name</Label>
                      <Input id="afname" name="afname" required placeholder="Enter your first name" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alname" className="text-brand-dark font-bold">Last Name</Label>
                      <Input id="alname" name="alname" required placeholder="Enter your last name" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aage" className="text-brand-dark font-bold">Age</Label>
                      <Input id="aage" name="aage" type="number" required placeholder="Enter your age" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="acountry" className="text-brand-dark font-bold">Country</Label>
                      <Input id="acountry" name="acountry" required placeholder="Enter your country" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-green/10 pb-2 uppercase tracking-wide">
                    <Phone className="w-5 h-5" /> Contact Information
                  </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="aemail" className="text-brand-dark font-bold">Email Address</Label>
                      <Input id="aemail" name="aemail" type="email" required placeholder="you@academy.com" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aphone" className="text-brand-dark font-bold">Phone Number</Label>
                      <Input id="aphone" name="aphone" type="tel" required placeholder="+123 456 7890" className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10" />
                    </div>
                  </div>
                </div>

                 {/* Level & Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-green/10 pb-2 uppercase tracking-wide">
                      <GraduationCap className="w-5 h-5" /> Proficiency Level
                    </h3>
                     <RadioGroup defaultValue="Beginner" name="proficiency" className="flex flex-col gap-3">
                      {["Beginner", "Intermediate", "Advanced"].map((lv) => (
                        <div key={lv} className="flex items-center space-x-2 bg-brand-green/5 p-4 rounded-lg border border-brand-green/10 hover:border-brand-green/30 transition-colors">
                          <RadioGroupItem value={lv} id={`lv-${lv}`} className="text-brand-green border-brand-green shadow-sm" />
                          <Label htmlFor={`lv-${lv}`} className="cursor-pointer font-bold text-brand-dark/80">{lv}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-green/10 pb-2 uppercase tracking-wide">
                      <BookOpen className="w-5 h-5" /> Creative Portfolio
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="text-brand-dark font-bold">Upload Work Samples</Label>
                      <div className="flex flex-col gap-2">
                         <Input id="portfolio" name="portfolio" type="file" className="border-brand-green/30 bg-brand-cream/10 file:bg-brand-green file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 file:font-semibold cursor-pointer" />
                         <span className="text-xs text-brand-dark/60 font-medium italic">Acceptable formats: PDF, ZIP, JPG (Max 10MB)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-green/10 pb-2 uppercase tracking-wide">
                    💡 Your Motivation
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="amotivation" className="text-brand-dark font-bold">Why do you want to join our Arts Academy?</Label>
                    <Textarea id="amotivation" name="amotivation" required placeholder="Your artistic vision and goals..." className="border-brand-green/30 focus:border-brand-green bg-brand-cream/10 min-h-[150px] text-brand-dark" />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-brand-green hover:bg-brand-dark text-white font-black py-10 text-2xl shadow-xl hover:shadow-2xl transition-all uppercase tracking-widest disabled:opacity-50"
                  >
                    {isPending ? "Invoking The Spirits..." : "Secure Your Spot"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
