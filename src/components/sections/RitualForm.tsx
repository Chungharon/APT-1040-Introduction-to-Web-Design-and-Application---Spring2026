"use client";

import { motion } from "framer-motion";
import { User, MapPin, Sparkles, Flame, Moon, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { registerRitual } from "@/app/actions/registrations";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

const ritualRoles = [
  { id: "elder", label: "Elder/Ancestral Guide" },
  { id: "priest", label: "Priest/Priestess" },
  { id: "healer", label: "Traditional Healer" },
  { id: "drummer", label: "Ritual Drummer" },
  { id: "dancer", label: "Sacred Dancer" },
  { id: "seeker", label: "Spiritual Seeker" },
];

const ritualCeremonies = [
  { id: "odunde", label: "Odunde Festival (Yoruba)" },
  { id: "libation", label: "Sacred Libation Ceremony" },
  { id: "masked", label: "Traditional Masked Dance" },
  { id: "ancestral", label: "Ancestral Invocation" },
  { id: "herbal", label: "Sacred Herbal Workshop" },
  { id: "initiations", label: "Seasonal Initiations" },
];

const initialState = {
  success: false,
  error: null as string | null,
};

export function RitualForm() {
  const [country, setCountry] = useState("");
  const [selectedCeremonies, setSelectedCeremonies] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await registerRitual(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Petition invoked! The ancestors have heard you.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const toggleCeremony = (id: string) => {
    setSelectedCeremonies(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <section id="rituals" className="py-20 bg-brand-dark/5">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-brand-dark mb-4"><Moon className="inline-block mr-2 w-8 h-8" /> AFRICAN RITUALS <Moon className="inline-block ml-2 w-8 h-8" /></h2>
          <p className="text-brand-dark/70 text-lg">Sacred ceremonies and ancestral traditions</p>
        </motion.div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-brand-gold/20 overflow-hidden bg-brand-dark text-white ring-1 ring-white/10">
          <CardHeader className="p-10 border-b border-white/10 bg-brand-dark/50">
            <CardTitle className="text-4xl font-black text-brand-gold tracking-tight">Sacred Entry Form</CardTitle>
            <CardDescription className="text-white/80 font-medium text-lg mt-2">Connect with the roots, spirits, and guardians of the ancestors.</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-12 bg-zinc-900/40">
            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Flame className="w-24 h-24 text-brand-gold mb-6 animate-pulse" />
                <h3 className="text-4xl font-black text-brand-gold uppercase tracking-widest">Entry Invoked</h3>
                <p className="text-white/80 mt-4 text-xl max-w-md">The spirits have acknowledged your petition. Wait for the sacred sign.</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-12 bg-brand-gold text-brand-dark font-black px-12 py-8 text-xl rounded-none hover:bg-white transition-all shadow-[0_0_30px_rgba(227,176,75,0.5)]"
                >
                  Initiate New Petition
                </Button>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-10">
                {state.error && (
                  <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-bold">{state.error}</p>
                  </div>
                )}

                 {/* Spiritual Identity */}
                <div className="space-y-6">
                   <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/20 pb-3 uppercase tracking-widest">
                    <Sparkles className="w-5 h-5" /> Spiritual Identity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                      <Label htmlFor="sname" className="text-white font-bold">Spiritual/Ancestral Name</Label>
                      <Input id="sname" name="sname" required placeholder="Name given by elders or spirits" className="bg-white/10 border-white/20 text-white focus:border-brand-gold h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clan" className="text-white font-bold">Clan/Lineage</Label>
                      <Input id="clan" name="clan" required placeholder="Tribe, totem, or family lineage" className="bg-white/10 border-white/20 text-white focus:border-brand-gold h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sage" className="text-white font-bold">Age (Must be 18+ for sacred rites)</Label>
                      <Input id="sage" name="sage" type="number" min="18" required className="bg-white/10 border-white/20 text-white focus:border-brand-gold h-12" />
                    </div>
                  </div>
                </div>

                 {/* Sacred Location */}
                <div className="space-y-6">
                   <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/20 pb-3 uppercase tracking-widest">
                    <MapPin className="w-5 h-5" /> Sacred Origin
                  </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-white font-bold">Country of Origin</Label>
                      <Select required onValueChange={setCountry}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                          <SelectValue placeholder="Select your land" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-dark text-white border-white/20">
                           <SelectItem value="Nigeria">🇳🇬 Nigeria - Yoruba/Igbo/Hausa</SelectItem>
                           <SelectItem value="Ghana">🇬🇭 Ghana - Akan/Ewe/Ga</SelectItem>
                           <SelectItem value="Kenya">🇰🇪 Kenya - Maasai/Kikuyu</SelectItem>
                           <SelectItem value="Benin">🇧🇯 Benin - Vodun</SelectItem>
                           <SelectItem value="Mali">🇲🇱 Mali - Dogon/Bambara</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="rcountry" value={country} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site" className="text-white font-bold">Ancestral Village/Sacred Site</Label>
                      <Input id="site" name="site" required placeholder="Name of your sacred home" className="bg-white/10 border-white/20 text-white h-12" />
                    </div>
                  </div>
                </div>

                 {/* Role and Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/20 pb-3 uppercase tracking-widest">
                      <User className="w-5 h-5" /> Ritual Role
                    </h3>
                     <RadioGroup defaultValue="Seeker" name="role" className="grid grid-cols-1 gap-3">
                      {ritualRoles.map((role) => (
                        <div key={role.id} className="flex items-center space-x-2 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-brand-gold/40 transition-all cursor-pointer group">
                          <RadioGroupItem value={role.id} id={`r-${role.id}`} className="text-brand-gold border-white/40" />
                          <Label htmlFor={`r-${role.id}`} className="cursor-pointer font-bold text-white/90 group-hover:text-white transition-colors">{role.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/20 pb-3 uppercase tracking-widest">
                      <Sparkles className="w-5 h-5" /> Spiritual Contact
                    </h3>
                     <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="semail" className="text-white font-bold">Email for Sacred Communication</Label>
                        <Input id="semail" name="semail" type="email" required placeholder="spiritual@path.com" className="bg-white/10 border-white/20 text-white h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sphone" className="text-white font-bold">Vocal Contact (Phone)</Label>
                        <Input id="sphone" name="sphone" type="tel" required className="bg-white/10 border-white/20 text-white h-12" />
                      </div>
                    </div>
                  </div>
                </div>

                 {/* Ceremony Selection */}
                 <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-white/20 pb-3 uppercase tracking-widest">
                    <Flame className="w-5 h-5" /> Select Ritual Ceremony
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ritualCeremonies.map((c) => (
                      <div key={c.id} className="flex items-center space-x-3 bg-white/5 p-5 rounded-xl border border-white/10 group hover:border-brand-gold/60 transition-all cursor-pointer">
                         <Checkbox 
                            id={`rc-${c.id}`} 
                            checked={selectedCeremonies.includes(c.id)}
                            onCheckedChange={() => toggleCeremony(c.id)}
                            className="data-[state=checked]:bg-brand-gold border-white/40" 
                         />
                         <Label htmlFor={`rc-${c.id}`} className="cursor-pointer font-black text-white/80 group-hover:text-white transition-colors uppercase text-xs tracking-tighter">{c.label}</Label>
                         {selectedCeremonies.includes(c.id) && <input type="hidden" name="ceremonies" value={c.id} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-brand-gold hover:bg-white text-brand-dark font-black py-12 text-2xl shadow-[0_0_50px_rgba(227,176,75,0.3)] hover:shadow-[0_0_60px_rgba(227,176,75,0.5)] border-0 transition-all uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {isPending ? "Invoking The Ancestors..." : "Invoke Ceremony Entry"}
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
