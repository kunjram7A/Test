'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BedDouble,
  UtensilsCrossed,
  ShoppingCart,
  BookMarked,
  Bus,
  Phone,
  GraduationCap,
  Shield,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, protected: false },
  { href: '/accommodations', label: 'Accommodations', icon: BedDouble, protected: false },
  { href: '/food', label: 'Food & Tiffin', icon: UtensilsCrossed, protected: false },
  { href: '/shops', label: 'Shops', icon: ShoppingCart, protected: false },
  { href: '/faq', label: 'University FAQ', icon: BookMarked, protected: false },
  { href: '/transport', label: 'Transport', icon: Bus, protected: false },
  { href: '/helpline', label: 'Helpline', icon: Phone, protected: false },
  { href: '/admin', label: 'Admin', icon: Shield, protected: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Hide sidebar on login page
  if (pathname === '/login') {
    return null;
  }
  
  const visibleNavItems = navItems.filter(item => {
    if (!item.protected) return true;
    return !loading && !!user;
  });

  return (
    <Sidebar className="bg-sidebar text-sidebar-foreground">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-headline font-semibold text-sidebar-foreground">
            KickstartU
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {visibleNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
           {!loading && !user && (
             <SidebarMenuItem>
                <Link href="/login" legacyBehavior passHref>
                    <SidebarMenuButton
                    isActive={pathname === '/login'}
                    tooltip="Admin Login"
                    className="justify-start"
                    >
                    <LogIn className="h-5 w-5" />
                    <span>Admin Login</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
           )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-sidebar-foreground/50 p-4 text-center">
            &copy; 2024 KickstartU
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
