'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { monasteries } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Info, Compass } from 'lucide-react';

export function generateStaticParams() {
  return monasteries.map((monastery) => ({
    id: monastery.id,
  }));
}

export default function MonasteryPage({ params }: { params: { id: string } }) {
  const monastery = monasteries.find((m) => m.id === params.id);

  if (!monastery) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">{monastery.name}</h1>
        <p className="text-muted-foreground mt-2 text-lg">Established: {monastery.established} | {monastery.district}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
                <CardTitle><div className="flex items-center gap-2"><Camera/> Virtual Tour</div></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full">
                    <Image
                        src={`${monastery.virtualTourImage}?${monastery.id}`}
                        alt={`360 view of ${monastery.name}`}
                        data-ai-hint="monastery interior"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                        <Button size="lg" variant="secondary">View 360° Tour</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle><div className="flex items-center gap-2"><Info/> About the Monastery</div></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                <p>{monastery.description}</p>
                <p>{monastery.history}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle><div className="flex items-center gap-2"><Compass/> Plan Your Visit</div></CardTitle>
                    <CardDescription>Find local transportation and guides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Local services information is not available in the static version of this app.</p>
                </CardContent>
            </Card>

          <Card>
            <CardHeader>
                <CardTitle>Smart Audio Guide</CardTitle>
                <CardDescription>Listen to narrated walkthroughs.</CardDescription>
            </Header>
            <CardContent>
                <p className="text-sm text-muted-foreground">The audio guide is not available in the static version of this app.</p>
                 <Button className="w-full mt-4" disabled>Download for Offline Use</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Contribute Information</CardTitle>
                <CardDescription>Share your knowledge to enrich our records.</CardDescription>
            </Header>
            <CardContent>
              <p className="text-sm text-muted-foreground">Contributions are not available in the static version of this app.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
