import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { studentHelplines, womenHelplines } from '@/lib/data';
import { Phone } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function HelplinePage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          Helpline Directory
        </h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Student Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentHelplines.map((helpline) => (
                <Card key={helpline.name}>
                  <CardHeader>
                    <CardTitle className="font-headline">{helpline.name}</CardTitle>
                    <CardDescription>{helpline.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={`tel:${helpline.number}`}>
                      <Button className="w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        {helpline.number}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Women's Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {womenHelplines.map((helpline) => (
                <Card key={helpline.name} className="border-accent">
                  <CardHeader>
                    <CardTitle className="font-headline">{helpline.name}</CardTitle>
                    <CardDescription>{helpline.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={`tel:${helpline.number}`}>
                      <Button className="w-full" variant="outline" style={{borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))'}}>
                        <Phone className="mr-2 h-4 w-4" />
                        {helpline.number}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
