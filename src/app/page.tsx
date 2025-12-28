'use client';

import * as React from 'react';
import { summarizeLectureNotes } from '@/ai/flows/summarize-lecture-notes';
import { generateExamQuiz } from '@/ai/flows/generate-exam-quiz';
import { answerQuestionFromNotes } from '@/ai/flows/answer-question-from-notes';
import { extractRandomTopic } from '@/ai/flows/extract-random-topic';
import { gradeExplanation } from '@/ai/flows/grade-explanation';
import type { QuizData, ChatMessage, QuizQuestion, FeynmanData, FeynmanGrade } from '@/lib/types';
import { LeftColumn } from '@/components/app/LeftColumn';
import { RightColumn } from '@/components/app/RightColumn';
import { useToast } from '@/hooks/use-toast';

export type ActiveView = 'chat' | 'summary' | 'quiz' | 'feynman';

type PdfFile = {
  name: string;
  dataUri: string;
};

export default function Home() {
  const [pdfFile, setPdfFile] = React.useState<PdfFile | null>(null);
  const [activeView, setActiveView] = React.useState<ActiveView>('chat');
  const [summary, setSummary] = React.useState<string | null>(null);
  const [quiz, setQuiz] = React.useState<QuizData | null>(null);
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const [feynmanData, setFeynmanData] = React.useState<FeynmanData | null>(null);

  const [loading, setLoading] = React.useState({
    summary: false,
    quiz: false,
    chat: false,
    feynman: false,
    feynmanGrade: false,
  });
  const { toast } = useToast();

  const handleSetPdfFile = (file: PdfFile | null) => {
    setPdfFile(file);
    if (file) {
      toast({
        title: 'File Uploaded',
        description: `${file.name} has been successfully uploaded.`,
      });
    } else {
      // Reset everything when file is removed
      setActiveView('chat');
      setSummary(null);
      setQuiz(null);
      setChatHistory([]);
      setFeynmanData(null);
    }
  };

  const handleGenerateSummary = async () => {
    if (!pdfFile) return;
    setLoading((prev) => ({ ...prev, summary: true }));
    setActiveView('summary');
    try {
      const result = await summarizeLectureNotes({ pdfDataUri: pdfFile.dataUri });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate summary.',
      });
       setActiveView('chat');
    } finally {
      setLoading((prev) => ({ ...prev, summary: false }));
    }
  };

  const handleGenerateQuiz = async (previousQuestions?: QuizQuestion[]) => {
    if (!pdfFile) return;
    setLoading((prev) => ({ ...prev, quiz: true }));
    setActiveView('quiz');
    try {
      const result = await generateExamQuiz({ 
        pdfDataUri: pdfFile.dataUri,
        previousQuestions
      });
      setQuiz(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate quiz.',
      });
      setActiveView('chat');
    } finally {
      setLoading((prev) => ({ ...prev, quiz: false }));
    }
  };
  
  const handleChatSubmit = async (question: string) => {
    if (!pdfFile) return;
    setChatHistory((prev) => [...prev, { role: 'user', content: question }]);
    setLoading((prev) => ({ ...prev, chat: true }));
    try {
      const result = await answerQuestionFromNotes({
        pdfDataUri: pdfFile.dataUri,
        question,
      });
      setChatHistory((prev) => [...prev, { role: 'ai', content: result.answer }]);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get answer from AI.',
      });
      setChatHistory((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setLoading((prev) => ({ ...prev, chat: false }));
    }
  };

  const handleStartFeynman = async () => {
    if (!pdfFile) return;
    setLoading((prev) => ({ ...prev, feynman: true }));
    setActiveView('feynman');
    setFeynmanData(null); // Clear previous data
    try {
      const result = await extractRandomTopic({ pdfDataUri: pdfFile.dataUri });
      setFeynmanData({ topic: result.topic });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a topic from your notes.',
      });
      setActiveView('chat');
    } finally {
      setLoading((prev) => ({ ...prev, feynman: false }));
    }
  };
  
  const handleFeynmanSubmit = async (explanation: string) => {
    if (!pdfFile || !feynmanData?.topic) return;
    setLoading((prev) => ({ ...prev, feynmanGrade: true }));
    try {
      const result = await gradeExplanation({
        pdfDataUri: pdfFile.dataUri,
        topic: feynmanData.topic,
        explanation,
      });
      setFeynmanData((prev) => prev ? { ...prev, grade: result } : null);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to grade your explanation.',
      });
    } finally {
      setLoading((prev) => ({ ...prev, feynmanGrade: false }));
    }
  };
  

  return (
    <div className="flex h-screen w-full bg-background">
      <LeftColumn
        pdfFile={pdfFile}
        setPdfFile={handleSetPdfFile}
        onGenerateSummary={handleGenerateSummary}
        onGenerateQuiz={() => handleGenerateQuiz()}
        onStartFeynman={handleStartFeynman}
        loading={loading}
      />
      <RightColumn
        activeView={activeView}
        setActiveView={setActiveView}
        summary={summary}
        quiz={quiz}
        feynmanData={feynmanData}
        chatHistory={chatHistory}
        onChatSubmit={handleChatSubmit}
        onGenerateQuiz={handleGenerateQuiz}
        onFeynmanSubmit={handleFeynmanSubmit}
        onStartFeynman={handleStartFeynman}
        isChatLoading={loading.chat}
        isQuizLoading={loading.quiz}
        isSummaryLoading={loading.summary}
        isFeynmanLoading={loading.feynman}
        isFeynmanGrading={loading.feynmanGrade}
        isPdfUploaded={!!pdfFile}
      />
    </div>
  );
}
