'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import LoadingSpinner from '@/components/Ui/Loader/Loader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, loading,isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && !pathName.startsWith('/login')) {
        router.push('/');
      }
      if (isAuthenticated && pathName.startsWith('/login')) {
        router.push('/user');
      }
      // if (isAdmin & isAuthenticated && pathName.startsWith('/login')) {
      //   router.push('/admin');
      // }

    }
  }, [isAuthenticated, pathName, router, loading]);

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
    );
  }

  return (
      <>


          {
            isAdmin ? (
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex flex-col flex-1">
                    <TopBar />
                    <main className="flex-1 p-6 overflow-auto">
                      {children}
                    </main>
                  </div>
                </div>
            ) : (
                <div className="flex flex-col flex-1">
                  <TopBar />
                  <main className="flex-1 p-6 overflow-auto">
                    {children}
                  </main>
                </div>
            )
          }
      </>
  );
}