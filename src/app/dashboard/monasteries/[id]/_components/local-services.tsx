'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';

interface LocalServicesProps {
  monasteryId: string;
  monasteryName: string;
}

export default function LocalServices({ monasteryId, monasteryName }: LocalServicesProps) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchServices = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch('/api/services/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monasteryId, monasteryName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch services.');
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
      {!recommendations && !loading && (
        <Button onClick={handleFetchServices} className="w-full">
          Find Local Services
        </Button>
      )}

      {loading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Finding services...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <div>
          <h4 className="font-semibold mb-2">Recommendations</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{recommendations}</p>
        </div>
      )}
    </div>
  );
}
