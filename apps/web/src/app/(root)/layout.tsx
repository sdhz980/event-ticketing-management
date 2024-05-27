import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '../providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body>
        <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        >
          <div>
            <Navbar />
            <main className="bg-secondary/10 min-h-[calc(100vh-128px)]">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </>
  );
}
