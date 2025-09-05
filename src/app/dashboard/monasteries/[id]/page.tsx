'use client';

import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, PlayCircle, Info } from 'lucide-react';
import { augmentMonasteryInfoAction } from '@/lib/actions';

function SubmitButton() {
  // We can't use useFormStatus here because it's not a descendant of <form>
  // A loading state could be managed with useState if needed.
  return <Button type="submit">Submit Information</Button>;
}

export default function MonasteryPage({ params }: { params: { id: string } }) {
  const monastery = monasteries.find((m) => m.id === params.id);
  const { toast } = useToast();

  const [state, formAction] = useFormState(augmentMonasteryInfoAction, {
    message: '',
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: 'Information Processed',
        description: state.message,
      });
    }
  }, [state, toast]);

  if (!monastery) {
    notFound();
  }

  const audioTracks = [
    '1. Introduction to the Monastery',
    '2. The Main Prayer Hall',
    '3. Significance of the Murals',
    '4. The Story of the Founder',
  ];

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
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Camera/> Virtual Tour</CardTitle>
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
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Info/> About the Monastery</CardTitle>
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
                <CardTitle className="font-headline text-2xl">Smart Audio Guide</CardTitle>
                <CardDescription>Listen to narrated walkthroughs.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {audioTracks.map((track, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <PlayCircle className="h-5 w-5" />
                            </Button>
                            <span className="text-sm flex-1">{track}</span>
                        </li>
                    ))}
                </ul>
                 <Button className="w-full mt-4" disabled>Download for Offline Use</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Contribute Information</CardTitle>
                <CardDescription>Share your knowledge to enrich our records.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="monasteryName" value={monastery.name} />
                <input type="hidden" name="existingInformation" value={`${monastery.description} ${monastery.history}`} />
                <div>
                  <Label htmlFor="crowdSourcedInformation">Your Information</Label>
                  <Textarea id="crowdSourcedInformation" name="crowdSourcedInformation" placeholder="Add facts, stories, or corrections..." required />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
