'use client';

import '../styles/main.scss';
import { AuthProvider } from '../../context/AuthContext';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PrimeReactProvider>
            {/*<DashboardLayout>*/}
            {children}
            {/*</DashboardLayout>*/}
          </PrimeReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}