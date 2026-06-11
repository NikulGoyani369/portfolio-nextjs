import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../components/ui/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nikulkumar Goyani',
  alternateName: 'Nikul Goyani',
  url: 'https://nikulgoyani.de',
  jobTitle: 'Senior Software Test Engineer & V&V Expert',
  worksFor: {
    '@type': 'Organization',
    name: 'Straumann Group',
    url: 'https://www.straumann.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chemnitz',
    addressRegion: 'Saxony',
    addressCountry: 'DE',
  },
  sameAs: [
    'https://www.linkedin.com/in/nikulkumar-goyani/',
    'https://github.com/NikulGoyani369',
  ],
  knowsAbout: [
    'Software Testing',
    'Test Automation',
    'Verification and Validation',
    'ISTQB',
    'Quality Assurance',
    'Selenium',
    'Playwright',
    'Python',
    'Java',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'ISTQB Certified Tester Foundation Level 4.0',
    credentialCategory: 'Professional Certification',
  },
  description:
    'Senior Software Test Engineer and V&V Expert with 6+ years of experience in quality engineering and test automation in regulated environments.',
};

export const metadata = {
  title: 'Nikulkumar Goyani | Software Test Engineer & V&V Expert',
  description:
    'Senior Software Test Engineer and Verification & Validation Expert with 6+ years of experience in quality engineering, test automation, and software testing in regulated environments. ISTQB CTFL certified. Based in Chemnitz, Germany.',
  keywords: [
    'Nikulkumar Goyani',
    'Nikul Goyani',
    'Software Test Engineer Germany',
    'V&V Expert',
    'Verification Validation Engineer',
    'ISTQB CTFL',
    'Test Automation Engineer',
    'Quality Assurance Engineer Chemnitz',
    'Selenium Tester',
    'Software Testing Portfolio',
    'QA Engineer Germany',
  ],
  authors: [{ name: 'Nikulkumar Goyani', url: 'https://nikulgoyani.de' }],
  creator: 'Nikulkumar Goyani',
  alternates: {
    canonical: 'https://nikulgoyani.de',
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Nikulkumar Goyani | Software Test Engineer & V&V Expert',
    description:
      'Senior Software Test Engineer with 6+ years of experience in quality engineering, test automation & V&V in regulated environments. ISTQB CTFL certified.',
    url: 'https://nikulgoyani.de',
    siteName: 'Nikulkumar Goyani Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikulkumar Goyani | Software Test Engineer & V&V Expert',
    description:
      'Senior Software Test Engineer with 6+ years of experience in quality engineering, test automation & V&V in regulated environments.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
