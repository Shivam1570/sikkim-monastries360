'use server';

import { augmentMonasteryInformation } from '@/ai/flows/augment-monastery-information';
import { z } from 'zod';

const augmentSchema = z.object({
    monasteryName: z.string(),
    existingInformation: z.string(),
    crowdSourcedInformation: z.string().min(10, { message: 'Contribution must be at least 10 characters.' }),
});


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = augmentSchema.safeParse(body);

    if (!validatedFields.success) {
        return new Response(JSON.stringify({ message: 'Validation failed: ' + validatedFields.error.flatten().fieldErrors.crowdSourcedInformation?.[0] }), { status: 400 });
    }

    const result = await augmentMonasteryInformation(validatedFields.data);
    
    // In a real app, you would save this to a database and revalidate the page.
    // For now, we just return a success message.
    console.log("Augmented Information:", result.augmentedInformation);
    
    return new Response(JSON.stringify({ message: 'Thank you for your contribution! The information has been submitted for review.' }), { status: 200 });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: 'An error occurred while processing your submission.' }), { status: 500 });
  }
}
