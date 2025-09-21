import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getListings } from '../admin/actions';
import { Star, Search } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function ShopsPage() {
  const shopListings = await getListings('shops');

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          Shops & Essentials
        </h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="mb-6 bg-card p-4 rounded-lg border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search shops..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
                <SelectItem value="uniforms">Uniforms</SelectItem>
                <SelectItem value="essentials">Daily Essentials</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rating</SelectItem>
                <SelectItem value="4+">4 Stars & Up</SelectItem>
                <SelectItem value="3+">3 Stars & Up</SelectItem>
                <SelectItem value="2+">2 Stars & Up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shopListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={listing.imageHint}
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-lg mb-2">{listing.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
                <CardDescription>
                  <Badge variant="secondary">{listing.type}</Badge>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
