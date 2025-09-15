'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContributeInfoProps {
  monasteryName: string;
  existingInformation: string;
}

export default function ContributeInfo({ monasteryName, existingInformation }: ContributeInfoProps) {
  const [contribution, setContribution] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ message: string; error?: boolean } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (contribution.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Contribution too short',
        description: 'Please provide at least 10 characters.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/monasteries/augment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monasteryName,
          existingInformation,
          crowdSourcedInformation: contribution,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred.');
      }
      setResult({ message: data.message });
      setContribution(''); // Clear textarea on success
    } catch (error: any) {
      setResult({ message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder={`Share what you know about ${monasteryName}...`}
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          className="min-h-[100px]"
          disabled={loading}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Contribution
        </Button>
      </form>
      {result && (
        <Alert variant={result.error ? 'destructive' : 'default'}>
          {result.error ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          <AlertTitle>{result.error ? 'Error' : 'Success'}</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
