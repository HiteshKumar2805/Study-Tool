'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface TextToSpeechButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function TextToSpeechButton({ text, className, ...props }: TextToSpeechButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This effect now correctly handles client-side only APIs
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    const onEnd = () => setIsSpeaking(false);
    utterance.addEventListener('end', onEnd);
    
    const onStart = () => setIsSpeaking(true);
    utterance.addEventListener('start', onStart);

    return () => {
      // Cleanup: remove listeners and cancel any speech
      utterance.removeEventListener('end', onEnd);
      utterance.removeEventListener('start', onStart);
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [text]);


  const handleToggleSpeech = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    if (synth.speaking) {
        synth.cancel();
        setIsSpeaking(false);
    } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onstart = () => setIsSpeaking(true);
        synth.speak(utterance);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleSpeech}
            className={cn('h-8 w-8', className)}
            aria-label={isSpeaking ? 'Stop text-to-speech' : 'Read text aloud'}
            {...props}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isSpeaking ? 'Stop reading' : 'Read aloud'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
