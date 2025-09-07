'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LocalServicesProps {
  monasteryId: string;
  monasteryName: string;
}

export default function LocalServices({ monasteryId, monasteryName }: LocalServicesProps) {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="space-y-4">
      <Button onClick={fetchServices} disabled={loading} className="w-full">
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Find Local Services
      </Button>

      {error && (
        <Alert variant="destructive">
          <ServerCrash className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {recommendations && (
        <div className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-lg">
          <p className="whitespace-pre-wrap">{recommendations}</p>
        </div>
      )}
    </div>
  );
}
