import { Hero } from "@/components/sections/Hero";
import { FestivalForm } from "@/components/sections/FestivalForm";
import { ArtsAcademyForm } from "@/components/sections/ArtsAcademyForm";
import { CulinaryAcademyForm } from "@/components/sections/CulinaryAcademyForm";
import { RitualForm } from "@/components/sections/RitualForm";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FestivalForm />
      <ArtsAcademyForm />
      <CulinaryAcademyForm />
      <RitualForm />
      <NewsletterSection />
    </div>
  );
}
