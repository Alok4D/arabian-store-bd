import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'খেজুর বাড়ি - প্রিমিয়াম মিশরীয় মেডজুল খেজুর',
  description: 'খেজুরের জগতে এক রাজকীয় অভিজ্ঞতা! প্রিমিয়াম কোয়ালিটি, নরম শাঁস, প্রাকৃতিক মিষ্টতা।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <ReduxProvider>
          {children}
          {/* <FloatingContact /> */}
          <Toaster position="top-center" />
        </ReduxProvider>
      </body>
    </html>
  );
}
