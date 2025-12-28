
'use server';

/**
 * @fileOverview A flow to extract a random topic from a document.
 *
 * - extractRandomTopic - Extracts a single, specific topic from a PDF.
 * - ExtractRandomTopicInput - The input type.
 * - ExtractRandomTopicOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractRandomTopicInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractRandomTopicInput = z.infer<typeof ExtractRandomTopicInputSchema>;

const ExtractRandomTopicOutputSchema = z.object({
  topic: z.string().describe('A single, specific, and important topic or concept from the document.'),
});
export type ExtractRandomTopicOutput = z.infer<typeof ExtractRandomTopicOutputSchema>;

export async function extractRandomTopic(input: ExtractRandomTopicInput): Promise<ExtractRandomTopicOutput> {
  return extractRandomTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractRandomTopicPrompt',
  input: {schema: ExtractRandomTopicInputSchema},
  output: {schema: ExtractRandomTopicOutputSchema},
  prompt: `You are an AI assistant that helps students study.

  Extract a single, specific, and important topic or concept from the provided document.
  The topic should be suitable for a student to explain as part of the Feynman technique.

  Provide only the name of the topic. For example: "Polymorphism" or "The Krebs Cycle".

  PDF Document: {{media url=pdfDataUri}}`,
});

const extractRandomTopicFlow = ai.defineFlow(
  {
    name: 'extractRandomTopicFlow',
    inputSchema: ExtractRandomTopicInputSchema,
    outputSchema: ExtractRandomTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
