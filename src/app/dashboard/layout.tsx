'use client'

import Link from 'next/link'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DharmaWheel } from '@/components/icons'
import { Home, Map, Calendar, ArrowLeft, UserCircle, Building } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { monasteries } from '@/lib/data';

function Header({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      {...props}
    >
      <SidebarTrigger className="sm:hidden" />
      <div className="ml-auto">
        <Button variant="outline" size="icon" asChild>
            <Link href="/">
                <Home className="h-4 w-4" />
            </Link>
        </Button>
      </div>
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname.startsWith(path)) return true;
        return false;
    }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <DharmaWheel className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Sikkim Sanctuaries</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard')}>
                <Link href="/dashboard">
                  <Home />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/map')}>
                <Link href="/dashboard/map">
                  <Map />
                  Interactive Map
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/calendar')}>
                <Link href="/dashboard/calendar">
                  <Calendar />
                  Event Calendar
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Monasteries</SidebarGroupLabel>
            <SidebarMenu>
              {monasteries.slice(0, 3).map((monastery) => (
                <SidebarMenuItem key={monastery.id}>
                  <SidebarMenuButton asChild isActive={isActive(`/dashboard/monasteries/${monastery.id}`)}>
                    <Link href={`/dashboard/monasteries/${monastery.id}`}>
                      <Building />
                      {monastery.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/admin">
                            <UserCircle />
                            Admin Panel
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft />
                            Back to Home
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
