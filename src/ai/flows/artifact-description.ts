'use server';

/**
 * @fileOverview An AI agent that provides descriptions and categorizations of scanned manuscripts and historical documents.
 *
 * - describeArtifact - A function that handles the artifact description process.
 * - DescribeArtifactInput - The input type for the describeArtifact function.
 * - DescribeArtifactOutput - The return type for the describeArtifact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DescribeArtifactInputSchema = z.object({
  documentText: z
    .string()
    .describe('The scanned text content of the manuscript or historical document.'),
});
export type DescribeArtifactInput = z.infer<typeof DescribeArtifactInputSchema>;

const DescribeArtifactOutputSchema = z.object({
  description: z.string().describe('A detailed description of the artifact.'),
  categories: z.array(z.string()).describe('A list of categories the artifact belongs to.'),
  summary: z.string().describe('A short summary of the artifact.'),
});
export type DescribeArtifactOutput = z.infer<typeof DescribeArtifactOutputSchema>;

const describeArtifactFlow = ai.defineFlow(
  {
    name: 'describeArtifactFlow',
    inputSchema: DescribeArtifactInputSchema,
    outputSchema: DescribeArtifactOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
      name: 'describeArtifactPrompt',
      input: {schema: DescribeArtifactInputSchema},
      output: {schema: DescribeArtifactOutputSchema},
      prompt: `You are an expert in analyzing historical documents and manuscripts from Sikkimese monasteries.
    
      Given the text content of a scanned document, provide a detailed description, categorize it into relevant categories, and create a short summary.
    
      Text Content: {{{documentText}}}
      `,
    });
    const {output} = await prompt(input);
    return output!;
  }
);


export async function describeArtifact(input: DescribeArtifactInput): Promise<DescribeArtifactOutput> {
  return describeArtifactFlow(input);
}
