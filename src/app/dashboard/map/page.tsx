'use client';

import Image from 'next/image';

export default function MapPage() {
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
      <div className="relative aspect-video w-full flex-grow rounded-lg overflow-hidden bg-muted flex flex-col items-center justify-center">
        <Image
          src="https://picsum.photos/seed/map/1200/800"
          alt="Placeholder map of Sikkim"
          data-ai-hint="roadmap illustration"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center p-4">
          <h2 className="text-xl font-semibold">Interactive Map Coming Soon</h2>
          <p className="text-muted-foreground mt-2">
            This feature requires a Google Maps API key to display the interactive map of monastery locations.
          </p>
        </div>
      </div>
    </div>
  );
}
