import Link from 'next/link';
import {
  BedDouble,
  BookMarked,
  Bus,
  LayoutDashboard,
  Phone,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';

const features = [
  {
    title: 'Accommodations',
    description: 'Find PGs, hostels, and rooms.',
    icon: <BedDouble className="w-8 h-8 text-primary" />,
    href: '/accommodations',
  },
  {
    title: 'Food & Tiffin',
    description: 'Discover restaurants and tiffin services.',
    icon: <UtensilsCrossed className="w-8 h-8 text-primary" />,
    href: '/food',
  },
  {
    title: 'Shops & Essentials',
    description: 'Locate nearby stores for your needs.',
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    href: '/shops',
  },
  {
    title: 'University FAQ',
    description: 'Get AI-powered answers about your uni.',
    icon: <BookMarked className="w-8 h-8 text-primary" />,
    href: '/faq',
  },
  {
    title: 'Transport Info',
    description: 'Check bus routes and timings.',
    icon: <Bus className="w-8 h-8 text-primary" />,
    href: '/transport',
  },
  {
    title: 'Helpline Directory',
    description: 'Access important contact numbers.',
    icon: <Phone className="w-8 h-8 text-primary" />,
    href: '/helpline',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
            KickstartU Dashboard
          </h1>
        </div>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title}>
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
