import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import Script from 'next/script';
import './globals.css';

const notoSansBengali = Noto_Sans_Bengali({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
});

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
