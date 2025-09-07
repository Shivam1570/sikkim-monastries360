'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Play, Pause, Download, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SmartAudioGuideProps {
  monasteryName: string;
  guideText: string;
}

export default function SmartAudioGuide({ monasteryName, guideText }: SmartAudioGuideProps) {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const handleGenerateAudio = async () => {
    setLoading(true);
    setAudioUrl(null);
    setIsPlaying(false);
    try {
      const response = await fetch('/api/audio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: guideText, monasteryName }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate audio.');
      }
      setAudioUrl(data.audio);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-4">
      {!audioUrl && (
        <Button onClick={handleGenerateAudio} disabled={loading} className="w-full">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Audio Guide
        </Button>
      )}

      {audioUrl && (
        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button onClick={togglePlayback} className="flex-1">
              {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="outline" size="icon" asChild>
                <a href={audioUrl} download={`${monasteryName.replace(/\s+/g, '_')}_guide.wav`}>
                    <Download />
                </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
