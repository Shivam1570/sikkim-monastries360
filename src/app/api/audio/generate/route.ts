'use server';

import { textToSpeech } from '@/ai/flows/text-to-speech';
import { z } from 'zod';

const audioSchema = z.object({
  text: z.string(),
  monasteryName: z.string(),
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = audioSchema.safeParse(body);

    if (!validatedFields.success) {
      return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
    }

    const result = await textToSpeech(validatedFields.data);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred while generating audio.' }), { status: 500 });
  }
}
