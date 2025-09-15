'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MapPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Interactive Map
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore the locations of monasteries across Sikkim. Click a marker for
          more details.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Map of Sikkim</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="relative aspect-video w-full">
            <Image
                src="https://picsum.photos/seed/map/1200/800"
                alt="Map of Sikkim showing monastery locations"
                data-ai-hint="map Sikkim"
                fill
                className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                <Button size="lg" variant="secondary" disabled>Interactive Map Coming Soon</Button>
            </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
