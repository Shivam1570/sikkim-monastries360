'use server';

import { describeArtifact } from '@/ai/flows/artifact-description';
import { z } from 'zod';

const artifactSchema = z.object({
  documentText: z.string().min(10, { message: 'Document text must be at least 10 characters.' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = artifactSchema.safeParse(body);

    if (!validatedFields.success) {
      return new Response(JSON.stringify({ error: validatedFields.error.flatten().fieldErrors.documentText?.[0] }), { status: 400 });
    }

    const result = await describeArtifact(validatedFields.data);
    return new Response(JSON.stringify(result), { status: 200 });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }), { status: 500 });
  }
}
