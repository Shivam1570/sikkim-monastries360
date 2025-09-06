'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ArtifactState {
  description?: string;
  categories?: string[];
  summary?: string;
  error?: string;
}

export default function ArtifactsPage() {
  const [state, setState] = useState<ArtifactState | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setState(null);
    const formData = new FormData(event.currentTarget);
    const documentText = formData.get('documentText');

    try {
      const response = await fetch('/api/artifacts/describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText }),
      });
      const result = await response.json();
      if (!response.ok) {
        setState({ error: result.error || 'An unexpected error occurred.' });
      } else {
        setState(result);
      }
    } catch (error) {
        setState({ error: 'Failed to connect to the server.' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          AI-Powered Artifact Description
        </h1>
        <p className="text-muted-foreground mt-2">
          Paste the text from a scanned manuscript to generate a description, categories, and summary.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Submit Document Text</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                name="documentText"
                placeholder="Paste the full text of the scanned document here..."
                className="min-h-[200px]"
                required
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Describe Artifact
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Analysis</CardTitle>
            <CardDescription>
              The AI's analysis will appear below once submitted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : state?.error ? (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {state.error}
                    </AlertDescription>
                </Alert>
            ) : state ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">Summary</h3>
                  <p className="text-muted-foreground">{state.summary}</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{state.description}</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {state.categories?.map(category => (
                            <Badge key={category} variant="secondary">{category}</Badge>
                        ))}
                    </div>
                </div>
              </div>
            ) : (
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Awaiting Input</AlertTitle>
                    <AlertDescription>
                        Submit document text to see the generated analysis.
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
