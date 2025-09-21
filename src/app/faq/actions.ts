'use server';
import { answerUniversityQuestion, type AnswerUniversityQuestionInput, type AnswerUniversityQuestionOutput } from '@/ai/flows/university-faq';

export async function getFaqAnswer(
  input: AnswerUniversityQuestionInput
): Promise<AnswerUniversityQuestionOutput> {
  try {
    const result = await answerUniversityQuestion(input);
    return result;
  } catch (error) {
    console.error('Error in getFaqAnswer:', error);
    // It's better to return a structured error than to throw
    return {
        answer: "I'm sorry, but I encountered an error while trying to find an answer. Please try again later.",
        source: "System Error"
    };
  }
}
