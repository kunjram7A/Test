import FaqClient from './client';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function FaqPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          University FAQ Bot
        </h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <FaqClient />
      </main>
    </div>
  );
}
