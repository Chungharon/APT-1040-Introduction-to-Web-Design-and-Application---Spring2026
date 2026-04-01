"use client";

import { motion } from "framer-motion";
import { User, Phone, CalendarDays, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { registerFestival } from "@/app/actions/registrations";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

const countries = [
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Senegal", flag: "🇸🇳" },
  { name: "Uganda", flag: "🇺🇬" },
  { name: "Tanzania", flag: "🇹🇿" },
];

const participantTypes = [
  { id: "Artist", label: "🎨 Artist" },
  { id: "Visitor", label: "👥 Visitor" },
  { id: "VIP", label: "👑 VIP Guest" },
  { id: "MC", label: "🎤 MC/Host" },
  { id: "Vendor", label: "🛍️ Vendor" },
  { id: "Performer", label: "💃 Performer" },
];

const festivalsList = [
  { id: "Durbar", label: "🏇 Durbar (Nigeria)" },
  { id: "Homowo", label: "🌾 Homowo (Ghana)" },
  { id: "Lamu", label: "🐫 Lamu (Kenya)" },
  { id: "CapeTownJazz", label: "🎺 Cape Town Jazz (SA)" },
  { id: "Essence", label: "🌺 Essence (SA)" },
  { id: "Fesman", label: "🎭 FESMAN (Senegal)" },
];

const initialState = {
  success: false,
  error: null as string | null,
};

export function FestivalForm() {
  const [selectedFestivals, setSelectedFestivals] = useState<string[]>([]);
  const [country, setCountry] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // Manual injection for Select and Multi-Checkboxes if needed, 
      // but we'll use hidden inputs in the JSX below
      return await registerFestival(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Festival spot secured! See you there.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const toggleFestival = (id: string) => {
    setSelectedFestivals(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="festivals" className="py-20 bg-brand-cream/50">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-brand-dark mb-4">🎪 AFRICAN FESTIVALS 🎉</h2>
          <p className="text-brand-dark/70 text-lg">Join the biggest celebrations across the continent</p>
        </motion.div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-brand-gold/20 overflow-hidden">
          <CardHeader className="bg-brand-dark text-white p-8">
            <CardTitle>Festival Registration</CardTitle>
            <CardDescription className="text-white/70">Fill in the details to secure your spot in these vibrant celebrations.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12 bg-white">
            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-20 h-20 text-brand-gold mb-4" />
                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Spot Secured!</h3>
                <p className="text-brand-dark/70 mt-2 text-lg">Your festival journey begins here. See you at the celebrations!</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 bg-brand-dark text-white font-bold px-8 py-6 rounded-full hover:bg-brand-gold transition-all"
                >
                  Register Another Guest
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
                  <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                    <User className="w-5 h-5" /> PARTICIPANT IDENTITY
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fname">First Name</Label>
                      <Input id="fname" name="fname" required placeholder="Enter your first name" className="border-brand-gold/20 focus:border-brand-gold" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clname">Last Name</Label>
                      <Input id="clname" name="clname" required placeholder="Enter your last name" className="border-brand-gold/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" name="age" type="number" required placeholder="Enter your age" className="border-brand-gold/20 focus:border-brand-gold" />
                    </div>
                  </div>
                </div>

                {/* Location & Contact Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2">
                      📍 LOCATION
                    </h3>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select required onValueChange={setCountry}>
                        <SelectTrigger className="border-brand-gold/20">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.name} value={c.name}>{c.flag} {c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="fcountry" value={country} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Postal Address</Label>
                      <Input id="address" name="address" required placeholder="Enter your postal address" className="border-brand-gold/20" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                      <Phone className="w-5 h-5" /> CONTACT
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" required placeholder="you@example.com" className="border-brand-gold/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="+123 456 7890" className="border-brand-gold/20" />
                    </div>
                  </div>
                </div>

                {/* Participant Type Selection */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                    🎪 TYPE OF PARTICIPANT
                  </h3>
                  <RadioGroup defaultValue="Artist" name="participantType" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {participantTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 bg-brand-cream/30 p-3 rounded-md border border-brand-gold/10 hover:border-brand-gold/40 transition-colors">
                        <RadioGroupItem value={type.id} id={`p-${type.id}`} className="text-brand-gold border-brand-gold" />
                        <Label htmlFor={`p-${type.id}`} className="cursor-pointer font-medium">{type.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Festival Selection */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                    🎉 SELECT FESTIVALS TO ATTEND
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {festivalsList.map((f) => (
                      <div key={f.id} className="flex items-center space-x-2 bg-brand-cream/30 p-3 rounded-md border border-brand-gold/10 hover:border-brand-gold/40 transition-colors">
                        <Checkbox 
                          id={`f-${f.id}`} 
                          checked={selectedFestivals.includes(f.id)}
                          onCheckedChange={() => toggleFestival(f.id)}
                          className="data-[state=checked]:bg-brand-gold border-brand-gold/40" 
                        />
                        <Label htmlFor={`f-${f.id}`} className="cursor-pointer font-medium text-sm">{f.label}</Label>
                        {selectedFestivals.includes(f.id) && <input type="hidden" name="festivals" value={f.id} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date & Comments Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-green flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                    <CalendarDays className="w-5 h-5" /> PREFERENCES
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" name="date" type="date" required className="border-brand-gold/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmotivation">What aspects of African festivals interest you most?</Label>
                    <Textarea id="cmotivation" name="cmotivation" required placeholder="Your interests and expectations..." className="border-brand-brown/20 min-h-[120px]" />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-brand-dark hover:bg-brand-gold text-white font-bold py-8 text-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isPending ? "Sending Invitation..." : "SUBMIT FESTIVAL REGISTRATION"}
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
