'use client';

import { FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <Image 
                  src="/logo.svg" 
                  alt="TeleTest Logo" 
                  width={32} 
                  height={32}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TeleTest
              </span>
            </Link>
          </div>

          {/* Navigation links removed as per request */}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/test-case-generator"
              className="text-gray-900 hover:text-gray-900 transition-colors px-3 py-2 rounded-md text-sm font-semibold"
            >
              Test Case Generator
            </Link>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            <div className="flex space-x-3">

              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
