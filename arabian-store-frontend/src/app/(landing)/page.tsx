
import CheckoutPage from './checkout/page';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import ProductLandingSection from './components/ProductLandingSection';
import WhyChooseMedjool from './components/WhyChooseMedjool';
import HealthBenefits from './components/HealthBenefits';


export default function Home() {
  return (
    <main className="min-h-screen">
      <ProductLandingSection />
      <WhyChooseMedjool />
    
      <HealthBenefits />
      <div className="bg-[#fcf8f2]" id="order">
        <CheckoutPage />
      </div>
      <CustomerReviews />
      <Footer />
    </main>
  );
}
