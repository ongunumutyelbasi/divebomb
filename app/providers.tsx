// src/app/providers.tsx
'use client'; // This must be a client component

import { ThemeProvider } from 'next-themes';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}