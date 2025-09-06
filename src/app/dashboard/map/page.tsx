'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MapPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Interactive Map
        </h1>
        <p className="text-muted-foreground mt-2">
          A map showing the locations of monasteries across Sikkim.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Map of Sikkim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full">
            <Image
              src="https://picsum.photos/1200/800"
              alt="A map of Sikkim showing monastery locations"
              data-ai-hint="Sikkim map"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="text-center text-muted-foreground mt-4">
            <p>This is a placeholder for the interactive map.</p>
            <p className="text-sm">To enable the full interactive experience, a Google Maps API key is required.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
