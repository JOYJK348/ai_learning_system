import sys

def modify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    evs_levels = """
const EVS_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Myself',
    titleEn: 'About Me',
    mascot: '🧍',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which item belongs to YOU?',
        instructionTa: 'உங்களுக்குரிய பொருள் எது? 🎒',
        options: [
          { text: 'School Bag', emoji: '🎒', correct: true },
          { text: 'Car', emoji: '🚗', correct: false },
          { text: 'Office Laptop', emoji: '💻', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do you use to brush your teeth?',
        instructionTa: 'பற்களைத் துலக்க எதைப் பயன்படுத்துவீர்கள்? 🪥',
        options: [
          { text: 'Toothbrush', emoji: '🪥', correct: true },
          { text: 'Comb', emoji: '🪮', correct: false },
          { text: 'Spoon', emoji: '🥄', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which body part do we use to WALK?',
        instructionTa: 'நடக்க உதவும் உடல் உறுப்பு எது? 🚶',
        options: [
          { text: 'Legs', emoji: '🦵', correct: true },
          { text: 'Nose', emoji: '👃', correct: false },
          { text: 'Ears', emoji: '👂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we do when we are HUNGRY?',
        instructionTa: 'பசிக்கும்போது நாம் என்ன செய்வோம்? 😋',
        options: [
          { text: 'Eat Food', emoji: '🍱', correct: true },
          { text: 'Sleep', emoji: '🛏️', correct: false },
          { text: 'Cry', emoji: '😭', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a healthy morning habit?',
        instructionTa: 'காலை எழுந்தவுடன் செய்யும் நல்ல பழக்கம் எது? 🌅',
        options: [
          { text: 'Wake up early', emoji: '⏰', correct: true },
          { text: 'Watch TV', emoji: '📺', correct: false },
          { text: 'Eat junk food', emoji: '🍟', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'My Family & Home',
    titleEn: 'Family Members & House',
    mascot: '🏠',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Who cooks food at home?',
        instructionTa: 'வீட்டில் சமைப்பவர் யார்? 🍳',
        options: [
          { text: 'Mother', emoji: '👩', correct: true },
          { text: 'Dog', emoji: '🐶', correct: false },
          { text: 'Baby', emoji: '👶', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do we sleep?',
        instructionTa: 'நாம் எங்கே தூங்குவோம்? 🛏️',
        options: [
          { text: 'Bedroom', emoji: '🛏️', correct: true },
          { text: 'Kitchen', emoji: '🍳', correct: false },
          { text: 'Garden', emoji: '🌳', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who is your father\\'s father?',
        instructionTa: 'அப்பாவின் அப்பா உங்களுக்கு யார்? 👴',
        options: [
          { text: 'Grandpa', emoji: '👴', correct: true },
          { text: 'Brother', emoji: '👦', correct: false },
          { text: 'Uncle', emoji: '👨', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do we take a bath?',
        instructionTa: 'நாம் எங்கே குளிப்போம்? 🚿',
        options: [
          { text: 'Bathroom', emoji: '🛁', correct: true },
          { text: 'Living Room', emoji: '🛋️', correct: false },
          { text: 'Roof', emoji: '🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who helps you with homework?',
        instructionTa: 'பாடங்கள் படிக்க உதவுபவர் யார்? 📚',
        options: [
          { text: 'Parents', emoji: '👨‍👩‍👧', correct: true },
          { text: 'Monkey', emoji: '🐒', correct: false },
          { text: 'Table', emoji: '🪑', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Animals Around Us',
    titleEn: 'Pets & Wild Animals',
    mascot: '🐾',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which animal gives us milk?',
        instructionTa: 'நமக்கு பால் தரும் விலங்கு எது? 🥛',
        options: [
          { text: 'Cow', emoji: '🐄', correct: true },
          { text: 'Lion', emoji: '🦁', correct: false },
          { text: 'Dog', emoji: '🐶', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a WILD animal?',
        instructionTa: 'இவற்றில் காட்டு விலங்கு எது? 🌳',
        options: [
          { text: 'Tiger', emoji: '🐅', correct: true },
          { text: 'Cat', emoji: '🐱', correct: false },
          { text: 'Goat', emoji: '🐐', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which animal has a long TRUNK?',
        instructionTa: 'நீண்ட தும்பிக்கை உள்ள விலங்கு எது? 🐘',
        options: [
          { text: 'Elephant', emoji: '🐘', correct: true },
          { text: 'Rabbit', emoji: '🐰', correct: false },
          { text: 'Mouse', emoji: '🐭', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which bird can SWIM in water?',
        instructionTa: 'நீரில் நீந்தும் பறவை எது? 🦆',
        options: [
          { text: 'Duck', emoji: '🦆', correct: true },
          { text: 'Crow', emoji: '🐦‍⬛', correct: false },
          { text: 'Eagle', emoji: '🦅', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does a dog say?',
        instructionTa: 'நாய் எப்படிக் கத்தும்? 🐶',
        options: [
          { text: 'Bow Bow', emoji: '🐶', correct: true },
          { text: 'Meow', emoji: '🐱', correct: false },
          { text: 'Moo', emoji: '🐄', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Plants & Nature',
    titleEn: 'Trees, Flowers & Leaves',
    mascot: '🌳',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What color are the leaves?',
        instructionTa: 'இலைகளின் நிறம் என்ன? 🍃',
        options: [
          { text: 'Green', emoji: '🟩', correct: true },
          { text: 'Blue', emoji: '🟦', correct: false },
          { text: 'Red', emoji: '🟥', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a beautiful FLOWER?',
        instructionTa: 'அழகான பூ எது? 🌸',
        options: [
          { text: 'Rose', emoji: '🌹', correct: true },
          { text: 'Stone', emoji: '🪨', correct: false },
          { text: 'Book', emoji: '📖', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What gives us LIGHT during the day?',
        instructionTa: 'பகலில் வெளிச்சம் தருவது எது? ☀️',
        options: [
          { text: 'Sun', emoji: '☀️', correct: true },
          { text: 'Moon', emoji: '🌙', correct: false },
          { text: 'Star', emoji: '⭐', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which fruit is YELLOW and long?',
        instructionTa: 'மஞ்சள் நிறத்தில் நீளமாக இருக்கும் பழம் எது? 🍌',
        options: [
          { text: 'Banana', emoji: '🍌', correct: true },
          { text: 'Apple', emoji: '🍎', correct: false },
          { text: 'Grapes', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do fishes live?',
        instructionTa: 'மீன்கள் எங்கே வாழும்? 🐟',
        options: [
          { text: 'Water', emoji: '🌊', correct: true },
          { text: 'Tree', emoji: '🌳', correct: false },
          { text: 'Sand', emoji: '🏖️', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Transport',
    titleEn: 'Vehicles',
    mascot: '🚌',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which vehicle FLIES in the sky?',
        instructionTa: 'வானத்தில் பறக்கும் வாகனம் எது? ✈️',
        options: [
          { text: 'Aeroplane', emoji: '✈️', correct: true },
          { text: 'Car', emoji: '🚗', correct: false },
          { text: 'Train', emoji: '🚂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which vehicle has TWO wheels?',
        instructionTa: 'இரண்டு சக்கர வாகனம் எது? 🚲',
        options: [
          { text: 'Bicycle', emoji: '🚲', correct: true },
          { text: 'Bus', emoji: '🚌', correct: false },
          { text: 'Truck', emoji: '🚚', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which vehicle moves on WATER?',
        instructionTa: 'தண்ணீரில் செல்லும் வாகனம் எது? 🚢',
        options: [
          { text: 'Boat', emoji: '⛵', correct: true },
          { text: 'Train', emoji: '🚂', correct: false },
          { text: 'Helicopter', emoji: '🚁', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What vehicle stops at a RED light?',
        instructionTa: 'சிவப்பு விளக்கு எரிந்தால் எந்த வாகனம் நிற்கும்? 🚥',
        options: [
          { text: 'Car', emoji: '🚗', correct: true },
          { text: 'Aeroplane', emoji: '✈️', correct: false },
          { text: 'Boat', emoji: '⛵', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the LONGEST vehicle?',
        instructionTa: 'மிகவும் நீளமான வாகனம் எது? 🚂',
        options: [
          { text: 'Train', emoji: '🚂', correct: true },
          { text: 'Auto', emoji: '🛺', correct: false },
          { text: 'Cycle', emoji: '🚲', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Good Habits',
    titleEn: 'Healthy & Safe',
    mascot: '🍎',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What should we do BEFORE eating?',
        instructionTa: 'சாப்பிடும் முன் நாம் என்ன செய்ய வேண்டும்? 🧼',
        options: [
          { text: 'Wash Hands', emoji: '🧼', correct: true },
          { text: 'Play with Mud', emoji: '⚽', correct: false },
          { text: 'Sleep', emoji: '🛏️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is HEALTHY food?',
        instructionTa: 'ஆரோக்கியமான உணவு எது? 🍎',
        options: [
          { text: 'Apple', emoji: '🍎', correct: true },
          { text: 'Chocolate', emoji: '🍫', correct: false },
          { text: 'Ice Cream', emoji: '🍦', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What should we do EVERY DAY?',
        instructionTa: 'நாம் தினமும் செய்ய வேண்டியது என்ன? 🪥',
        options: [
          { text: 'Brush Teeth', emoji: '🪥', correct: true },
          { text: 'Eat Mud', emoji: '🏖️', correct: false },
          { text: 'Fight', emoji: '🤼', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where should we throw waste?',
        instructionTa: 'குப்பையை எங்கே போட வேண்டும்? 🗑️',
        options: [
          { text: 'Dustbin', emoji: '🗑️', correct: true },
          { text: 'Floor', emoji: '🧹', correct: false },
          { text: 'Bed', emoji: '🛏️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'When should we SLEEP?',
        instructionTa: 'நாம் எப்போது தூங்க வேண்டும்? 🌙',
        options: [
          { text: 'At Night', emoji: '🌙', correct: true },
          { text: 'During Class', emoji: '🏫', correct: false },
          { text: 'While Eating', emoji: '🍱', correct: false }
        ]
      }
    ]
  }
];
"""

    start_idx = content.find("const EVS_LEVELS: Level[] = [")
    end_idx = content.find("const MATH_LEVELS: Level[] = [")

    if start_idx != -1 and end_idx != -1:
        content = content[:start_idx] + evs_levels + "\n" + content[end_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Modifications done!")

if __name__ == '__main__':
    modify_file(r'd:\FreeLance\AI-LearningPortal\frontend\src\app\[locale]\student\Quiz\page.tsx')
