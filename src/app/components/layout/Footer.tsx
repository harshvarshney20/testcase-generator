'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 relative">
                <Image 
                  src="/logo.svg" 
                  alt="TeleTest Logo" 
                  width={32} 
                  height={32}
                  className="w-full h-full"
                />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TeleTest
              </span>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            &copy; {currentYear} TeleTest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
