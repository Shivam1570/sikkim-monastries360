'use server';

/**
 * @fileOverview A flow for generating audio from text.
 *
 * - textToSpeech - A function that converts text to speech.
 * - TextToSpeechInput - The input type for the textToSpeech function.
 * - TextToSpeechOutput - The return type for the textToSpeech function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  monasteryName: z.string().describe('The name of the monastery for context.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audio: z.string().describe('The base64 encoded WAV audio data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;


async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
    return new Promise((resolve, reject) => {
      const writer = new wav.Writer({
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
  
      const bufs: Buffer[] = [];
      writer.on('error', reject);
      writer.on('data', (d) => bufs.push(d));
      writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
  
      writer.write(pcmData);
      writer.end();
    });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async (input) => {
    const speechPrompt = `You are a serene and knowledgeable tour guide for the ${input.monasteryName}. Narrate the following text in a calm and respectful voice: "${input.text}"`;
    
    const { media } = await ai.generate({
        model: googleAI('text-to-speech-2-flash'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: speechPrompt,
      });

    if (!media) {
      throw new Error('No audio was generated.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavData = await toWav(audioBuffer);
    
    return {
      audio: 'data:audio/wav;base64,' + wavData,
    };
  }
);


export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}
