'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import { monasteries } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function MapPage() {
  const [selectedMonasteryId, setSelectedMonasteryId] = useState<string | null>(null);
  const selectedMonastery = monasteries.find(m => m.id === selectedMonasteryId);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                    Interactive Map
                </h1>
                <p className="text-muted-foreground mt-2">
                    Explore the locations of monasteries across Sikkim.
                </p>
            </div>
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Configuration Error</AlertTitle>
                <AlertDescription>
                    Google Maps API key is missing. Please add it to your .env.local file to display the map.
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-120px)]">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Interactive Map
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore the locations of monasteries across Sikkim. Click a marker for
          more details.
        </p>
      </div>
      <div className="flex-grow rounded-lg overflow-hidden">
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={{ lat: 27.5330, lng: 88.5122 }} // Centered on Sikkim
                defaultZoom={9}
                mapId="sikkim-monasteries-map"
                gestureHandling={'greedy'}
            >
                {monasteries.map((monastery) => (
                    <AdvancedMarker
                        key={monastery.id}
                        position={monastery.location}
                        onClick={() => setSelectedMonasteryId(monastery.id)}
                    >
                        <Pin />
                    </AdvancedMarker>
                ))}

                {selectedMonastery && (
                    <InfoWindow
                        position={selectedMonastery.location}
                        onCloseClick={() => setSelectedMonasteryId(null)}
                    >
                        <Card className="border-none shadow-none max-w-sm">
                            <CardHeader>
                                <CardTitle>{selectedMonastery.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 px-6">
                                <p className="text-sm line-clamp-2">{selectedMonastery.description}</p>
                                <Button asChild className="mt-4 w-full">
                                    <Link href={`/dashboard/monasteries/${selectedMonastery.id}`}>
                                        Explore
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
      </div>
    </div>
  );
}
