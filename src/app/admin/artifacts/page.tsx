'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function ArtifactsPage() {

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
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Feature Not Available</AlertTitle>
              <AlertDescription>
                This AI feature is disabled for statically exported sites.
              </AlertDescription>
            </Alert>
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
                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Awaiting Input</AlertTitle>
                    <AlertDescription>
                        Submit document text to see the generated analysis.
                    </AlertDescription>
                </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
