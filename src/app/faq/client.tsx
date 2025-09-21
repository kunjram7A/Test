'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getFaqAnswer } from './actions';
import type { AnswerUniversityQuestionOutput } from '@/ai/flows/university-faq';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, BookCheck } from 'lucide-react';

const formSchema = z.object({
  universityName: z.string().min(3, 'University name must be at least 3 characters.'),
  question: z.string().min(10, 'Question must be at least 10 characters.'),
});

export default function FaqClient() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnswerUniversityQuestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      universityName: '',
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const answer = await getFaqAnswer(values);
      setResult(answer);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not get an answer. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Bot /> Ask a Question
              </CardTitle>
              <CardDescription>
                Get verified answers for common university-related questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="universityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Placeholder University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., What are the hostel timings?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Answer
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {loading && (
        <div className="text-center p-8">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Finding an answer...</p>
        </div>
      )}

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-headline">Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{result.answer}</p>
          </CardContent>
          {result.source && (
            <CardFooter className="text-sm text-muted-foreground">
              <BookCheck className="w-4 h-4 mr-2" />
              Source: {result.source}
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
