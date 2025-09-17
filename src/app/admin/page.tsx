import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CalendarPlus } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage curated content for Monastery360.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><FileText /> AI Artifact Description</CardTitle>
            <CardDescription>Generate descriptions and categorizations for scanned manuscripts and historical documents.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/artifacts">Describe Artifact</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><CalendarPlus /> Add Cultural Event</CardTitle>
            <CardDescription>Add new events, festivals, and rituals to the cultural calendar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/events">Add Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
