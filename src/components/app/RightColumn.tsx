'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ActiveView } from '@/app/page';
import type { QuizData, ChatMessage, QuizQuestion } from '@/lib/types';
import { ChatView } from './ChatView';
import { SummaryView } from './SummaryView';
import { QuizView } from './QuizView';

interface RightColumnProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  summary: string | null;
  quiz: QuizData | null;
  chatHistory: ChatMessage[];
  onChatSubmit: (question: string) => Promise<void>;
  onGenerateQuiz: (previousQuestions?: QuizQuestion[]) => Promise<void>;
  isChatLoading: boolean;
  isQuizLoading: boolean;
  isPdfUploaded: boolean;
}

export function RightColumn({
  activeView,
  setActiveView,
  summary,
  quiz,
  chatHistory,
  onChatSubmit,
  onGenerateQuiz,
  isChatLoading,
  isQuizLoading,
  isPdfUploaded,
}: RightColumnProps) {
  const handleClose = () => setActiveView('chat');

  return (
    <main className="flex-1 p-6 pl-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView + (quiz ? quiz.questions[0].question : '')} // Add quiz key to force re-render
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full w-full bg-card rounded-lg"
        >
          {activeView === 'chat' && (
            <ChatView
              history={chatHistory}
              onSubmit={onChatSubmit}
              isLoading={isChatLoading}
              isPdfUploaded={isPdfUploaded}
            />
          )}
          {activeView === 'summary' && summary && (
            <SummaryView summary={summary} onClose={handleClose} />
          )}
          {activeView === 'quiz' && quiz && (
            <QuizView 
              quiz={quiz} 
              onClose={handleClose} 
              onGenerateQuiz={onGenerateQuiz}
              isQuizLoading={isQuizLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
