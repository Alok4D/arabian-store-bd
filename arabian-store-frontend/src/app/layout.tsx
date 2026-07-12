import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import './globals.css';

const notoSansBengali = Noto_Sans_Bengali({ 
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
      <body className={notoSansBengali.className}>
        <ReduxProvider>
          {children}
          {/* <FloatingContact /> */}
          <Toaster position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}
