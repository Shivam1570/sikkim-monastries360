'use server';

import { getLocalServices } from '@/ai/flows/local-services';
import { z } from 'zod';

const localServicesSchema = z.object({
    monasteryId: z.string(),
    monasteryName: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedFields = localServicesSchema.safeParse(body);

        if (!validatedFields.success) {
            return new Response(JSON.stringify({ error: 'Invalid input.' }), { status: 400 });
        }

        const result = await getLocalServices(validatedFields.data);
        return new Response(JSON.stringify(result), { status: 200 });


    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred while fetching local services.' }), { status: 500 });
    }
}
