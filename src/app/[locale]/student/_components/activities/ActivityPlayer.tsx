'use client';

import { useState, useCallback, useMemo } from 'react';
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
import { getLetterData } from '@/core/data/letterData';
import AlphabetBoard from './AlphabetBoard';
import MemoryMatch from './MemoryMatch';
import LetterMatchQuiz from './LetterMatchQuiz';
import MissingLettersQuiz from './MissingLettersQuiz';
import WordBuilderQuiz from './WordBuilderQuiz';
import LetterDragFillQuiz from './LetterDragFillQuiz';
import WordSorterQuiz from './WordSorterQuiz';
import FeedMascotQuiz from './FeedMascotQuiz';
import GridFinderMatch from './GridFinderMatch';
import VowelCollectorQuiz from './VowelCollectorQuiz';
import VowelShowcase from './VowelShowcase';
import ConsonantShowcase from './ConsonantShowcase';
import ConsonantCollectorQuiz from './ConsonantCollectorQuiz';
import VowelsInWordsQuiz from './VowelsInWordsQuiz';
import WordFamilyQuiz from './WordFamilyQuiz';
import SightWordsQuiz from './SightWordsQuiz';
import OppositesQuiz from './OppositesQuiz';
import VocabularyQuiz from './VocabularyQuiz';
import SimpleGrammarQuiz from './SimpleGrammarQuiz';
import SentenceBuilderQuiz from './SentenceBuilderQuiz';
import NumberRecognitionQuiz from './NumberRecognitionQuiz';
import CountingObjectsQuiz from './CountingObjectsQuiz';
import CountAndWriteQuiz from './CountAndWriteQuiz';
import NumberNamesQuiz from './NumberNamesQuiz';
import MissingNumbersQuiz from './MissingNumbersQuiz';
import BeforeAfterBetweenQuiz from './BeforeAfterBetweenQuiz';
import AdditionObjectsQuiz from './AdditionObjectsQuiz';
import SingleDigitAdditionQuiz from './SingleDigitAdditionQuiz';
import NumberBondsQuiz from './NumberBondsQuiz';
import TakingAwayQuiz from './TakingAwayQuiz';
import SubtractionObjectsQuiz from './SubtractionObjectsQuiz';
import SimpleSubtractionQuiz from './SimpleSubtractionQuiz';
import GreaterSmallerQuiz from './GreaterSmallerQuiz';
import EqualGroupsQuiz from './EqualGroupsQuiz';
import LongAndShortQuiz from './LongAndShortQuiz';
import ThickAndThinQuiz from './ThickAndThinQuiz';
import HeavyLightFullEmptyQuiz from './HeavyLightFullEmptyQuiz';
import FlatShapesQuiz from './FlatShapesQuiz';
import SpecialShapesQuiz from './SpecialShapesQuiz';
import ShapePuzzlesQuiz from './ShapePuzzlesQuiz';
import AboveBelowLeftRightQuiz from './AboveBelowLeftRightQuiz';
import FrontBehindNearFarQuiz from './FrontBehindNearFarQuiz';
import AbAbcPatternsQuiz from './AbAbcPatternsQuiz';
import ShapeObjectPatternsQuiz from './ShapeObjectPatternsQuiz';
import SortingColorShapeQuiz from './SortingColorShapeQuiz';
import SortingSizeQuantityQuiz from './SortingSizeQuantityQuiz';
import DayNightDaysQuiz from './DayNightDaysQuiz';
import MonthsTodayTomorrowQuiz from './MonthsTodayTomorrowQuiz';
import ClockRecognitionQuiz from './ClockRecognitionQuiz';
import UyirEzhuthukkalIntroQuiz from './UyirEzhuthukkalIntroQuiz';
import TamilLetterOrderQuiz from './TamilLetterOrderQuiz';
import TamilMeiIntroQuiz from './TamilMeiIntroQuiz';
import TamilSoundQuiz from './TamilSoundQuiz';
import TamilUyirmeiQuiz1 from './TamilUyirmeiQuiz1';
import TamilUyirmeiQuiz2 from './TamilUyirmeiQuiz2';
import TamilWordBuilderQuiz from './TamilWordBuilderQuiz';
import TamilTwoLetterWordsQuiz from './TamilTwoLetterWordsQuiz';
import TamilThreeLetterWordsQuiz from './TamilThreeLetterWordsQuiz';

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
  12: 'balloon_pop',
  13: 'quiz',
  14: 'alphabet_board',
  15: 'memory_match',
  16: 'letter_match_quiz',
  17: 'missing_letters_quiz',
  18: 'word_builder_quiz',
  19: 'letter_drag_fill_quiz',
  20: 'word_sorter_quiz',
  21: 'feed_mascot_quiz',
  22: 'grid_finder_match',
  23: 'vowel_collector_quiz',
  24: 'vowel_showcase_quiz',
  25: 'consonant_showcase_quiz',
  26: 'consonant_collector_quiz',
  27: 'vowels_in_words_quiz',
  28: 'word_family_quiz',
  29: 'sight_words_quiz',
  30: 'opposites_quiz',
  31: 'vocabulary_quiz',
  32: 'simple_grammar_quiz',
  33: 'sentence_builder_quiz',
  34: 'number_recognition_quiz',
  35: 'counting_objects_quiz',
  36: 'count_and_write_quiz',
  37: 'number_names_quiz',
  38: 'missing_numbers_quiz',
  39: 'before_after_between_quiz',
  40: 'addition_objects_quiz',
  41: 'single_digit_addition_quiz',
  42: 'number_bonds_quiz',
  43: 'taking_away_quiz',
  44: 'subtraction_objects_quiz',
  45: 'simple_subtraction_quiz',
  46: 'greater_smaller_quiz',
  47: 'equal_groups_quiz',
  48: 'long_and_short_quiz',
  49: 'thick_and_thin_quiz',
  50: 'heavy_light_full_empty_quiz',
  51: 'flat_shapes_quiz',
  52: 'special_shapes_quiz',
  53: 'shape_puzzles_quiz',
  54: 'above_below_left_right_quiz',
  55: 'front_behind_near_far_quiz',
  56: 'ab_abc_patterns_quiz',
  57: 'shape_object_patterns_quiz',
  58: 'sorting_color_shape_quiz',
  59: 'sorting_size_quantity_quiz',
  60: 'day_night_days_quiz',
  61: 'months_today_tomorrow_quiz',
  62: 'clock_recognition_quiz',
  63: 'uyir_ezhuthukkal_intro_quiz',
  64: 'tamil_letter_order_quiz',
  65: 'tamil_mei_intro_quiz',
  66: 'tamil_sound_quiz',
  67: 'tamil_uyirmei_quiz1',
  68: 'tamil_uyirmei_quiz2',
  69: 'tamil_word_builder_quiz',
  70: 'tamil_two_letter_words_quiz',
  71: 'tamil_three_letter_words_quiz',
};

export default function ActivityPlayer({ lessonId, lessonTitle, onComplete, onClose, studentName, subjectName }: Props) {
  const params = useParams();
  const isTamil = params?.locale === 'ta';
  const { studentProfile } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  const { data: rawActivities, isLoading, isError } = useQuery({
    queryKey: studentKeys.activities(lessonId),
    queryFn: () => studentApi.getLessonActivities(lessonId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const activities = useMemo(() => {
    if (!rawActivities) return undefined;
    
    const lowerTitle = lessonTitle.toLowerCase();
    console.log('ActivityPlayer Matching debug:', { lessonTitle, lowerTitle, hasMatch: lowerTitle.includes('ஈரெழுத்து') });
    
    // High-priority English Topic Overrides (Trigger instantly regardless of profile query timing)
    if (lowerTitle.includes('what are vowels')) {
      return [
        {
          id: `${lessonId}-vowelshow`,
          name: 'Vowel Showcase Board',
          activity_type_id: 24,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('find vowels in words') || lowerTitle.includes('vowels in words')) {
      return [
        {
          id: `${lessonId}-vowelsinwords`,
          name: 'Vowels In Words Counting Board',
          activity_type_id: 27,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('a e i o u') || lowerTitle.includes('aeiou')) {
      return [
        {
          id: `${lessonId}-vowelcol`,
          name: 'Vowel Collector Board',
          activity_type_id: 23,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('consonant')) {
      return [
        {
          id: `${lessonId}-consonantshow`,
          name: 'Consonant Showcase Board',
          activity_type_id: 25,
          config: {},
          sort_order: 1,
          attempt: null,
        },
        {
          id: `${lessonId}-consonantcol`,
          name: 'Consonant Collector Board',
          activity_type_id: 26,
          config: {},
          sort_order: 2,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('at family') || lowerTitle.includes('cat, bat, mat')) {
      return [
        {
          id: `${lessonId}-atfamily`,
          name: 'AT Family Constructor Board',
          activity_type_id: 28,
          config: { mode: 'AT' },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('an family') || lowerTitle.includes('man, fan, can')) {
      return [
        {
          id: `${lessonId}-anfamily`,
          name: 'AN Family Constructor Board',
          activity_type_id: 28,
          config: { mode: 'AN' },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('in family') || lowerTitle.includes('pin, tin, fin')) {
      return [
        {
          id: `${lessonId}-infamily`,
          name: 'IN Family Constructor Board',
          activity_type_id: 28,
          config: { mode: 'IN' },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('ot & og') || lowerTitle.includes('ot and og') || lowerTitle.includes('hot, dog')) {
      return [
        {
          id: `${lessonId}-otogfamily`,
          name: 'OT & OG Family Constructor Board',
          activity_type_id: 28,
          config: { mode: 'OT_OG' },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('mixed cvc') || lowerTitle.includes('cvc words review')) {
      return [
        {
          id: `${lessonId}-mixedcvc`,
          name: 'Mixed CVC Words Review Board',
          activity_type_id: 28,
          config: { mode: 'MIXED' },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    if (lowerTitle.includes('sight words')) {
      const deducedMode = (() => {
        if (lowerTitle.includes('i, am, is')) return 'I_AM_IS';
        if (lowerTitle.includes('a, the')) return 'A_THE';
        if (lowerTitle.includes('my, you')) return 'MY_YOU';
        if (lowerTitle.includes('this, that')) return 'THIS_THAT';
        if (lowerTitle.includes('here, there')) return 'HERE_THERE';
        return 'I_AM_IS';
      })();

      return [
        {
          id: `${lessonId}-sightwords`,
          name: 'Sight Words Montessori Puzzle',
          activity_type_id: 29,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Opposites Lesson Overrides
    if (lowerTitle.includes('big / small') || lowerTitle.includes('big and small') || 
        lowerTitle.includes('tall / short') || lowerTitle.includes('tall and short') ||
        lowerTitle.includes('hot / cold') || lowerTitle.includes('hot and cold') ||
        lowerTitle.includes('up / down') || lowerTitle.includes('up and down') ||
        lowerTitle.includes('open / close') || lowerTitle.includes('open and close') ||
        lowerTitle.includes('fast / slow') || lowerTitle.includes('fast and slow')) {
      
      const deducedMode = (() => {
        if (lowerTitle.includes('big')) return 'BIG_SMALL';
        if (lowerTitle.includes('tall')) return 'TALL_SHORT';
        if (lowerTitle.includes('hot')) return 'HOT_COLD';
        if (lowerTitle.includes('up')) return 'UP_DOWN';
        if (lowerTitle.includes('open')) return 'OPEN_CLOSE';
        if (lowerTitle.includes('fast')) return 'FAST_SLOW';
        return 'BIG_SMALL';
      })();

      return [
        {
          id: `${lessonId}-opposites`,
          name: 'Opposite Words Connector Game',
          activity_type_id: 30,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Naming Words Lesson Overrides
    if (lowerTitle.includes('animals') || lowerTitle.includes('birds') || 
        lowerTitle.includes('fruits') || lowerTitle.includes('vegetables') || 
        lowerTitle.includes('body parts') || lowerTitle.includes('family members') || 
        lowerTitle.includes('school objects')) {
      
      const deducedMode = (() => {
        if (lowerTitle.includes('animal')) return 'ANIMALS';
        if (lowerTitle.includes('bird')) return 'BIRDS';
        if (lowerTitle.includes('fruit')) return 'FRUITS';
        if (lowerTitle.includes('veg')) return 'VEGETABLES';
        if (lowerTitle.includes('body')) return 'BODY_PARTS';
        if (lowerTitle.includes('family')) return 'FAMILY';
        if (lowerTitle.includes('school')) return 'SCHOOL';
        return 'ANIMALS';
      })();

      return [
        {
          id: `${lessonId}-vocab`,
          name: 'Naming Words Matching Challenge',
          activity_type_id: 31,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }

    // High-priority Simple Grammar Lesson Overrides
    // Note: "Sight Words: this, that" is already caught earlier by the sight words override block,
    // so checking for this+that here is safe and only hits the grammar lesson "This / That".
    if (lowerTitle.includes('one & many') || lowerTitle.includes('one and many') ||
        lowerTitle.includes('male & female') || lowerTitle.includes('male and female') ||
        lowerTitle.includes('he / she') || lowerTitle.includes('he/she') ||
        (lowerTitle.includes('this') && lowerTitle.includes('that') && !lowerTitle.includes('sight'))) {

      const deducedMode = (() => {
        if (lowerTitle.includes('one')) return 'ONE_MANY';
        // Check THIS_THAT BEFORE male/female to avoid false 'his' match inside 'this'
        if (lowerTitle.includes('this') && lowerTitle.includes('that')) return 'THIS_THAT';
        if (lowerTitle.includes('he') && lowerTitle.includes('she')) return 'HE_SHE';
        if (lowerTitle.includes('male') || lowerTitle.includes('female')) return 'MALE_FEMALE';
        return 'ONE_MANY';
      })();

      return [
        {
          id: `${lessonId}-grammar`,
          name: 'Simple Grammar Challenge',
          activity_type_id: 32,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }

    // High-priority Sentence Formation Lesson Overrides
    if (lowerTitle.includes('two-word') || lowerTitle.includes('two word') ||
        lowerTitle.includes('three-word') || lowerTitle.includes('three word') ||
        lowerTitle.includes('four-word') || lowerTitle.includes('four word') ||
        lowerTitle.includes('reading simple sentences')) {

      const deducedMode = (() => {
        if (lowerTitle.includes('two')) return 'TWO_WORD';
        if (lowerTitle.includes('three')) return 'THREE_WORD';
        if (lowerTitle.includes('four')) return 'FOUR_WORD';
        if (lowerTitle.includes('reading')) return 'READING';
        return 'TWO_WORD';
      })();

      return [
        {
          id: `${lessonId}-sentence`,
          name: 'Sentence Builder Challenge',
          activity_type_id: 33,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Number Recognition Lesson Overrides
    if (lowerTitle.includes('number recognition 1 to 50') || lowerTitle.includes('number recognition 51 to 100')) {
      const deducedMode = lowerTitle.includes('1 to 50') ? '1_50' : '51_100';
      return [
        {
          id: `${lessonId}-numrec`,
          name: 'Number Recognition Game',
          activity_type_id: 34,
          config: { mode: deducedMode },
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Counting Objects Lesson Overrides
    if (lowerTitle.includes('counting objects')) {
      return [
        {
          id: `${lessonId}-countobj`,
          name: 'Counting Objects Game',
          activity_type_id: 35,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Count and Write Lesson Overrides
    if (lowerTitle.includes('count and write')) {
      return [
        {
          id: `${lessonId}-countwrite`,
          name: 'Count and Write Game',
          activity_type_id: 36,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Number Names Lesson Overrides
    if (lowerTitle.includes('number names')) {
      return [
        {
          id: `${lessonId}-numnames`,
          name: 'Number Names Game',
          activity_type_id: 37,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Missing Numbers Lesson Overrides
    if (lowerTitle.includes('missing numbers')) {
      return [
        {
          id: `${lessonId}-missingnums`,
          name: 'Missing Numbers Game',
          activity_type_id: 38,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Before After Between Lesson Overrides
    if (lowerTitle.includes('before, after and between') || lowerTitle.includes('before after between')) {
      return [
        {
          id: `${lessonId}-bab`,
          name: 'Before After Between Game',
          activity_type_id: 39,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Addition Using Objects Lesson Overrides
    if (lowerTitle.includes('addition using objects')) {
      return [
        {
          id: `${lessonId}-addobj`,
          name: 'Addition Using Objects Game',
          activity_type_id: 40,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Single Digit Addition Lesson Overrides
    if (lowerTitle.includes('single digit addition')) {
      return [
        {
          id: `${lessonId}-singleadd`,
          name: 'Single Digit Addition Game',
          activity_type_id: 41,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Number Bonds Lesson Overrides
    if (lowerTitle.includes('number bonds')) {
      return [
        {
          id: `${lessonId}-numbonds`,
          name: 'Number Bonds Game',
          activity_type_id: 42,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Taking Away Concept Lesson Overrides
    if (lowerTitle.includes('taking away concept') || lowerTitle.includes('taking away')) {
      return [
        {
          id: `${lessonId}-takeaway`,
          name: 'Taking Away Game',
          activity_type_id: 43,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Subtraction Using Objects Lesson Overrides
    if (lowerTitle.includes('subtraction using objects')) {
      return [
        {
          id: `${lessonId}-subobj`,
          name: 'Subtraction Using Objects Game',
          activity_type_id: 44,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Simple Subtraction Lesson Overrides
    if (lowerTitle.includes('simple subtraction')) {
      return [
        {
          id: `${lessonId}-simplesub`,
          name: 'Simple Subtraction Game',
          activity_type_id: 45,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Greater Than Smaller Than Lesson Overrides
    if (lowerTitle.includes('greater than') || lowerTitle.includes('smaller than') || lowerTitle.includes('greater than, smaller than')) {
      return [
        {
          id: `${lessonId}-greatersmaller`,
          name: 'Greater Than Smaller Than Game',
          activity_type_id: 46,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Equal Groups Lesson Overrides
    if (lowerTitle.includes('equal groups')) {
      return [
        {
          id: `${lessonId}-equalgroups`,
          name: 'Equal Groups Matcher Game',
          activity_type_id: 47,
          config: {},
          sort_order: 1,
          attempt: null,
        }
      ] as Activity[];
    }
    // High-priority Long and Short Lesson Overrides
    if (lowerTitle.includes('long and short') || lowerTitle.includes('long & short')) {
      return [{ id: `${lessonId}-longshort`, name: 'Long and Short Game', activity_type_id: 48, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Thick and Thin Lesson Overrides
    if (lowerTitle.includes('thick and thin') || lowerTitle.includes('thick & thin')) {
      return [{ id: `${lessonId}-thickthin`, name: 'Thick and Thin Game', activity_type_id: 49, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Heavy Light Full Empty Lesson Overrides
    if (lowerTitle.includes('heavy') || lowerTitle.includes('light') || lowerTitle.includes('full') || lowerTitle.includes('empty')) {
      return [{ id: `${lessonId}-heavylight`, name: 'Heavy Light Full Empty Game', activity_type_id: 50, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Flat Shapes (Rectangle & Oval) Lesson Overrides
    if (lowerTitle.includes('flat shapes') || (lowerTitle.includes('rectangle') && lowerTitle.includes('oval'))) {
      return [{ id: `${lessonId}-flatshapes`, name: 'Flat Shapes Game', activity_type_id: 51, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Special Shapes (Star & Diamond) Lesson Overrides
    if (lowerTitle.includes('special shapes') || (lowerTitle.includes('star') && lowerTitle.includes('diamond'))) {
      return [{ id: `${lessonId}-specialshapes`, name: 'Special Shapes Game', activity_type_id: 52, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Shape Puzzles Lesson Overrides
    if (lowerTitle.includes('shape puzzle') || lowerTitle.includes('shape puzzles')) {
      return [{ id: `${lessonId}-shapepuzzles`, name: 'Shape Puzzles Game', activity_type_id: 53, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Above / Below & Left / Right Lesson Overrides
    if (lowerTitle.includes('above / below') || lowerTitle.includes('above/below') || lowerTitle.includes('left / right') || lowerTitle.includes('left/right')) {
      return [{ id: `${lessonId}-abovebelowleftright`, name: 'Above Below Left Right Game', activity_type_id: 54, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Front / Behind & Near / Far Lesson Overrides
    if (lowerTitle.includes('front / behind') || lowerTitle.includes('front/behind') || lowerTitle.includes('near / far') || lowerTitle.includes('near/far')) {
      return [{ id: `${lessonId}-frontbehindnearfar`, name: 'Front Behind Near Far Game', activity_type_id: 55, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority AB and ABC Patterns Lesson Overrides
    if (lowerTitle.includes('ab and abc') || lowerTitle.includes('ab & abc') || lowerTitle.includes('ab and abc patterns')) {
      return [{ id: `${lessonId}-ababcpatterns`, name: 'AB and ABC Patterns Game', activity_type_id: 56, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Shape and Object Patterns Lesson Overrides
    if (lowerTitle.includes('shape and object') || lowerTitle.includes('shape & object') || (lowerTitle.includes('shape') && lowerTitle.includes('pattern') && !lowerTitle.includes('puzzle') && !lowerTitle.includes('special'))) {
      return [{ id: `${lessonId}-shapeobjectpatterns`, name: 'Shape and Object Patterns Game', activity_type_id: 57, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Sorting by Color and Shape Lesson Overrides
    if (lowerTitle.includes('sorting by color') || (lowerTitle.includes('sorting') && lowerTitle.includes('color') && lowerTitle.includes('shape'))) {
      return [{ id: `${lessonId}-sortingcolorshape`, name: 'Sorting by Color and Shape Game', activity_type_id: 58, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Sorting by Size and Quantity Lesson Overrides
    if (lowerTitle.includes('sorting by size') || (lowerTitle.includes('sorting') && lowerTitle.includes('size') && lowerTitle.includes('quantity'))) {
      return [{ id: `${lessonId}-sortingsizequantity`, name: 'Sorting by Size and Quantity Game', activity_type_id: 59, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Day / Night & Days of Week Lesson Overrides
    if (lowerTitle.includes('day / night') || lowerTitle.includes('day/night') || lowerTitle.includes('days of week') || lowerTitle.includes('days of the week')) {
      return [{ id: `${lessonId}-daynightdays`, name: 'Day / Night & Days of Week Game', activity_type_id: 60, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Months & Today / Tomorrow Lesson Overrides
    if (lowerTitle.includes('months') || lowerTitle.includes('today / tomorrow') || lowerTitle.includes('today/tomorrow') || lowerTitle.includes('months & today')) {
      return [{ id: `${lessonId}-monthstodaytomorrow`, name: 'Months & Today / Tomorrow Game', activity_type_id: 61, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Clock Recognition (O'clock) Lesson Overrides
    if (lowerTitle.includes('clock') || lowerTitle.includes('o\'clock')) {
      return [{ id: `${lessonId}-clockrecognition`, name: 'Clock Recognition Game', activity_type_id: 62, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Uyir Ezhuthukkal Intro Lesson Overrides
    if ((lowerTitle.includes('அறிமுகம்') && !lowerTitle.includes('ஈரெழுத்து') && !lowerTitle.includes('மூவெழுத்து')) || lowerTitle.includes('uyir ezhuthukkal') || lowerTitle.includes('அ - ஔ')) {
      return [{ id: `${lessonId}-uyirezhuthukkalintro`, name: 'Uyir Ezhuthukkal Intro Game', activity_type_id: 63, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Letter Order Lesson Overrides
    if (lowerTitle.includes('வரிசைமுறை') || lowerTitle.includes('letter order') || lowerTitle.includes('order')) {
      return [{ id: `${lessonId}-tamilletterorder`, name: 'Tamil Letter Order Game', activity_type_id: 64, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Mei Intro Lesson Overrides
    if (lowerTitle.includes('க் முதல் ன் வரை') || lowerTitle.includes('மெய்') || lowerTitle.includes('consonants') || lowerTitle.includes('mei ezhuthukkal')) {
      return [{ id: `${lessonId}-tamilmeiintro`, name: 'Tamil Mei Intro Game', activity_type_id: 65, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Sound Quiz Lesson Overrides
    if (lowerTitle.includes('ஒலி கேட்டுத் தேர்வு') || lowerTitle.includes('முதல் எழுத்து கண்டுபிடி') || lowerTitle.includes('ஒலி') || lowerTitle.includes('sound quiz') || lowerTitle.includes('sound test')) {
      return [{ id: `${lessonId}-tamilsoundquiz`, name: 'Tamil Sound Quiz', activity_type_id: 66, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Uyirmei Quiz 1 (க முதல் ன வரிசை)
    if (lowerTitle.includes('க முதல் ன வரிசை') || lowerTitle.includes('க முதல் ன')) {
      return [{ id: `${lessonId}-tamiluyirmei1`, name: 'Tamil Uyirmei Quiz 1', activity_type_id: 67, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Uyirmei Quiz 2 (கா முதல் னா வரிசை)
    if (lowerTitle.includes('கா முதல் னா வரிசை') || lowerTitle.includes('கா முதல் னா')) {
      return [{ id: `${lessonId}-tamiluyirmei2`, name: 'Tamil Uyirmei Quiz 2', activity_type_id: 68, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Word Builder (எழுத்து சேர்த்தல்)
    if (lowerTitle.includes('எழுத்து சேர்த்தல்') || lowerTitle.includes('மரம்') || lowerTitle.includes('கல்') || lowerTitle.includes('சேர்த்தல்')) {
      return [{ id: `${lessonId}-tamilwordbuilder`, name: 'Tamil Word Builder', activity_type_id: 69, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Two Letter Words (ஈரெழுத்து சொற்கள் அறிமுகம்)
    if (lowerTitle.includes('ஈரெழுத்து') || lowerTitle.includes('two letter') || lowerTitle.includes('two-letter')) {
      return [{ id: `${lessonId}-tamiltwoletter`, name: 'Tamil Two Letter Words', activity_type_id: 70, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }
    // High-priority Tamil Three Letter Words (மூவெழுத்து சொற்கள் அறிமுகம்)
    if (lowerTitle.includes('மூவெழுத்து') || lowerTitle.includes('three letter') || lowerTitle.includes('three-letter')) {
      return [{ id: `${lessonId}-tamilthreeletter`, name: 'Tamil Three Letter Words', activity_type_id: 71, config: {}, sort_order: 1, attempt: null }] as Activity[];
    }

    const isEnglish = subjectName?.toLowerCase().includes('english') || lessonTitle.toLowerCase().includes('letter');
    const isUKG = studentProfile?.grade_name?.toUpperCase() === 'UKG';

    if (isUKG && isEnglish) {
      if (lowerTitle.includes('capital letters')) {
        return [
          {
            id: `${lessonId}-board`,
            name: 'A-Z Capitals Sound Board',
            activity_type_id: 14,
            config: { capital: true },
            sort_order: 1,
            attempt: null,
          },
          {
            id: `${lessonId}-find`,
            name: 'Find the Capital Letter',
            activity_type_id: 13,
            config: {
              mode: 'beginning_sound',
              letters: ['A', 'B', 'C', 'D', 'E', 'F'],
            },
            sort_order: 2,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('small letters')) {
        return [
          {
            id: `${lessonId}-board`,
            name: 'a-z Small Letters Sound Board',
            activity_type_id: 14,
            config: { capital: false },
            sort_order: 1,
            attempt: null,
          },
          {
            id: `${lessonId}-memory`,
            name: 'Capital to Small Memory Match',
            activity_type_id: 15,
            config: {
              pairs: [
                { a: 'A', b: 'a' },
                { a: 'B', b: 'b' },
                { a: 'C', b: 'c' },
                { a: 'D', b: 'd' }
              ]
            },
            sort_order: 2,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('matching')) {
        return [
          {
            id: `${lessonId}-match`,
            name: 'Capital & Small Match Yes/No Quiz',
            activity_type_id: 16,
            config: {},
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('missing')) {
        return [
          {
            id: `${lessonId}-missing`,
            name: 'Missing Letters Sequence Quest',
            activity_type_id: 17,
            config: {},
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('starting') || lowerTitle.includes('beginning')) {
        return [
          {
            id: `${lessonId}-starting`,
            name: 'Starting Letter Dino Feast',
            activity_type_id: 21,
            config: {},
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('ending')) {
        return [
          {
            id: `${lessonId}-ending`,
            name: 'Ending Letter Connect Quiz',
            activity_type_id: 21,
            config: {
              mode: 'ending',
            },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }

      if (lowerTitle.includes('recognition') || lowerTitle.includes('picture & letter')) {
        return [
          {
            id: `${lessonId}-gridmatch`,
            name: 'Picture & Letter Grid Finder',
            activity_type_id: 22,
            config: {},
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('phonics') || lowerTitle.includes('sound')) {
        return [
          {
            id: `${lessonId}-builder`,
            name: 'Word Builder Starting Letters Quest',
            activity_type_id: 18,
            config: {},
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
    }

    if (rawActivities.length > 0) {
      return rawActivities;
    }

    if (isEnglish) {
      const lowerTitle = lessonTitle.toLowerCase();
      if (lowerTitle.includes('pop') && lowerTitle.includes('balloon')) {
        return [
          {
            id: `${lessonId}-pop`,
            name: 'Pop the Balloon',
            activity_type_id: 12,
            config: {
              letters: ['A', 'B', 'C', 'D', 'E', 'F'],
            },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('pick') && lowerTitle.includes('card')) {
        return [
          {
            id: `${lessonId}-pick`,
            name: 'Pick the Card',
            activity_type_id: 13,
            config: {
              letters: ['A', 'B', 'C', 'D', 'E', 'F'],
            },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.startsWith('letter ') && lowerTitle.includes(' - ')) {
        const match = lessonTitle.match(/Letter\s+([A-Za-z])/i);
        const letter = match ? match[1].toUpperCase() : '';
        if (letter) {
          const letterData = getLetterData(letter);
          return [
            {
              id: `${lessonId}-showcase`,
              name: `Showcase: Letter ${letter}`,
              activity_type_id: 5,
              config: {
                letter,
                word: letterData.word,
                emoji: letterData.emoji,
                color: letterData.color,
              },
              sort_order: 1,
              attempt: null,
            }
          ] as Activity[];
        }
      }
      if (lowerTitle.includes('small') && lowerTitle.includes('a-m')) {
        return [
          {
            id: `${lessonId}-showcase`,
            name: 'Small Letters a-m Showcase',
            activity_type_id: 5,
            config: { family: true, set: 'a-m' },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('small') && lowerTitle.includes('n-z')) {
        return [
          {
            id: `${lessonId}-showcase`,
            name: 'Small Letters n-z Showcase',
            activity_type_id: 5,
            config: { family: true, set: 'n-z' },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('phonics')) {
        const parts = lessonTitle.split(':');
        const familySet = parts[1] ? parts[1].trim().replace(/\s+/g, '') : 'at,am,an';
        return [
          {
            id: `${lessonId}-phonics`,
            name: lessonTitle,
            activity_type_id: 5,
            config: { family: true, path: familySet },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
      if (lowerTitle.includes('star') || lowerTitle.includes('johnny') || lowerTitle.includes('rain') || lowerTitle.includes('sheep') || lowerTitle.includes('humpty') || lowerTitle.includes('jack') || lowerTitle.includes('lion') || lowerTitle.includes('crow') || lowerTitle.includes('hare') || lowerTitle.includes('duckling') || lowerTitle.includes('gingerbread') || lowerTitle.includes('riding')) {
        return [
          {
            id: `${lessonId}-rhyme`,
            name: lessonTitle,
            activity_type_id: 5,
            config: { path: lowerTitle.replace(/[^a-z0-9]/g, '-') },
            sort_order: 1,
            attempt: null,
          }
        ] as Activity[];
      }
    }
    return rawActivities;
  }, [rawActivities, lessonId, lessonTitle, subjectName]);

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
      progressMutation.mutate(undefined);
      onComplete();
    }

    // Submit attempt in background using real DB activity ID if available
    let targetActivityId = activityId;
    if (rawActivities && rawActivities.length > 0) {
      const rawAct = rawActivities[currentIndex] || rawActivities[0];
      if (rawAct) {
        targetActivityId = rawAct.id;
      }
    }

    submitMutation.mutate({ activityId: targetActivityId, body: data });
  }, [submitMutation, completedIds, currentIndex, activities, progressMutation, onComplete, rawActivities]);

  const isMathSubject = subjectName?.toLowerCase().includes('math') || subjectName?.toLowerCase().includes('கணிதம்');

  const getPreMathConceptKey = () => {
    if (!isMathSubject) return null;
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
    if (!isMathSubject) return null;
    const lower = lessonTitle.toLowerCase();
    
    // Bypass for UKG Advanced shapes, position, pattern, and sorting lessons to let them play custom new quizzes
    // Bypass for UKG Advanced shapes, position, pattern, sorting, and time lessons to let them play custom new quizzes
    if (lower.includes('oval') || lower.includes('special shapes') || lower.includes('puzzle') ||
        lower.includes('above / below') || lower.includes('above/below') ||
        lower.includes('front / behind') || lower.includes('front/behind') ||
        lower.includes('pattern') || lower.includes('patterns') ||
        lower.includes('sorting') || lower.includes('classification') ||
        lower.includes('day') || lower.includes('night') || lower.includes('months') || lower.includes('clock') || lower.includes('tomorrow')) {
      return null;
    }

    if (lower.includes('circle') && lower.includes('square')) return 'circle-square';
    if (lower.includes('triangle') || lower.includes('rectangle')) return 'triangle-rectangle';
    if (lower.includes('around')) return 'shapes-around';
    if (lower.includes('detective') || lower.includes('find')) return 'find-shape';
    if (lower.includes('shape') && lower.includes('sort')) return 'shape-sorting';
    if (lower.includes('above') || lower.includes('below')) return 'above-below';
    if (lower.includes('top') || lower.includes('bottom')) return 'top-bottom';
    if (lower.includes('left') || lower.includes('right')) return 'left-right';
    if (lower.includes('near') || lower.includes('far')) return 'near-far';
    if (lower.includes('open') || lower.includes('close')) return 'open-close';
    if (lower.includes('color') && lower.includes('pattern')) return 'color-patterns';
    if (lower.includes('shape') && lower.includes('pattern')) return 'shape-patterns';
    if (lower.includes('number') && lower.includes('pattern')) return 'number-patterns';
    if (lower.includes('pattern')) return 'color-patterns';
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
    if (!isMathSubject) return null;
    const isUKG = studentProfile?.grade_name?.toUpperCase() === 'UKG';
    if (isUKG) return null;
    const lower = lessonTitle.toLowerCase();
    if (lower.includes('10')) return null;
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
    if (!isMathSubject) return null;
    const isUKG = studentProfile?.grade_name?.toUpperCase() === 'UKG';
    if (isUKG) return null;
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
    if (!isMathSubject) return null;
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
        return <LetterFindGame config={act.config as any} {...commonProps} />;
      case 'balloon_pop':
        return <BalloonPop config={act.config as any} {...commonProps} />;
      case 'name':
        return <NameTraceActivity config={act.config} studentName={act.config?.name as string} {...commonProps} />;
      case 'vowel_quiz':
        {
          const isEnglishSubject = subjectName?.toLowerCase().includes('english') || lessonTitle.toLowerCase().includes('letter') || lessonTitle.toLowerCase().includes('vowel');
          if (isEnglishSubject) {
            return <VowelCollectorQuiz {...commonProps} />;
          }
          return <TamilVowelQuiz config={act.config} {...commonProps} />;
        }
      case 'mei_quiz':
        return <TamilMeiQuiz config={act.config} {...commonProps} />;
      case 'word_showcase':
        return <TamilWordShowcase config={act.config} {...commonProps} />;
      case 'alphabet_board':
        return <AlphabetBoard capital={!!act.config?.capital} {...commonProps} />;
      case 'memory_match':
        return <MemoryMatch config={act.config as any} {...commonProps} />;
      case 'letter_match_quiz':
        return <LetterMatchQuiz {...commonProps} />;
      case 'missing_letters_quiz':
        return <MissingLettersQuiz {...commonProps} />;
      case 'word_builder_quiz':
        return <WordBuilderQuiz {...commonProps} />;
      case 'letter_drag_fill_quiz':
        return <LetterDragFillQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'word_sorter_quiz':
        return <WordSorterQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'feed_mascot_quiz':
        return <FeedMascotQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'grid_finder_match':
        return <GridFinderMatch {...commonProps} />;
      case 'vowel_collector_quiz':
        return <VowelCollectorQuiz {...commonProps} />;
      case 'vowel_showcase_quiz':
        return <VowelShowcase {...commonProps} />;
      case 'consonant_showcase_quiz':
        return <ConsonantShowcase {...commonProps} />;
      case 'consonant_collector_quiz':
        return <ConsonantCollectorQuiz {...commonProps} />;
      case 'vowels_in_words_quiz':
        return <VowelsInWordsQuiz {...commonProps} />;
      case 'word_family_quiz':
        return <WordFamilyQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'sight_words_quiz':
        return <SightWordsQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'opposites_quiz':
        return <OppositesQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'vocabulary_quiz':
        return <VocabularyQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'simple_grammar_quiz':
        return <SimpleGrammarQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'sentence_builder_quiz':
        return <SentenceBuilderQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'number_recognition_quiz':
        return <NumberRecognitionQuiz mode={act.config?.mode as any} {...commonProps} />;
      case 'counting_objects_quiz':
        return <CountingObjectsQuiz {...commonProps} />;
      case 'count_and_write_quiz':
        return <CountAndWriteQuiz {...commonProps} />;
      case 'number_names_quiz':
        return <NumberNamesQuiz {...commonProps} />;
      case 'missing_numbers_quiz':
        return <MissingNumbersQuiz {...commonProps} />;
      case 'before_after_between_quiz':
        return <BeforeAfterBetweenQuiz {...commonProps} />;
      case 'addition_objects_quiz':
        return <AdditionObjectsQuiz {...commonProps} />;
      case 'single_digit_addition_quiz':
        return <SingleDigitAdditionQuiz {...commonProps} />;
      case 'number_bonds_quiz':
        return <NumberBondsQuiz {...commonProps} />;
      case 'taking_away_quiz':
        return <TakingAwayQuiz {...commonProps} />;
      case 'subtraction_objects_quiz':
        return <SubtractionObjectsQuiz {...commonProps} />;
      case 'simple_subtraction_quiz':
        return <SimpleSubtractionQuiz {...commonProps} />;
      case 'greater_smaller_quiz':
        return <GreaterSmallerQuiz {...commonProps} />;
      case 'equal_groups_quiz':
        return <EqualGroupsQuiz {...commonProps} />;
      case 'long_and_short_quiz':
        return <LongAndShortQuiz {...commonProps} />;
      case 'thick_and_thin_quiz':
        return <ThickAndThinQuiz {...commonProps} />;
      case 'heavy_light_full_empty_quiz':
        return <HeavyLightFullEmptyQuiz {...commonProps} />;
      case 'flat_shapes_quiz':
        return <FlatShapesQuiz {...commonProps} />;
      case 'special_shapes_quiz':
        return <SpecialShapesQuiz {...commonProps} />;
      case 'shape_puzzles_quiz':
        return <ShapePuzzlesQuiz {...commonProps} />;
      case 'above_below_left_right_quiz':
        return <AboveBelowLeftRightQuiz {...commonProps} />;
      case 'front_behind_near_far_quiz':
        return <FrontBehindNearFarQuiz {...commonProps} />;
      case 'ab_abc_patterns_quiz':
        return <AbAbcPatternsQuiz {...commonProps} />;
      case 'shape_object_patterns_quiz':
        return <ShapeObjectPatternsQuiz {...commonProps} />;
      case 'sorting_color_shape_quiz':
        return <SortingColorShapeQuiz {...commonProps} />;
      case 'sorting_size_quantity_quiz':
        return <SortingSizeQuantityQuiz {...commonProps} />;
      case 'day_night_days_quiz':
        return <DayNightDaysQuiz {...commonProps} />;
      case 'months_today_tomorrow_quiz':
        return <MonthsTodayTomorrowQuiz {...commonProps} />;
      case 'clock_recognition_quiz':
        return <ClockRecognitionQuiz {...commonProps} />;
      case 'uyir_ezhuthukkal_intro_quiz':
        return <UyirEzhuthukkalIntroQuiz {...commonProps} />;
      case 'tamil_letter_order_quiz':
        return <TamilLetterOrderQuiz {...commonProps} />;
      case 'tamil_mei_intro_quiz':
        return <TamilMeiIntroQuiz {...commonProps} />;
      case 'tamil_sound_quiz':
        return <TamilSoundQuiz {...commonProps} />;
      case 'tamil_uyirmei_quiz1':
        return <TamilUyirmeiQuiz1 {...commonProps} />;
      case 'tamil_uyirmei_quiz2':
        return <TamilUyirmeiQuiz2 {...commonProps} />;
      case 'tamil_word_builder_quiz':
        return <TamilWordBuilderQuiz lessonTitle={lessonTitle} {...commonProps} />;
      case 'tamil_two_letter_words_quiz':
        return <TamilTwoLetterWordsQuiz {...commonProps} />;
      case 'tamil_three_letter_words_quiz':
        return <TamilThreeLetterWordsQuiz {...commonProps} />;
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="relative w-full max-w-lg sm:max-w-2xl max-h-[92vh] flex flex-col overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
        {/* Playful background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
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
        <div className="relative z-10 p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-center">
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
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <div className="w-10 h-10 rounded-full border-[3px] border-indigo-600/20 border-t-indigo-600 animate-spin mx-auto" />
                  <p className="text-sm font-bold text-slate-500 font-sans mt-2">
                    {isTamil ? 'சேமிக்கப்படுகிறது...' : 'Saving progress...'}
                  </p>
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
