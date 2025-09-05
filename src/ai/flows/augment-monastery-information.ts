'use server';

/**
 * @fileOverview A flow that augments monastery information with crowd-sourced data.
 *
 * - augmentMonasteryInformation - A function that handles the augmentation process.
 * - AugmentMonasteryInformationInput - The input type for the augmentMonasteryInformation function.
 * - AugmentMonasteryInformationOutput - The return type for the augmentMonasteryInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AugmentMonasteryInformationInputSchema = z.object({
  monasteryName: z.string().describe('The name of the monastery.'),
  existingInformation: z.string().describe('The existing information about the monastery.'),
  crowdSourcedInformation: z.string().describe('Crowd-sourced information about the monastery.'),
});
export type AugmentMonasteryInformationInput = z.infer<
  typeof AugmentMonasteryInformationInputSchema
>;

const AugmentMonasteryInformationOutputSchema = z.object({
  augmentedInformation: z
    .string()
    .describe('The augmented information about the monastery.'),
});
export type AugmentMonasteryInformationOutput = z.infer<
  typeof AugmentMonasteryInformationOutputSchema
>;

export async function augmentMonasteryInformation(
  input: AugmentMonasteryInformationInput
): Promise<AugmentMonasteryInformationOutput> {
  return augmentMonasteryInformationFlow(input);
}

const augmentMonasteryInformationPrompt = ai.definePrompt({
  name: 'augmentMonasteryInformationPrompt',
  input: {schema: AugmentMonasteryInformationInputSchema},
  output: {schema: AugmentMonasteryInformationOutputSchema},
  prompt: `You are an expert in Sikkimese monasteries. You will be provided with existing information about a monastery, as well as crowd-sourced information. You will synthesize these two sources of information into a single, comprehensive description of the monastery.

Monastery Name: {{{monasteryName}}}
Existing Information: {{{existingInformation}}}
Crowd-Sourced Information: {{{crowdSourcedInformation}}}`,
});

const augmentMonasteryInformationFlow = ai.defineFlow(
  {
    name: 'augmentMonasteryInformationFlow',
    inputSchema: AugmentMonasteryInformationInputSchema,
    outputSchema: AugmentMonasteryInformationOutputSchema,
  },
  async input => {
    const {output} = await augmentMonasteryInformationPrompt(input);
    return output!;
  }
);
