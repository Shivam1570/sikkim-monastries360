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
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { DharmaWheel } from '@/components/icons'
import { LayoutDashboard, FileText, CalendarPlus, ArrowLeft, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/admin' && pathname === '/admin') return true;
        if (path !== '/admin' && pathname.startsWith(path)) return true;
        return false;
    }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <DharmaWheel className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">Admin Panel</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin')}>
                <Link href="/admin">
                  <LayoutDashboard />
                  Admin Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/artifacts')}>
                <Link href="/admin/artifacts">
                  <FileText />
                  Describe Artifact
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/admin/events')}>
                <Link href="/admin/events">
                  <CalendarPlus />
                  Add Event
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild variant="outline">
                        <Link href="/dashboard">
                            <ArrowLeft />
                            Back to App
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
