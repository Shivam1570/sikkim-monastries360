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
import { Camera, Info, Compass, Music, PlusCircle } from 'lucide-react';
import LocalServices from './_components/local-services';
import SmartAudioGuide from './_components/smart-audio-guide';
import ContributeInfo from './_components/contribute-info';

export function generateStaticParams() {
  return monasteries.map((monastery) => ({
    id: monastery.id,
  }));
}

export default function MonasteryPage({ params }: { params: { id: string } }) {
  const monastery = monasteries.find((m) => m.id === params.id);
  const monasteryIndex = monasteries.findIndex((m) => m.id === params.id);

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
                <div className="flex items-center gap-2">
                    <Camera/>
                    <CardTitle>Virtual Tour</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full">
                    <Image
                        src={`https://picsum.photos/1200/${800 + monasteryIndex}`}
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
                <div className="flex items-center gap-2">
                    <Info/>
                    <CardTitle>About the Monastery</CardTitle>
                </div>
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
                    <div className="flex items-center gap-2">
                        <Compass/>
                        <CardTitle>Plan Your Visit</CardTitle>
                    </div>
                    <CardDescription>Find local transportation and guides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LocalServices monasteryId={monastery.id} monasteryName={monastery.name} />
                </CardContent>
            </Card>

          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Music />
                    <CardTitle>Smart Audio Guide</CardTitle>
                </div>
                <CardDescription>Listen to narrated walkthroughs.</CardDescription>
            </Header>
            <CardContent>
                <SmartAudioGuide monasteryName={monastery.name} guideText={`${monastery.description} ${monastery.history}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <PlusCircle />
                    <CardTitle>Contribute Information</CardTitle>
                </div>
                <CardDescription>Share your knowledge to enrich our records.</CardDescription>
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
