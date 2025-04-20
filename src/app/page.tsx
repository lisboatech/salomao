import HeroSection from "@/components/lp/hero";
import Header from "@/components/lp/header";
import FeaturesSection from "@/components/lp/features";
import HowItWorksSection from "@/components/lp/how-it-works";
import BenefitsSection from "@/components/lp/benefits";
import Footer from "@/components/lp/footer";
import BioSection from '@/components/lp/bio-section';


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <main>
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}