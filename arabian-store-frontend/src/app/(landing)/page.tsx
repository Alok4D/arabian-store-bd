
import CheckoutPage from './checkout/page';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import WhyChooseMedjool from './components/WhyChooseMedjool';
import HealthBenefits from './components/HealthBenefits';
import { LiveChatWidget } from './components/LiveChatWidget';
import Navbar from './components/Navbar';
import BannerSection from './components/BannerSection';
import Packages from './components/Packages';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BannerSection />
      <WhyChooseMedjool />
      <Packages />
      <HealthBenefits />
      <div className="bg-[#FAF7F0]">
        <CheckoutPage />
      </div>
      <CustomerReviews />
      <Footer />
      <LiveChatWidget />
    </main>
  );
}
