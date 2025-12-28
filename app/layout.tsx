import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { NextAuthProvider } from '@/components/NextAuthProvider';

export const metadata = {
  title: 'Next.js Assessment',
  description: 'MUI + Zustand Assessment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
}