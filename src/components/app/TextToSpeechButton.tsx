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
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    if (!synth) return;
  
    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const utterances = synth.getVoices(); // This is just to ensure synth is used and not optimized away.
    // The main logic is handled in handleToggleSpeech
  
    // When the component unmounts, cancel any ongoing speech.
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [synth]);

  const handleToggleSpeech = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!synth) return;

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      if(text){
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        synth.speak(utterance);
      }
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
