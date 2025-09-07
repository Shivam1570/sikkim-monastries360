'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { monasteries, Monastery } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const SIKKIM_CENTER = { lat: 27.533, lng: 88.5122 };

export default function MapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(
    null
  );

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
          <div className="aspect-video w-full">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <Map
                defaultCenter={SIKKIM_CENTER}
                defaultZoom={9}
                mapId="sikkim_monasteries_map"
                gestureHandling={'greedy'}
                disableDefaultUI={true}
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
                      <h3 className="font-bold text-base">
                        {selectedMonastery.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedMonastery.district}
                      </p>
                      <Link
                        href={`/dashboard/monasteries/${selectedMonastery.id}`}
                        className="text-primary text-sm font-semibold hover:underline mt-2 inline-block"
                      >
                        Learn More
                      </Link>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
          </div>
          {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
            <div className="text-center text-destructive mt-4">
              <p>
                <b>Warning:</b> Google Maps API key is not configured.
              </p>
              <p className="text-sm">
                Please add your key to a `.env.local` file to enable the map.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
