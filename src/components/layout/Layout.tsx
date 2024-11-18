import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/sonner';
import { OfflineBanner } from '@/components/ui/offline-banner';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <OfflineBanner />
      <div className="flex">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8",
            "min-h-[calc(100dvh-4rem)]",
            "animate-fade-in",
            sidebarOpen ? "md:pl-64" : "md:pl-20"
          )}
        >
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}