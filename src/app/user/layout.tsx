import { ReactNode } from "react";
import TopBar from "../../layouts/DashboardLayouts/TopBar";


interface RootLayoutProps {
  children: ReactNode;
}
export default function UserLayout({ children }: RootLayoutProps) {
  return (
    <div className='flex flex-col flex-1'>
      <TopBar />
      <div>
        {children}
      </div>
    </div>
  );
}
