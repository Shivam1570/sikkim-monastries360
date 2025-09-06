'use client';

import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, PlayCircle, Info, PauseCircle, Loader2, Compass } from 'lucide-react';

export default function MonasteryPage({ params }: { params: { id: string } }) {
  const monastery = monasteries.find((m) => m.id === params.id);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [localServices, setLocalServices] = useState({ loading: false, recommendations: '' });
  const [audioState, setAudioState] = useState({
    playing: false,
    loadingTrack: null as string | null,
    currentTrack: null as string | null,
    audioSrc: '',
  });

  const [formPending, setFormPending] = useState(false);

  if (!monastery) {
    notFound();
  }
  
  const handleFetchLocalServices = async () => {
    setLocalServices({ loading: true, recommendations: '' });
    try {
      const response = await fetch('/api/services/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monasteryId: monastery.id, monasteryName: monastery.name })
      });
      const result = await response.json();
      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Failed to fetch local services." });
        setLocalServices({ loading: false, recommendations: '' });
      } else {
        setLocalServices({ loading: false, recommendations: result.recommendations });
      }
    } catch (error) {
        console.error(error);
        toast({ title: "Error", description: "Failed to connect to the server." });
        setLocalServices({ loading: false, recommendations: '' });
    }
  };

  const handleAugmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormPending(true);
    const formData = new FormData(event.currentTarget);
    
    const data = {
        monasteryName: formData.get('monasteryName'),
        existingInformation: formData.get('existingInformation'),
        crowdSourcedInformation: formData.get('crowdSourcedInformation'),
    };

    try {
        const response = await fetch('/api/monasteries/augment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        toast({
            title: 'Information Processed',
            description: result.message,
        });
        if(response.ok) {
            (event.target as HTMLFormElement).reset();
        }
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to submit information.',
        });
    } finally {
        setFormPending(false);
    }
  };


  const audioTracks = [
    '1. Introduction to the Monastery',
    '2. The Main Prayer Hall',
    '3. Significance of the Murals',
    '4. The Story of the Founder',
  ];

  const handlePlayPause = async (track: string) => {
    const isPlaying = audioState.playing;
    const currentTrack = audioState.currentTrack;

    if (currentTrack === track && isPlaying) {
      audioRef.current?.pause();
      setAudioState(prev => ({ ...prev, playing: false }));
    } else if (currentTrack === track && !isPlaying) {
      audioRef.current?.play();
      setAudioState(prev => ({ ...prev, playing: true }));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioState(prev => ({...prev, loadingTrack: track, playing: false, audioSrc: ''}));
      try {
        const response = await fetch('/api/audio/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: track, monasteryName: monastery.name })
        });
        const result = await response.json();
        if (!response.ok) {
            toast({ title: "Error", description: result.error || "Failed to generate audio." });
            setAudioState(prev => ({ ...prev, loadingTrack: null, playing: false }));
        } else {
            setAudioState({ loadingTrack: null, currentTrack: track, audioSrc: result.audio, playing: true });
        }
      } catch (error) {
          console.error(error);
          toast({ title: "Error", description: "Failed to connect to the server." });
          setAudioState(prev => ({ ...prev, loadingTrack: null, playing: false }));
      }
    }
  };

  useEffect(() => {
    if (audioState.audioSrc && audioRef.current) {
      audioRef.current.src = audioState.audioSrc;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [audioState.audioSrc]);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => setAudioState(prev => ({...prev, playing: false, currentTrack: null}));
    audioElement?.addEventListener('ended', handleEnded);
    return () => audioElement?.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <div className="space-y-8">
      <audio ref={audioRef} />
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
                    {localServices.recommendations ? (
                        <p className="text-sm text-muted-foreground">{localServices.recommendations}</p>
                    ) : (
                        <Button className="w-full" onClick={handleFetchLocalServices} disabled={localServices.loading}>
                            {localServices.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Find Local Services
                        </Button>
                    )}
                </CardContent>
            </Card>

          <Card>
            <CardHeader>
                <CardTitle>Smart Audio Guide</CardTitle>
                <CardDescription>Listen to narrated walkthroughs.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {audioTracks.map((track, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handlePlayPause(track)} disabled={audioState.loadingTrack !== null && audioState.loadingTrack !== track}>
                                {audioState.loadingTrack === track ? <Loader2 className="h-5 w-5 animate-spin"/> : (audioState.playing && audioState.currentTrack === track) ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
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
                <CardTitle>Contribute Information</CardTitle>
                <CardDescription>Share your knowledge to enrich our records.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAugmentSubmit} className="space-y-4">
                <input type="hidden" name="monasteryName" value={monastery.name} />
                <input type="hidden" name="existingInformation" value={`${monastery.description} ${monastery.history}`} />
                <div>
                  <Label htmlFor="crowdSourcedInformation">Your Information</Label>
                  <Textarea id="crowdSourcedInformation" name="crowdSourcedInformation" placeholder="Add facts, stories, or corrections..." required />
                </div>
                <Button type="submit" disabled={formPending}>
                    {formPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Information
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
