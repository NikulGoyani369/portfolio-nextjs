import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../components/ui/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nikulkumar Goyani | Software Test Engineer & V&V Expert',
  description:
    'Senior Software Test Engineer and Verification & Validation Expert with 6+ years of experience in quality engineering, test automation, and software testing in regulated environments. ISTQB CTFL certified.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
