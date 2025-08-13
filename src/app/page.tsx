'use client';

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/test-case-generator');
  
  // This return statement is a fallback and won't be reached due to the redirect
  return null;
}
