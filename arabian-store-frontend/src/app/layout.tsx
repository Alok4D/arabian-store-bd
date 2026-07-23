import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import Script from 'next/script';
import './globals.css';

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'খেজুর বাড়ি - প্রিমিয়াম মিশরীয় মেডজুল খেজুর',
  description: 'খেজুরের জগতে এক রাজকীয় অভিজ্ঞতা! প্রিমিয়াম কোয়ালিটি, নরম শাঁস, প্রাকৃতিক মিষ্টতা।',
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={notoSansBengali.className}>
        <ReduxProvider>
          <LenisProvider>
            {children}
            {/* <FloatingContact /> */}
            <Toaster position="top-center" />
          </LenisProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
