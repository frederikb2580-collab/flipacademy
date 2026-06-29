import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhatYouLearn } from "@/components/landing/what-you-learn";
import { WhoIsItFor } from "@/components/landing/who-is-it-for";
import { Community } from "@/components/landing/community";
import { Results } from "@/components/landing/results";
import { Testimonials } from "@/components/landing/testimonials";
import { AIDisclaimer } from "@/components/landing/ai-disclaimer";
import { FAQ } from "@/components/landing/faq";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhatYouLearn />
        <WhoIsItFor />
        <Community />
        <Results />
        <Testimonials />
        <AIDisclaimer />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
