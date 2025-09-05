'use server';

import { z } from 'zod';
import { describeArtifact } from '@/ai/flows/artifact-description';
import { augmentMonasteryInformation } from '@/ai/flows/augment-monastery-information';
import { textToSpeech } from '@/ai/flows/text-to-speech';

const artifactSchema = z.object({
  documentText: z.string().min(10, { message: 'Document text must be at least 10 characters.' }),
});

type ArtifactState = {
  description?: string;
  categories?: string[];
  summary?: string;
  error?: string;
};

export async function describeArtifactAction(
  prevState: ArtifactState,
  formData: FormData
): Promise<ArtifactState> {
  try {
    const validatedFields = artifactSchema.safeParse({
      documentText: formData.get('documentText'),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.documentText?.[0],
      };
    }

    const result = await describeArtifact(validatedFields.data);

    return {
      description: result.description,
      categories: result.categories,
      summary: result.summary,
    };
  } catch (e) {
    console.error(e);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

const augmentSchema = z.object({
    monasteryName: z.string(),
    existingInformation: z.string(),
    crowdSourcedInformation: z.string().min(10, { message: 'Contribution must be at least 10 characters.' }),
});

type AugmentState = {
  message: string;
}

export async function augmentMonasteryInfoAction(
  prevState: AugmentState,
  formData: FormData
): Promise<AugmentState> {
  try {
    const validatedFields = augmentSchema.safeParse({
      monasteryName: formData.get('monasteryName'),
      existingInformation: formData.get('existingInformation'),
      crowdSourcedInformation: formData.get('crowdSourcedInformation'),
    });

    if (!validatedFields.success) {
        return { message: 'Validation failed: ' + validatedFields.error.flatten().fieldErrors.crowdSourcedInformation?.[0] };
    }

    const result = await augmentMonasteryInformation(validatedFields.data);
    
    // In a real app, you would save this to a database and revalidate the page.
    // For now, we just return a success message.
    console.log("Augmented Information:", result.augmentedInformation);
    
    return { message: 'Thank you for your contribution! The information has been submitted for review.' };

  } catch (e) {
    console.error(e);
    return { message: 'An error occurred while processing your submission.' };
  }
}

const audioSchema = z.object({
  text: z.string(),
  monasteryName: z.string(),
});

type AudioState = {
  audio?: string;
  error?: string;
}

export async function generateAudioAction(
  input: z.infer<typeof audioSchema>
): Promise<AudioState> {
  try {
    const validatedFields = audioSchema.safeParse(input);

    if (!validatedFields.success) {
      return {
        error: 'Invalid input.',
      };
    }

    const result = await textToSpeech(validatedFields.data);

    return {
      audio: result.audio,
    };
  } catch (e) {
    console.error(e);
    return {
      error: 'An unexpected error occurred while generating audio.',
    };
  }
}
