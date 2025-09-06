'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';

interface ArtifactState {
  description?: string;
  categories?: string[];
  summary?: string;
  error?: string;
}

export default function ArtifactsPage() {
  const [state, setState] = useState<ArtifactState>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setState({}); // Reset state on new submission

    const formData = new FormData(event.currentTarget);
    const documentText = formData.get('documentText') as string;

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
      console.error(error);
      setState({ error: 'Failed to connect to the server.' });
    } finally {
      setPending(false);
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
              <div className="space-y-2">
                <Label htmlFor="documentText">Scanned Text</Label>
                <Textarea
                  id="documentText"
                  name="documentText"
                  placeholder="Paste the full text of the document here..."
                  className="min-h-[300px]"
                  required
                />
              </div>
              {state.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
              <Button type="submit" disabled={pending}>
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
            {state.description || state.summary || state.categories?.length ? (
              <>
                <div>
                  <h3 className="font-bold text-lg mb-2">Summary</h3>
                  <p className="text-muted-foreground">{state.summary}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{state.description}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {state.categories?.map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
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
