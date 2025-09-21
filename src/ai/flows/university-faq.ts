'use server';

/**
 * @fileOverview An AI agent that answers questions about a specific university.
 *
 * - answerUniversityQuestion - A function that answers a question about a university.
 * - AnswerUniversityQuestionInput - The input type for the answerUniversityQuestion function.
 * - AnswerUniversityQuestionOutput - The return type for the answerUniversityQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerUniversityQuestionInputSchema = z.object({
  universityName: z.string().describe('The name of the university to ask about.'),
  question: z.string().describe('The question to ask about the university.'),
});
export type AnswerUniversityQuestionInput = z.infer<typeof AnswerUniversityQuestionInputSchema>;

const AnswerUniversityQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the university.'),
  source: z.string().optional().describe('The source of the information.'),
});
export type AnswerUniversityQuestionOutput = z.infer<typeof AnswerUniversityQuestionOutputSchema>;

export async function answerUniversityQuestion(
  input: AnswerUniversityQuestionInput
): Promise<AnswerUniversityQuestionOutput> {
  return answerUniversityQuestionFlow(input);
}

const getUniversityInfo = ai.defineTool({
  name: 'getUniversityInfo',
  description: 'Retrieves verified information about a specific university.',
  inputSchema: z.object({
    universityName: z.string().describe('The name of the university.'),
  }),
  outputSchema: z.string().describe('Verified information about the university.'),
},
async (input) => {
    // TODO: Implement the actual retrieval of university information from a verified source.
    // This is a placeholder implementation.
    if (input.universityName.toLowerCase().includes('placeholder')) {
      return 'This is placeholder information about the university.';
    }
    return `Verified information about ${input.universityName} is not available.`;
  }
);

const prompt = ai.definePrompt({
  name: 'universityFAQPrompt',
  input: {schema: AnswerUniversityQuestionInputSchema},
  output: {schema: AnswerUniversityQuestionOutputSchema},
  tools: [getUniversityInfo],
  prompt: `You are a helpful assistant that answers questions about universities.  You have access to a tool called \`getUniversityInfo\` that can retrieve verified information about a university.

  Answer the following question about the specified university. If possible, use the \`getUniversityInfo\` tool to get verified information about the university.  If you use the tool, cite the source in your answer.

  University Name: {{{universityName}}}
  Question: {{{question}}}
  `,
});

const answerUniversityQuestionFlow = ai.defineFlow(
  {
    name: 'answerUniversityQuestionFlow',
    inputSchema: AnswerUniversityQuestionInputSchema,
    outputSchema: AnswerUniversityQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
