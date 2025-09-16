// 'use server';

// /**
//  * @fileOverview An AI agent that finds local services like taxis and guides.
//  *
//  * - getLocalServices - A function that returns a list of local services.
//  * - GetLocalServicesInput - The input type for the getLocalServices function.
//  * - GetLocalServicesOutput - The return type for the getLocalServices function.
//  */

// import {ai} from '@/ai/genkit';
// import {z} from 'genkit';

// const GetLocalServicesInputSchema = z.object({
//   monasteryId: z.string().describe('The ID of the monastery.'),
//   monasteryName: z.string().describe('The name of the monastery.'),
// });
// export type GetLocalServicesInput = z.infer<
//   typeof GetLocalServicesInputSchema
// >;

// const ServiceSchema = z.object({
//     name: z.string().describe('The name of the service provider.'),
//     type: z.enum(['taxi', 'guide', 'hotel']).describe('The type of service.'),
//     contact: z.string().describe('The contact information for the service.'),
//     url: z.string().optional().describe('The website URL for the service.'),
// });


// const GetLocalServicesOutputSchema = z.object({
//   services: z.array(ServiceSchema).describe('A list of local services.'),
// });
// export type GetLocalServicesOutput = z.infer<
//   typeof GetLocalServicesOutputSchema
// >;

// const getLocalServicesFlow = ai.defineFlow(
//     {
//       name: 'getLocalServicesFlow',
//       inputSchema: GetLocalServicesInputSchema,
//       outputSchema: GetLocalServicesOutputSchema,
//     },
//     async (input) => {
//         const getLocalServicesPrompt = ai.definePrompt({
//             name: 'getLocalServicesPrompt',
//             input: { schema: GetLocalServicesInputSchema },
//             output: { schema: GetLocalServicesOutputSchema },
//             prompt: `You are a local expert for Sikkim. Find relevant local services such as taxis, guides, and hotels for a visitor going to {{{monasteryName}}}. Provide a list of at least two reliable options for each service type if possible.`,
//         });
//       const {output} = await getLocalServicesPrompt(input);
//       return output!;
//     }
//   );


// export async function getLocalServices(
//   input: GetLocalServicesInput
// ): Promise<GetLocalServicesOutput> {
//   return getLocalServicesFlow(input);
// }
