'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { describeArtifactAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Describe Artifact
    </Button>
  );
}

export default function ArtifactsPage() {
  const initialState = {
    description: '',
    categories: [],
    summary: '',
    error: '',
  };
  const [state, formAction] = useFormState(describeArtifactAction, initialState);

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
            <form action={formAction} className="space-y-4">
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
              <SubmitButton />
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
            {state.description || state.summary || state.categories ? (
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
