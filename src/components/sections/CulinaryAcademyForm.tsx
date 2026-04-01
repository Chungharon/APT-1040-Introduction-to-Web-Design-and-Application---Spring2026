"use client";

import { motion } from "framer-motion";
import { User, Phone, BookOpen, Utensils, ChefHat, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { registerCulinaryAcademy } from "@/app/actions/registrations";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";

const culinaryCategories = [
  { id: "hot", label: "🔥 Hot Kitchen (Saucier/Grill)" },
  { id: "cold", label: "🥗 Cold Kitchen (Garde Manger)" },
  { id: "pastry", label: "🥐 Pastry & Bakery" },
  { id: "traditional", label: "🥘 Traditional & Heritage Cuisine" },
  { id: "admin", label: "📋 Culinary Admin & Logistics" },
  { id: "general", label: "🔄 General/Rotational" },
];

const initialState = {
  success: false,
  error: null as string | null,
};

export function CulinaryAcademyForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await registerCulinaryAcademy(formData);
    },
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Chef application sent! Time to spice things up.");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <section id="cuisine" className="py-20 bg-brand-cream/50">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-brand-dark mb-4">👨‍🍳 JOIN THE CULINARY ACADEMY 🍛</h2>
          <p className="text-brand-dark/70 text-lg">Savor and master the diverse flavors of African heritage</p>
        </motion.div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-brand-brown/20 overflow-hidden bg-white">
          <CardHeader className="bg-brand-brown text-white p-8">
            <CardTitle>Culinary Academy Registration</CardTitle>
            <CardDescription className="text-white/70">From spice blends to master plating, start your chef&apos;s journey here.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 className="w-20 h-20 text-brand-brown mb-4" />
                <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Chef Registered!</h3>
                <p className="text-brand-dark/70 mt-2 text-lg">Your culinary journey has begun. We&apos;ll be in touch soon.</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 bg-brand-brown text-white font-bold px-8 py-6 rounded-full hover:bg-brand-dark transition-all"
                >
                  Register Another Chef
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

                {/* Identity & Contact Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2">
                      <User className="w-5 h-5" /> CHEF&apos;S IDENTITY
                    </h3>
                     <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cfname">First Name</Label>
                        <Input id="cfname" name="cfname" required placeholder="Enter your first name" className="border-brand-brown/20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clname">Last Name</Label>
                        <Input id="clname" name="clname" required placeholder="Enter your last name" className="border-brand-brown/20" />
                      </div>
                       <div className="flex gap-4">
                          <div className="space-y-2 flex-1">
                            <Label htmlFor="cage">Age</Label>
                            <Input id="cage" name="cage" type="number" required className="border-brand-brown/20" />
                          </div>
                          <div className="space-y-2 flex-1">
                             <Label htmlFor="ccountry">Country</Label>
                             <Input id="ccountry" name="ccountry" required type="text" className="border-brand-brown/20" />
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2">
                      <Phone className="w-5 h-5" /> CONTACT
                    </h3>
                     <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cemail">Email Address</Label>
                        <Input id="cemail" name="cemail" type="email" required placeholder="you@kitchen.com" className="border-brand-brown/20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cphone">Phone Number</Label>
                        <Input id="cphone" name="cphone" type="tel" required placeholder="+123 456 7890" className="border-brand-brown/20" />
                      </div>
                       <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2 mt-8">
                        <ChefHat className="w-5 h-5" /> SKILL LEVEL
                      </h3>
                       <RadioGroup defaultValue="Beginner" name="skillLevel" className="flex flex-wrap gap-4 pt-2">
                        {["Beginner", "Intermediate", "Advanced"].map((lv) => (
                          <div key={lv} className="flex items-center space-x-2">
                            <RadioGroupItem value={lv} id={`clv-${lv}`} className="text-brand-brown border-brand-brown" />
                            <Label htmlFor={`clv-${lv}`} className="cursor-pointer font-medium">{lv}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                 {/* Culinary Category Selection */}
                 <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2">
                    <Utensils className="w-5 h-5" /> SELECT SPECIALIZATION CATEGORIES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {culinaryCategories.map((c) => (
                      <div key={c.id} className="flex flex-col space-y-2 bg-brand-brown/5 p-4 rounded-xl border border-brand-brown/10 hover:bg-brand-brown/10 transition-colors">
                        <div className="flex items-center space-x-3">
                           <Checkbox 
                              id={`cc-${c.id}`} 
                              checked={selectedCategories.includes(c.id)}
                              onCheckedChange={() => toggleCategory(c.id)}
                              className="data-[state=checked]:bg-brand-brown border-brand-brown/40" 
                           />
                           <Label htmlFor={`cc-${c.id}`} className="cursor-pointer font-bold text-brand-brown">{c.label.split("(")[0].trim()}</Label>
                           {selectedCategories.includes(c.id) && <input type="hidden" name="categories" value={c.id} />}
                        </div>
                        <p className="text-xs text-brand-dark/60 font-medium pl-8 italic">{c.label.includes("(") ? c.label.split("(")[1].replace(")", "") : ""}</p>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* Motivation */}
                 <div className="space-y-6">
                  <h3 className="text-xl font-bold text-brand-brown flex items-center gap-2 border-b border-brand-brown/10 pb-2">
                    <BookOpen className="w-5 h-5" /> CHEF&apos;S VISION
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="cmotivation">What African flavor or cooking technique inspires you most?</Label>
                    <Textarea id="cmotivation" name="cmotivation" required placeholder="Your culinary aspirations..." className="border-brand-brown/20 min-h-[120px]" />
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white font-bold py-8 text-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isPending ? "Prepping the Kitchen..." : "SUBMIT CULINARY APPLICATION"}
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
