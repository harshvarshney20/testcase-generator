'use client';

import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
