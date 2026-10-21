import type { Metadata } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Avineshwaran A. | Portfolio',
  description:
    'Portfolio of Avineshwaran A. — B.E. Computer Science & Engineering at Rajalakshmi Institute of Technology, Chennai.',
  keywords: ['Avineshwaran', 'portfolio', 'HTML/CSS', 'SQL', 'Python', 'projects'],
  authors: [{ name: 'Avineshwaran A.' }],
  creator: 'Avineshwaran A.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Avineshwaran A. | Portfolio',
    description: 'Portfolio of Avineshwaran A. — projects and contact.',
    siteName: 'Avineshwaran A. Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avineshwaran A. | Portfolio',
    description: 'Portfolio of Avineshwaran A. — projects and contact.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
