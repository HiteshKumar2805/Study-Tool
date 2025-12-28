'use client';

import * as React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, RefreshCw, Sparkles, X, Mic, MicOff, CheckCircle2, Star } from 'lucide-react';
import type { FeynmanData } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { useSpeechToText } from '@/hooks/use-speech-to-text';

interface FeynmanViewProps {
  feynmanData: FeynmanData;
  onSubmit: (explanation: string) => Promise<void>;
  onNewTopic: () => Promise<void>;
  onClose: () => void;
  isGrading: boolean;
  isNewTopicLoading: boolean;
}

const formSchema = z.object({
  explanation: z.string().min(10, 'Please provide a more detailed explanation.'),
});
type FormValues = z.infer<typeof formSchema>;

export function FeynmanView({ feynmanData, onSubmit, onNewTopic, onClose, isGrading, isNewTopicLoading }: FeynmanViewProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { explanation: '' },
  });

  const { isListening, transcript, startListening, stopListening } = useSpeechToText({
    onTranscript: (text) => form.setValue('explanation', text, { shouldValidate: true }),
  });

  React.useEffect(() => {
    form.reset({ explanation: '' });
  }, [feynmanData.topic, form]);

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    await onSubmit(data.explanation);
  };
  
  if (feynmanData.grade) {
    const { score, feedback } = feynmanData.grade;
    const scorePercentage = score * 10;
    
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2"><CheckCircle2 className="text-primary"/>Grading Complete</CardTitle>
            <CardDescription>Here's the feedback on your explanation of "{feynmanData.topic}".</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
            <div className="text-center mb-6 p-6 bg-muted rounded-lg">
                <p className="text-lg text-muted-foreground">Your Score</p>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-5xl font-bold text-primary my-2">{score}</p>
                    <p className="text-2xl font-bold text-muted-foreground">/ 10</p>
                </div>
                <Progress value={scorePercentage} className="w-full max-w-sm mx-auto mt-4" />
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{feedback}</div>
        </CardContent>
        <CardFooter className="pt-6 border-t">
          <Button onClick={onNewTopic} className="w-full" disabled={isNewTopicLoading}>
              {isNewTopicLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <RefreshCw className="mr-2 h-4 w-4"/>}
              Try Another Topic
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/>Teach a Concept</CardTitle>
          <CardDescription>Explain the concept simply, as if you're teaching it to someone else.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onNewTopic} disabled={isNewTopicLoading}>
             {isNewTopicLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <RefreshCw className="mr-2 h-4 w-4"/>}
              New Topic
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6">
        <div className="p-4 bg-muted rounded-lg mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Your topic is:</p>
            <p className="text-xl font-bold text-primary">"{feynmanData.topic}"</p>
        </div>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col flex-1 gap-4">
              <FormField
                control={form.control}
                name="explanation"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>Your Explanation</FormLabel>
                    <FormControl className='flex-1 relative'>
                      <Textarea {...field} placeholder="Start explaining the concept here..." className="h-full resize-none pr-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <Button type="submit" disabled={isGrading} className="w-full">
                    {isGrading ? <Loader2 className="animate-spin mr-2"/> : <Star className="mr-2 h-4 w-4" />}
                    Grade My Explanation
                </Button>
            </form>
        </Form>
      </CardContent>
       <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Or, explain it with your voice:
            </p>
            <Button
              size="icon"
              variant={isListening ? 'destructive' : 'outline'}
              onClick={isListening ? stopListening : startListening}
              className="rounded-full w-10 h-10"
            >
              {isListening ? <MicOff /> : <Mic />}
              <span className="sr-only">{isListening ? 'Stop recording' : 'Start recording'}</span>
            </Button>
          </div>
        </CardFooter>
    </Card>
  );
}
