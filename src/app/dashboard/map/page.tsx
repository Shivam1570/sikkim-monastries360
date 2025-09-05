'use client';

import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monasteries, type Monastery } from '@/lib/data';
import Link from 'next/link';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);

  if (!API_KEY) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="max-w-md">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Interactive Map Unavailable</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    To view the interactive map, you need to provide a Google Maps API key.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                    Please set the <code className="font-mono bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable in your project.
                </p>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] w-full">
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Interactive Map
        </h1>
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat: 27.5, lng: 88.5 }}
          defaultZoom={9}
          mapId="sikkim_sanctuaries_map"
          className="rounded-lg shadow-md"
        >
          {monasteries.map((monastery) => (
            <AdvancedMarker
              key={monastery.id}
              position={monastery.location}
              onClick={() => setSelectedMonastery(monastery)}
            >
              <Pin />
            </AdvancedMarker>
          ))}
          {selectedMonastery && (
            <InfoWindow
                position={selectedMonastery.location}
                onCloseClick={() => setSelectedMonastery(null)}
            >
                <div className="p-2">
                    <h3 className="font-headline text-lg">{selectedMonastery.name}</h3>
                    <p className="text-sm">{selectedMonastery.district}</p>
                    <Link href={`/dashboard/monasteries/${selectedMonastery.id}`} className="text-sm text-primary hover:underline mt-2 inline-block">
                        Learn more
                    </Link>
                </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
