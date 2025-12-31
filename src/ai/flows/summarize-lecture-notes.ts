'use server';

/**
 * @fileOverview A flow that summarizes lecture notes from a PDF file.
 *
 * - summarizeLectureNotes - A function that handles the summarization process.
 * - SummarizeLectureNotesInput - The input type for the summarizeLectureNotes function.
 * - SummarizeLectureNotesOutput - The return type for the summarizeLectureNotes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeLectureNotesInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file of lecture notes, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeLectureNotesInput = z.infer<typeof SummarizeLectureNotesInputSchema>;

const SummarizeLectureNotesOutputSchema = z.object({
  summary: z.string().describe('A concise, bullet-point summary of the lecture notes.'),
});
export type SummarizeLectureNotesOutput = z.infer<typeof SummarizeLectureNotesOutputSchema>;

export async function summarizeLectureNotes(input: SummarizeLectureNotesInput): Promise<SummarizeLectureNotesOutput> {
  return summarizeLectureNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLectureNotesPrompt',
  input: { schema: SummarizeLectureNotesInputSchema },
  output: { schema: SummarizeLectureNotesOutputSchema },
  prompt: `You are an AI assistant that specializes in summarizing lecture notes.

  Given a PDF document of lecture notes, create a concise, bullet-point summary of the key concepts.

  Use the following lecture notes to generate the summary:

  {{media url=pdfDataUri}}`,
});

const summarizeLectureNotesFlow = ai.defineFlow(
  {
    name: 'summarizeLectureNotesFlow',
    inputSchema: SummarizeLectureNotesInputSchema,
    outputSchema: SummarizeLectureNotesOutputSchema,
  },
  async input => {
    const maxRetries = 3;
    let attempt = 0;
    while (true) {
      try {
        const { output } = await prompt(input);
        return output!;
      } catch (error: any) {
        attempt++;
        if (attempt > maxRetries || !error.message.includes('429')) {
          throw error;
        }

        // Extract wait time from error message if available
        const match = error.message.match(/retry in ([0-9.]+)s/);
        let delay = 2000 * Math.pow(2, attempt); // Default backoff

        if (match && match[1]) {
          delay = Math.ceil(parseFloat(match[1]) * 1000) + 1000; // Add 1s buffer
        }

        console.log(`Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
);
