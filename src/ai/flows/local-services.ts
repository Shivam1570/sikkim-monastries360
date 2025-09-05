'use server';

/**
 * @fileOverview An AI agent that finds local transport and tourism services.
 *
 * - getLocalServices - A function that finds local services.
 * - GetLocalServicesInput - The input type for the getLocalServices function.
 * - GetLocalServicesOutput - The return type for the getLocalServices function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Mock database of local services
const localServicesDB = {
  'rumtek-monastery': {
    taxis: [
      { name: 'Gangtok Taxi Service', phone: '+91-9876543210' },
      { name: 'Sikkim Wheels', phone: '+91-9876543211' },
    ],
    guides: [
      { name: 'Himalayan Guide Association', rating: 4.8 },
      { name: 'Sikkim Eco-Tours', rating: 4.5 },
    ],
  },
  'pemayangtse-monastery': {
    taxis: [
      { name: 'Pelling Taxi Stand', phone: '+91-8765432109' },
      { name: 'Kanchenjunga Rides', phone: '+91-8765432108' },
    ],
    guides: [
        { name: 'West Sikkim Treks & Tours', rating: 4.9 },
        { name: 'Pelling Adventures', rating: 4.7 },
    ],
  },
  default: {
    taxis: [{ name: 'Local Taxi Union', phone: '+91-7654321098' }],
    guides: [{ name: 'Regional Tour Guides', rating: 4.2 }],
  },
};

const findTransportTool = ai.defineTool(
  {
    name: 'findTransport',
    description: 'Finds local transport options like taxis near a specific monastery.',
    inputSchema: z.object({
      monasteryId: z.string().describe('The ID of the monastery.'),
    }),
    outputSchema: z.array(z.object({ name: z.string(), phone: z.string() })),
  },
  async ({ monasteryId }) => {
    return (localServicesDB[monasteryId as keyof typeof localServicesDB] || localServicesDB.default).taxis;
  }
);

const findTourGuidesTool = ai.defineTool(
  {
    name: 'findTourGuides',
    description: 'Finds local tour guides and tourism services for a given monastery.',
    inputSchema: z.object({
        monasteryId: z.string().describe('The ID of the monastery.'),
    }),
    outputSchema: z.array(z.object({ name: z.string(), rating: z.number() })),
  },
  async ({ monasteryId }) => {
    return (localServicesDB[monasteryId as keyof typeof localServicesDB] || localServicesDB.default).guides;
  }
);


export const GetLocalServicesInputSchema = z.object({
  monasteryId: z.string().describe('The unique identifier for the monastery.'),
  monasteryName: z.string().describe('The name of the monastery.'),
});
export type GetLocalServicesInput = z.infer<typeof GetLocalServicesInputSchema>;

export const GetLocalServicesOutputSchema = z.object({
  recommendations: z.string().describe('A helpful, conversational summary of recommendations for the visitor.'),
});
export type GetLocalServicesOutput = z.infer<typeof GetLocalServicesOutputSchema>;


export async function getLocalServices(input: GetLocalServicesInput): Promise<GetLocalServicesOutput> {
  return getLocalServicesFlow(input);
}


const getLocalServicesPrompt = ai.definePrompt({
    name: 'getLocalServicesPrompt',
    input: { schema: GetLocalServicesInputSchema },
    output: { schema: GetLocalServicesOutputSchema },
    tools: [findTransportTool, findTourGuidesTool],
    prompt: `You are a helpful travel assistant for the Sikkim Sanctuaries app.

    A user is looking for local transport and tourism services near {{monasteryName}}.

    Use the available tools to find transport and tour guides. Then, provide a short, friendly, and helpful summary of the options. Be conversational and recommend that the user contact the services directly for the latest information.
    
    Do not just list the data. Present it in a natural, paragraph-based format.
    `,
});


const getLocalServicesFlow = ai.defineFlow(
  {
    name: 'getLocalServicesFlow',
    inputSchema: GetLocalServicesInputSchema,
    outputSchema: GetLocalServicesOutputSchema,
  },
  async (input) => {
    const { output } = await getLocalServicesPrompt(input);
    return output!;
  }
);
