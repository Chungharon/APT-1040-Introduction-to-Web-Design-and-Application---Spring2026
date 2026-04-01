import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IdentitySection() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-brand-gold flex items-center gap-2 border-b border-brand-gold/10 pb-2">
        <User className="w-5 h-5" /> ARTIST&apos;S IDENTITY
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fname">First Name</Label>
          <Input id="fname" placeholder="Enter your first name" className="border-brand-gold/20 focus:border-brand-gold" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clname">Last Name</Label>
          <Input id="clname" placeholder="Enter your last name" className="border-brand-brown/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="Enter your age" className="border-brand-gold/20 focus:border-brand-gold" />
        </div>
      </div>
    </div>
  );
}
