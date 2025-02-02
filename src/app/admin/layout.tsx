import Sidebar from '@/layouts/DashboardLayouts/Sidebar';
import { ReactNode } from "react";


interface RootLayoutProps {
  children: ReactNode;
}
export default function AdminLayout({ children }: RootLayoutProps) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div>
        {children}
      </div>
    </div>
  );
}
