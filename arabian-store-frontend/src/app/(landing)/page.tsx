import CheckoutPage from './checkout/page';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import WhyChooseMedjool from './components/WhyChooseMedjool';
import { LiveChatWidget } from './components/LiveChatWidget';
import Navbar from './components/Navbar';
import BannerSection from './components/BannerSection';
import Packages from './components/Packages';
import BenefitsSection from './components/BenefitsSection';


export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar /> 
      <BannerSection />
      <WhyChooseMedjool />
      <Packages />
      <BenefitsSection />
      {/* <HealthBenefits /> */}
      <div className="bg-[#FAF7F0]">
        <CheckoutPage />
      </div>
      <CustomerReviews />
      <Footer />
      <LiveChatWidget />
    </main>
  );
}

