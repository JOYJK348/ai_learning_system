'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi, studentKeys, type Activity } from '@/core/services/studentApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import TraceActivity from './TraceActivity';
import DrawCanvas from './DrawCanvas';
import PreWritingVideo from './PreWritingVideo';
import LetterShowcase from './LetterShowcase';
import LetterFindGame from './LetterFindGame';
import PhonicsShowcase from './PhonicsShowcase';
import BalloonPop from './BalloonPop';
import MatchPairs from './MatchPairs';
import TapSelect from './TapSelect';
import NameTraceActivity from './NameTraceActivity';
import TamilVowelQuiz from './TamilVowelQuiz';
import TamilMeiQuiz from './TamilMeiQuiz';
import TamilWordShowcase from './TamilWordShowcase';
import PreMathQuiz from './PreMathQuiz';
import ShapesSpatialQuiz from './ShapesSpatialQuiz';
import NumberAdventureQuiz from './NumberAdventureQuiz';
import NumberAdventureQuiz610 from './NumberAdventureQuiz610';
import SortingComparisonQuiz from './SortingComparisonQuiz';
import EvsExploreGame from './EvsExploreGame';
import HindiLetterQuiz from './HindiLetterQuiz';
import { useData } from '@/context/DataContext';

type Props = {
  lessonId: string;
  lessonTitle: string;
  onComplete: () => void;
  onClose: () => void;
  studentName?: string;
  subjectName?: string;
};

const ACTIVITY_TYPE_MAP: Record<number, string> = {
  5: 'video',
  1: 'trace',  // legacy tracing type
  6: 'trace',
  7: 'draw',
  3: 'match',
  4: 'tap_select',
  8: 'name',
  9: 'vowel_quiz',
  10: 'mei_quiz',
  11: 'word_showcase',
};

export default function ActivityPlayer({ lessonId, lessonTitle, onComplete, onClose, studentName, subjectName }: Props) {
  const params = useParams();
  const isTamil = params?.locale === 'ta';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  const { data: activities, isLoading, isError } = useQuery({
    queryKey: studentKeys.activities(lessonId),
    queryFn: () => studentApi.getLessonActivities(lessonId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const submitMutation = useMutation({
    mutationFn: ({ activityId, body }: { activityId: string; body: Parameters<typeof studentApi.submitActivityAttempt>[2] }) =>
      studentApi.submitActivityAttempt(lessonId, activityId, body),
  });

  const progressMutation = useMutation({
    mutationFn: () => studentApi.updateProgress(lessonId, { status: 'completed', completion_percentage: 100 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.activities(lessonId) });
      queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
      queryClient.invalidateQueries({ queryKey: studentKeys.dashboard });
    },
  });

  const handleActivityComplete = useCallback((activityId: string, data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    // Advance immediately without waiting for API
    const newCompleted = new Set(completedIds);
    newCompleted.add(activityId);
    setCompletedIds(newCompleted);

    if (activities && currentIndex < activities.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (activities && newCompleted.size >= activities.length) {
      progressMutation.mutate(undefined, {
        onSuccess: () => setTimeout(onComplete, 500),
        onError: () => setTimeout(onComplete, 500),
      });
    }

    // Submit attempt in background (fire-and-forget, don't block UI)
    submitMutation.mutate({ activityId, body: data });
  }, [submitMutation, completedIds, currentIndex, activities, progressMutation, onComplete]);

  const getPreMathConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    if (lower.includes('big')) return 'big-small';
    if (lower.includes('tall')) return 'tall-short';
    if (lower.includes('more')) return 'more-less';
    if (lower.includes('heavy')) return 'heavy-light';
    if (lower.includes('same') || lower.includes('diff')) return 'same-diff';
    return null;
  };
  const preMathConceptKey = getPreMathConceptKey();

  const handlePreMathComplete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    if (activities && activities.length > 0) {
      activities.forEach((act) => {
        submitMutation.mutate({ activityId: act.id, body: data });
      });
    }
    progressMutation.mutate();
    setTimeout(onComplete, 100);
  }, [activities, submitMutation, progressMutation, onComplete]);

  const getShapesSpatialConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    if (lower.includes('circle') && lower.includes('square')) return 'circle-square';
    if (lower.includes('triangle') || lower.includes('rectangle')) return 'triangle-rectangle';
    if (lower.includes('around')) return 'shapes-around';
    if (lower.includes('detective') || lower.includes('find')) return 'find-shape';
    // Require BOTH 'shape' and 'sort' so that sorting-chapter lessons don't match here
    if (lower.includes('shape') && lower.includes('sort')) return 'shape-sorting';
    if (lower.includes('above') || lower.includes('below')) return 'above-below';
    if (lower.includes('top') || lower.includes('bottom')) return 'top-bottom';
    if (lower.includes('left') || lower.includes('right')) return 'left-right';
    if (lower.includes('near') || lower.includes('far')) return 'near-far';
    if (lower.includes('open') || lower.includes('close')) return 'open-close';
    // Pattern subtypes — check specific ones before generic catch-all
    if (lower.includes('color') && lower.includes('pattern')) return 'color-patterns';
    if (lower.includes('shape') && lower.includes('pattern')) return 'shape-patterns';
    if (lower.includes('number') && lower.includes('pattern')) return 'number-patterns';
    if (lower.includes('pattern')) return 'color-patterns'; // default to color patterns
    return null;
  };
  const shapesSpatialConceptKey = getShapesSpatialConceptKey();

  const handleShapesSpatialComplete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    if (activities && activities.length > 0) {
      activities.forEach((act) => {
        submitMutation.mutate({ activityId: act.id, body: data });
      });
    }
    progressMutation.mutate();
    setTimeout(onComplete, 100);
  }, [activities, submitMutation, progressMutation, onComplete]);

  const getNumberAdventureConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    if (lower.includes('10')) return null;
    // Match only when it belongs to the numbers 1-5 chapter
    if (lower.includes('1') && lower.includes('2')) return 'numbers-1-2';
    if (lower.includes('3') && lower.includes('4')) return 'numbers-3-4';
    if (lower.includes('5') && !lower.includes('1')) return 'number-5';
    if (lower.includes('review') || lower.includes('match') || lower.includes('adventure') || lower.includes('quantity')) return 'count-match-1-5';
    return null;
  };
  const numberAdventureConceptKey = getNumberAdventureConceptKey();

  const handleNumberAdventureComplete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    if (activities && activities.length > 0) {
      activities.forEach((act) => {
        submitMutation.mutate({ activityId: act.id, body: data });
      });
    }
    progressMutation.mutate();
    setTimeout(onComplete, 100);
  }, [activities, submitMutation, progressMutation, onComplete]);

  const getNumberAdventure610ConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    if (lower.includes('6') && lower.includes('7')) return 'numbers-6-7';
    if (lower.includes('8') && lower.includes('10')) return 'numbers-8-10';
    if (lower.includes('count') && lower.includes('objects') && lower.includes('10')) return 'count-objects-1-10';
    if (lower.includes('match') && lower.includes('10')) return 'count-match-1-10';
    if (lower.includes('before') || lower.includes('after')) return 'before-after';
    return null;
  };
  const numberAdventure610ConceptKey = getNumberAdventure610ConceptKey();

  const handleNumberAdventure610Complete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    if (activities && activities.length > 0) {
      activities.forEach((act) => {
        submitMutation.mutate({ activityId: act.id, body: data });
      });
    }
    progressMutation.mutate();
    setTimeout(onComplete, 100);
  }, [activities, submitMutation, progressMutation, onComplete]);

  const getSortingComparisonConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    // Require 'sort' + 'color'/'size' together — prevents "Color Patterns" / "Size Patterns" from matching here
    if (lower.includes('sort') && lower.includes('color')) return 'sort-by-color';
    if (lower.includes('sort') && lower.includes('size')) return 'sort-by-size';
    if (lower.includes('compare')) return 'compare-groups';
    // 'same & different' is always a sorting/comparison concept
    if ((lower.includes('same') || lower.includes('different') || lower.includes('diff')) && !lower.includes('pattern')) return 'same-different';
    return null;
  };
  const sortingComparisonConceptKey = getSortingComparisonConceptKey();

  const getEvsConceptKey = () => {
    const lower = lessonTitle.toLowerCase();
    // Hindi lessons
    if (subjectName?.toLowerCase().includes('hindi')) {
      if ((lower.includes('अ') && lower.includes('आ')) || lower.includes('अनार')) return 'hindi-swar-aa';
      if (lower.includes('इ से ऊ') || lower.includes('इमली') || lower.includes('ईंट') || lower.includes('उल्लू') || lower.includes('ऊँट')) return 'hindi-swar-ii-uu';
      if (lower.includes('क ख ग घ') || lower.includes('कबूतर') || lower.includes('खरगोश')) return 'hindi-vyanjan-ka';
      if (lower.includes('च छ ज') || lower.includes('चिड़िया') || lower.includes('छाता') || lower.includes('जहाज़')) return 'hindi-vyanjan-cha';
      if (lower.includes('घर और फल') || lower.includes('घर') && lower.includes('फल')) return 'hindi-simple-words-ghar';
      if (lower.includes('जल और वन') || lower.includes('जल') && lower.includes('वन')) return 'hindi-simple-words-jal';
      if (lower.includes('नमस्ते') || lower.includes('परिचय')) return 'hindi-bolna-namaste';
      if (lower.includes('मेरा परिवार') || lower.includes('मम्मी') || lower.includes('पापा') || lower.includes('परिवार')) return 'hindi-bolna-parivar';
      if (lower.includes('प्रिय कविता') || lower.includes('कविताएँ') || lower.includes('कविता')) return 'hindi-kavita-rhymes';
      if (lower.includes('कहानी') || lower.includes('कहानियाँ') || lower.includes('moral') || lower.includes('stor') || lower.includes('छोटी')) return 'hindi-kavita-stories';
      if (lower.includes('जानवर') || lower.includes('हाथी') || lower.includes('बिल्ली') || lower.includes('कुत्ता')) return 'hindi-pictures-animals';
      if (lower.includes('आस-पास') || lower.includes('चीज़ें') || lower.includes('गाड़ी') || lower.includes('पेड़')) return 'hindi-pictures-things';
      return 'hindi-swar-aa';
    }
    // GK lessons (checked first to avoid EVS conflicts)
    if (lower.includes('name') && lower.includes('identity')) return 'gk-my-name-identity';
    if (lower.includes('my') && lower.includes('daily') && lower.includes('routine')) return 'gk-my-daily-routine';
    if (lower.includes('road') && lower.includes('safety')) return 'gk-road-safety';
    if (lower.includes('festival')) return 'gk-festivals';
    if (lower.includes('animal') && lower.includes('name')) return 'gk-animal-names';
    if (lower.includes('bird') && lower.includes('insect')) return 'gk-birds-insects';
    if (lower.includes('basic') && lower.includes('color')) return 'gk-basic-colors';
    if (lower.includes('color') && lower.includes('match')) return 'gk-color-match';
    if (lower.includes('community') && lower.includes('helper')) return 'gk-community-helpers';
    if (lower.includes('place') && !lower.includes('plant')) return 'gk-places';
    if (lower.includes('vehicle')) return 'gk-vehicles-around-us';
    if (lower.includes('sky') && lower.includes('object')) return 'gk-sky-objects';
    if (lower.includes('weather')) return 'gk-weather';
    if (lower.includes('healthy') && lower.includes('habit')) return 'gk-clean-habits';
    if (lower.includes('good') && lower.includes('manner')) return 'gk-good-manners';
    // EVS lessons
    if (lower.includes('clean') && lower.includes('habit')) return 'clean-habits';
    if (lower.includes('body') && lower.includes('part')) return 'my-body-parts';
    if (lower.includes('five') && lower.includes('sense')) return 'my-five-senses';
    if (lower.includes('taking') && lower.includes('care')) return 'taking-care';
    if (lower.includes('family') && lower.includes('member')) return 'family-members';
    if (lower.includes('animal') && lower.includes('home')) return 'animal-homes';
    if (lower.includes('home')) return 'my-home';
    if (lower.includes('pet') && lower.includes('wild')) return 'pet-wild-animals';
    if (lower.includes('part') && lower.includes('plant')) return 'plant-parts';
    if (lower.includes('thing') && lower.includes('nature')) return 'nature-things';
    if (lower.includes('season')) return 'seasons';
    // EVS transport (before generic GK transport check)
    if (lower.includes('land') && lower.includes('transport')) return 'land-transport';
    if (lower.includes('air') && lower.includes('water')) return 'air-water-transport';
    if (lower.includes('traffic') && lower.includes('rule')) return 'traffic-rules';
    // GK transport (after EVS transport to avoid "Land Transport" conflict)
    if (lower.includes('transport')) return 'gk-transport';
    if (lower.includes('healthy') && lower.includes('food')) return 'healthy-food';
    if (lower.includes('daily') && lower.includes('routine')) return 'daily-routine';
    return null;
  };
  const evsConceptKey = getEvsConceptKey();

  const handleEvsComplete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    // Fire completion API in background — don't wait for it
    progressMutation.mutate(undefined);
    // Close lesson immediately
    onComplete();
  }, [progressMutation, onComplete]);

  const handleSortingComparisonComplete = useCallback((data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => {
    if (activities && activities.length > 0) {
      activities.forEach((act) => {
        submitMutation.mutate({ activityId: act.id, body: data });
      });
    }
    progressMutation.mutate();
    setTimeout(onComplete, 100);
  }, [activities, submitMutation, progressMutation, onComplete]);

  const currentActivity: Activity | undefined = activities?.[currentIndex];
  const allDone = completedIds.size > 0 && activities && completedIds.size >= activities.length;

  // ── Concept-based games (skip activities query — they're self-contained) ──
  if (evsConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>

          <div className="relative z-10">
            {['hindi-swar-aa', 'hindi-swar-ii-uu', 'hindi-vyanjan-ka', 'hindi-vyanjan-cha'].includes(evsConceptKey) ? (
              <HindiLetterQuiz conceptKey={evsConceptKey} onComplete={handleEvsComplete} />
            ) : (
              <EvsExploreGame conceptKey={evsConceptKey} onComplete={handleEvsComplete} childName={studentName} />
            )}
          </div>

          <div className="relative z-10 w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }
  if (sortingComparisonConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>
          <div className="relative z-10">
            <SortingComparisonQuiz conceptKey={sortingComparisonConceptKey} onComplete={handleSortingComparisonComplete} />
          </div>
        </div>
      </div>
    );
  }
  if (preMathConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>
          <div className="relative z-10">
            <PreMathQuiz conceptKey={preMathConceptKey} onComplete={handlePreMathComplete} />
          </div>
          <div className="relative z-10 w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }
  if (shapesSpatialConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>
          <div className="relative z-10">
            <ShapesSpatialQuiz conceptKey={shapesSpatialConceptKey} onComplete={handleShapesSpatialComplete} />
          </div>
          <div className="relative z-10 w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }
  if (numberAdventureConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>
          <div className="relative z-10">
            <NumberAdventureQuiz conceptKey={numberAdventureConceptKey} onComplete={handleNumberAdventureComplete} />
          </div>
          <div className="relative z-10 w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }
  if (numberAdventure610ConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
          {/* Playful background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-end px-4 pt-4 pb-2">
            <button onClick={onClose}
              className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center text-amber-800 text-lg font-bold transition-all border border-amber-200/60 shadow-sm active:scale-90">
              &times;
            </button>
          </div>
          <div className="relative z-10">
            <NumberAdventureQuiz610 conceptKey={numberAdventure610ConceptKey} onComplete={handleNumberAdventure610Complete} />
          </div>
          <div className="relative z-10 w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-[3px] border-white/20 border-t-white/80"
          />
          <p className="text-white/60 font-bold text-sm font-sans">
            {isTamil ? 'செயல்பாடுகள் ஏற்றப்படுகின்றன...' : 'Loading activities...'}
          </p>
        </div>
      </div>
    );
  }

  if (!evsConceptKey && (isError || !activities || activities.length === 0)) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}>
        <div className="rounded-[2rem] p-8 max-w-lg w-full mx-4 shadow-2xl text-center border border-white/30 backdrop-blur-md"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          <p className="text-lg font-black text-white font-sans">
            {isTamil ? 'இந்த பாடத்திற்கு இன்னும் செயல்பாடுகள் இல்லை.' : 'No activities for this lesson yet.'}
          </p>
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-slate-200 rounded-full font-bold font-sans shadow-md border-b-2 active:scale-95">
            {isTamil ? 'பின்னால்' : 'Back'}
          </button>
        </div>
      </div>
    );
  }



  // (sortingComparisonConceptKey block moved above to run before shapesSpatial — see fix above)

  const renderActivity = () => {
    const act = currentActivity!;
    const type = ACTIVITY_TYPE_MAP[act.activity_type_id] || 'unknown';
    const commonProps = {
      onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) =>
        handleActivityComplete(act.id, data),
    };

    switch (type) {
      case 'video':
        if (act.config?.letter) return <LetterShowcase config={act.config} {...commonProps} />;
        if (act.config?.family) return <PhonicsShowcase config={act.config} {...commonProps} />;
        const deducedPath = (() => {
          if (act.config?.path) return String(act.config.path);
          const lower = act.name.toLowerCase();
          if (lower.includes('standing')) return 'standing';
          if (lower.includes('sleeping')) return 'sleeping';
          if (lower.includes('left slanting') || lower.includes('left-slanting')) return 'left-slanting';
          if (lower.includes('right slanting') || lower.includes('right-slanting')) return 'right-slanting';
          if (lower.includes('slanting')) return 'left-slanting';
          if (lower.includes('up curve') || lower.includes('up-curve')) return 'up-curve';
          if (lower.includes('down curve') || lower.includes('down-curve')) return 'down-curve';
          if (lower.includes('left curve') || lower.includes('left-curve')) return 'left-curve';
          if (lower.includes('right curve') || lower.includes('right-curve')) return 'right-curve';
          if (lower.includes('curve')) return 'up-curve';
          if (lower.includes('zigzag') || lower.includes('zig')) return 'zigzag';
          if (lower.includes('circle')) return 'circle';
          if (lower.includes('snake') || lower.includes('wavy') || lower.includes('s-curve')) return 's-curve';
          return 'standing';
        })();
        return <PreWritingVideo config={{ path: deducedPath, isTamil }} {...commonProps} />;
      case 'trace':
        return <TraceActivity config={{ ...act.config, isTamil }} hasAttempt={!!act.attempt} {...commonProps} />;
      case 'draw':
        return <DrawCanvas config={act.config} {...commonProps} />;
      case 'match':
        return <MatchPairs config={act.config} {...commonProps} />;
      case 'tap_select':
        return <TapSelect config={act.config} {...commonProps} />;
      case 'quiz':
        return <LetterFindGame config={act.config} {...commonProps} />;
      case 'name':
        return <NameTraceActivity config={act.config} studentName={act.config?.name as string} {...commonProps} />;
      case 'vowel_quiz':
        return <TamilVowelQuiz config={act.config} {...commonProps} />;
      case 'mei_quiz':
        return <TamilMeiQuiz config={act.config} {...commonProps} />;
      case 'word_showcase':
        return <TamilWordShowcase config={act.config} {...commonProps} />;
      default:
        return (
          <div className="flex flex-col items-center gap-4 p-8">
            <p className="text-lg font-bold font-sans">{isTamil ? 'விரைவில்!' : 'Coming soon!'}</p>
            <button
              onClick={() => handleActivityComplete(act.id, { score: 100, max_score: 100, completion_data: { skipped: true }, time_taken_seconds: 0 })}
              className="px-6 py-2 bg-indigo-500 text-white rounded-full font-bold font-sans shadow-md border-b-2 active:scale-95"
            >
              {isTamil ? 'தவிர்' : 'Skip'}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/40 backdrop-blur-md">
      <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
        {/* Playful background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
          <span className="text-xs sm:text-sm font-black text-amber-700/80 tracking-wider">
            {currentIndex + 1} / {activities?.length || 0}
          </span>
          <div className="flex items-center gap-2">
            {activities?.map((a, i) => (
              <div key={a.id}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-sm
                  ${completedIds.has(a.id) ? 'bg-emerald-500 text-white' : i === currentIndex ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300' : 'bg-amber-100/60 text-amber-700/40'}`}
              >
                {completedIds.has(a.id) ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200/80 flex items-center justify-center text-amber-800 text-xl font-bold transition-all border border-amber-200/50 active:scale-90">
            &times;
          </button>
        </div>

        {/* Activity body */}
        <div className="relative z-10 p-4 sm:p-6 min-h-[350px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActivity?.id || 'done'}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {allDone ? (
                <div className="flex flex-col items-center gap-5 px-4 py-8 text-center">
                  <span className="text-6xl sm:text-7xl animate-bounce">🎉</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-sans">{lessonTitle}</h2>
                  <p className="text-base sm:text-lg font-black text-emerald-600 font-sans">
                    {isTamil ? 'பாடம் வெற்றிகரமாக முடிந்தது! 🎉' : 'Lesson Complete! 🎉'}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="px-8 py-3.5 bg-emerald-500 text-white font-black text-base sm:text-lg rounded-full shadow-lg hover:bg-emerald-400 transition-all border-b-4 border-emerald-700 active:scale-95 font-sans"
                  >
                    {isTamil ? 'பாடங்களுக்குத் திரும்பு ➡️' : 'Back to Lessons ➡️'}
                  </motion.button>
                </div>
              ) : currentActivity ? (
                renderActivity()
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
