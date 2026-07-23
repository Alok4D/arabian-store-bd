import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import Script from 'next/script';
import { LenisProvider } from '@/components/providers/LenisProvider';
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
    <html lang="bn" className={manrope.variable}>
      <head>
        {/* Facebook Pixel Code - Test ID */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}'); 
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={manrope.className}>
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
