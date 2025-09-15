'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound, useParams } from 'next/navigation';
import { monasteries } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LocalServicesPage() {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const monasteryId = params.id as string;

  const monastery = monasteries.find((m) => m.id === monasteryId);

  useEffect(() => {
    if (monastery) {
      fetchServices();
    }
  }, [monastery]);

  if (!monastery) {
    return notFound();
  }

  const { name: monasteryName } = monastery;

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    setRecommendations('');
    try {
      const response = await fetch('/api/services/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monasteryId, monasteryName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An unexpected error occurred.');
      }
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/monasteries/${monasteryId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {monasteryName}
          </Link>
        </Button>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mt-4">
          Local Services for {monasteryName}
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered recommendations for transport and guides near the monastery.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>
            Here are some local services you might find useful for your visit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-muted-foreground">Finding local services...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <ServerCrash className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <Button variant="link" onClick={fetchServices} className="p-0 h-auto ml-2">
                    Try again
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {recommendations && (
            <div className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-lg">
              <p className="whitespace-pre-wrap">{recommendations}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
