import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { FloatingContact } from './components/FloatingContact';
import '../globals.css';

const hindSiliguri = Hind_Siliguri({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'খেজুর বাড়ি - প্রিমিয়াম মিশরীয় মেডজুল খেজুর',
  description: 'খেজুরের জগতে এক রাজকীয় অভিজ্ঞতা! પ્રিমিয়াম কোয়ালিটি, নরম শাঁস, প্রাকৃতিক মিষ্টতা।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.className}>
        {children}
        {/* <FloatingContact /> */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
