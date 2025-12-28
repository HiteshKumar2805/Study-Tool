
'use server';

/**
 * @fileOverview A flow to grade a student's explanation using the Feynman Technique.
 *
 * - gradeExplanation - Grades the explanation against the source document.
 * - GradeExplanationInput - The input type.
 * - GradeExplanationOutput - The output type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeExplanationInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The source PDF document, as a data URI that must include a MIME type and use Base64 encoding."
    ),
  topic: z.string().describe('The topic the user was asked to explain.'),
  explanation: z.string().describe("The user's explanation of the topic."),
});
export type GradeExplanationInput = z.infer<typeof GradeExplanationInputSchema>;

const GradeExplanationOutputSchema = z.object({
  score: z.number().min(0).max(10).describe('A score from 0 to 10 for the explanation.'),
  feedback: z.string().describe('Detailed, constructive feedback on the explanation, pointing out what was right, what was wrong, and what was missing.'),
});
export type GradeExplanationOutput = z.infer<typeof GradeExplanationOutputSchema>;

export async function gradeExplanation(input: GradeExplanationInput): Promise<GradeExplanationOutput> {
  return gradeExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeExplanationPrompt',
  input: {schema: GradeExplanationInputSchema},
  output: {schema: GradeExplanationOutputSchema},
  prompt: `You are a strict but fair university professor who is an expert in the Feynman Technique. Your goal is to assess a student's understanding of a topic by evaluating how simply and accurately they can explain it.

  A student was given the following topic to explain, based on the provided lecture notes:
  Topic: {{{topic}}}

  Here is the student's explanation:
  "{{{explanation}}}"

  And here are the original lecture notes for your reference:
  {{media url=pdfDataUri}}

  Your task is to grade the student's explanation.
  1.  Rate their explanation on a scale of 0 to 10, where 0 is completely wrong and 10 is a perfect, simple, and accurate explanation.
  2.  Provide detailed, constructive feedback. Start with what they got right. Then, gently point out any inaccuracies. Finally, and most importantly, explain what key concepts or details from the notes are missing from their explanation.
  3.  Keep your feedback concise and easy to understand. The goal is to help them learn, not to discourage them.
  `,
});

const gradeExplanationFlow = ai.defineFlow(
  {
    name: 'gradeExplanationFlow',
    inputSchema: GradeExplanationInputSchema,
    outputSchema: GradeExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
