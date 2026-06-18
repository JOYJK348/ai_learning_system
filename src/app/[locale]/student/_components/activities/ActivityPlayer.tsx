'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi, studentKeys, type Activity } from '@/core/services/studentApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import VideoSnake from './VideoSnake';
import VideoCircle from './VideoCircle';
import TraceActivity from './TraceActivity';
import DrawCanvas from './DrawCanvas';
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
import { useData } from '@/context/DataContext';

type Props = {
  lessonId: string;
  lessonTitle: string;
  onComplete: () => void;
  onClose: () => void;
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

export default function ActivityPlayer({ lessonId, lessonTitle, onComplete, onClose }: Props) {
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

  if (isError || !activities || activities.length === 0) {
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



  // ── SORTING & COMPARISON must be checked BEFORE shapes to prevent collision ──
  if (sortingComparisonConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
        style={{ background: 'rgba(5,15,5,0.75)', backdropFilter: 'blur(10px)' }}>
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0d2310 0%, #071a09 50%, #020d03 100%)', border: '2px solid rgba(34,197,94,0.25)' }}>
          {/* chalk dot texture */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #86efac 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          {/* chalk horizontal lines */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(134,239,172,0.6) 28px)', backgroundSize: '100% 28px' }} />
          {/* green glow top-left */}
          <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header with just close button */}
          <div className="relative z-10 flex items-center justify-end px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
            <button onClick={onClose}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center text-white/50 hover:text-white text-base sm:text-lg font-bold transition-all border border-white/10">
              &times;
            </button>
          </div>

          {/* Activity body */}
          <div className="relative z-10">
            <SortingComparisonQuiz
              conceptKey={sortingComparisonConceptKey}
              onComplete={handleSortingComparisonComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  if (preMathConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
        style={{ background: 'rgba(5,15,5,0.75)', backdropFilter: 'blur(10px)' }}>
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0d2310 0%, #071a09 50%, #020d03 100%)', border: '2px solid rgba(34,197,94,0.25)' }}>
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #86efac 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(134,239,172,0.6) 28px)', backgroundSize: '100% 28px' }} />
          <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header with just close button */}
          <div className="relative z-10 flex items-center justify-end px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
            <button onClick={onClose}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center text-white/50 hover:text-white text-base sm:text-lg font-bold transition-all border border-white/10">
              &times;
            </button>
          </div>

          {/* Activity body */}
          <div className="relative z-10">
            <PreMathQuiz
              conceptKey={preMathConceptKey}
              onComplete={handlePreMathComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  if (shapesSpatialConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
        style={{ background: 'rgba(5,15,5,0.75)', backdropFilter: 'blur(10px)' }}>
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0d2310 0%, #071a09 50%, #020d03 100%)', border: '2px solid rgba(34,197,94,0.25)' }}>
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #86efac 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(134,239,172,0.6) 28px)', backgroundSize: '100% 28px' }} />
          <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header with just close button */}
          <div className="relative z-10 flex items-center justify-end px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
            <button onClick={onClose}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center text-white/50 hover:text-white text-base sm:text-lg font-bold transition-all border border-white/10">
              &times;
            </button>
          </div>

          {/* Activity body */}
          <div className="relative z-10">
            <ShapesSpatialQuiz
              conceptKey={shapesSpatialConceptKey}
              onComplete={handleShapesSpatialComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  if (numberAdventureConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
        style={{ background: 'rgba(5,15,5,0.75)', backdropFilter: 'blur(10px)' }}>
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0d2310 0%, #071a09 50%, #020d03 100%)', border: '2px solid rgba(34,197,94,0.25)' }}>
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #86efac 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(134,239,172,0.6) 28px)', backgroundSize: '100% 28px' }} />
          <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header with just close button */}
          <div className="relative z-10 flex items-center justify-end px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
            <button onClick={onClose}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center text-white/50 hover:text-white text-base sm:text-lg font-bold transition-all border border-white/10">
              &times;
            </button>
          </div>

          {/* Activity body */}
          <div className="relative z-10">
            <NumberAdventureQuiz
              conceptKey={numberAdventureConceptKey}
              onComplete={handleNumberAdventureComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  if (numberAdventure610ConceptKey) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
        style={{ background: 'rgba(5,15,5,0.75)', backdropFilter: 'blur(10px)' }}>
        <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(34,197,94,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0d2310 0%, #071a09 50%, #020d03 100%)', border: '2px solid rgba(34,197,94,0.25)' }}>
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #86efac 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(134,239,172,0.6) 28px)', backgroundSize: '100% 28px' }} />
          <div className="absolute top-[-15%] left-[-8%] w-[45%] h-[55%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header with just close button */}
          <div className="relative z-10 flex items-center justify-end px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
            <button onClick={onClose}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-emerald-500/30 flex items-center justify-center text-white/50 hover:text-white text-base sm:text-lg font-bold transition-all border border-white/10">
              &times;
            </button>
          </div>

          {/* Activity body */}
          <div className="relative z-10">
            <NumberAdventureQuiz610
              conceptKey={numberAdventure610ConceptKey}
              onComplete={handleNumberAdventure610Complete}
            />
          </div>
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
        return act.name.toLowerCase().includes('circle')
          ? <VideoCircle {...commonProps} />
          : <VideoSnake {...commonProps} />;
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-2xl sm:rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
        style={{ background: 'linear-gradient(145deg, #7dd3fc, #38bdf8, #3b82f6)' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/20 to-transparent skew-x-[-20deg] translate-x-32 pointer-events-none" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-white/15 blur-[60px] sm:blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
          <span className="text-[10px] sm:text-sm font-bold text-white/60">
            {currentIndex + 1} / {activities.length}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {activities.map((a, i) => (
              <div key={a.id}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shadow-md
                  ${completedIds.has(a.id) ? 'bg-green-400 text-white' : i === currentIndex ? 'bg-white/30 text-white border-2 border-white/60' : 'bg-white/15 text-white/50'}`}
              >
                {completedIds.has(a.id) ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button onClick={onClose}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white/60 hover:text-white text-base sm:text-lg font-bold transition-all">
            &times;
          </button>
        </div>

        {/* Activity body */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentActivity?.id || 'done'}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {allDone ? (
                <div className="flex flex-col items-center gap-4 sm:gap-6 px-6 sm:px-10 pb-6 sm:pb-10 pt-2">
                  <span className="text-5xl sm:text-7xl animate-bounce">🎉</span>
                  <h2 className="text-xl sm:text-3xl font-black text-white drop-shadow-lg text-center font-sans">{lessonTitle}</h2>
                  <p className="text-sm sm:text-lg font-bold text-green-200 font-sans">
                    {isTamil ? 'பாடம் வெற்றிகரமாக முடிந்தது! 🎉' : 'Lesson Complete! 🎉'}
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="px-6 sm:px-10 py-2.5 sm:py-4 bg-white/25 backdrop-blur-md text-white font-black text-sm sm:text-lg rounded-full shadow-xl border-2 border-white/40 hover:bg-white/35 transition-all border-b-4 border-white/50 active:scale-95 font-sans"
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
