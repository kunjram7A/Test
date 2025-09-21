import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { busRoutes, metroRoutes } from '@/lib/data';
import { Bus, TramFront } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function TransportPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 md:p-6">
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          Transport Information
        </h1>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Tabs defaultValue="bus" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bus">
              <Bus className="mr-2 h-4 w-4" />
              Bus Routes
            </TabsTrigger>
            <TabsTrigger value="metro">
              <TramFront className="mr-2 h-4 w-4" />
              Metro Routes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bus">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route No.</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Timings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busRoutes.map((route) => (
                  <TableRow key={route.routeNumber}>
                    <TableCell className="font-medium">{route.routeNumber}</TableCell>
                    <TableCell>{route.start}</TableCell>
                    <TableCell>{route.end}</TableCell>
                    <TableCell>{route.timings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="metro">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Line</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Timings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metroRoutes.map((route) => (
                  <TableRow key={route.routeNumber}>
                    <TableCell className="font-medium">{route.routeNumber}</TableCell>
                    <TableCell>{route.start}</TableCell>
                    <TableCell>{route.end}</TableCell>
                    <TableCell>{route.timings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
