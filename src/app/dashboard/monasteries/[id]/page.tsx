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
import { Camera, Info, Compass, Music, MessageSquare } from 'lucide-react';
import SmartAudioGuide from './_components/smart-audio-guide';
import ContributeInfo from './_components/contribute-info';
import LocalServices from './_components/local-services';
import { Button } from '@/components/ui/button';

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
                <CardTitle className="flex items-center gap-2">
                    <Camera/>
                    Virtual Tour
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full">
                    <Image
                        src={monastery.image}
                        alt={`360 view of ${monastery.name}`}
                        data-ai-hint="monastery interior"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                        <Button size="lg" variant="secondary" disabled>View 360° Tour</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Info/>
                    About the Monastery
                </CardTitle>
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
                <CardTitle className="flex items-center gap-2">
                    <Compass/>
                    Plan Your Visit
                </CardTitle>
                <CardDescription>Book local taxis and find guides.</CardDescription>
            </CardHeader>
            <CardContent>
                <LocalServices />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Music />
                    Smart Audio Guide
                </CardTitle>
                <CardDescription>Listen to narrated walkthroughs.</CardDescription>
            </CardHeader>
            <CardContent>
                <SmartAudioGuide monasteryName={monastery.name} guideText={`${monastery.description} ${monastery.history}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare />
                    Share Your Experience
                </CardTitle>
                <CardDescription>Help us improve our information.</CardDescription>
            </CardHeader>
            <CardContent>
                <ContributeInfo monasteryName={monastery.name} existingInformation={`${monastery.description} ${monastery.history}`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
