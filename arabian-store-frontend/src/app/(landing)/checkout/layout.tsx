import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LiveChatWidget } from '../components/LiveChatWidget';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <LiveChatWidget />
    </div>
  );
}
