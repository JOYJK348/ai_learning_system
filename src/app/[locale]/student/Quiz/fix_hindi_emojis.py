import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the professional lines replacements for Hindi Level 1
    old_block = """      {
        type: 'choice',
        instruction: 'What does a Standing Line look like?',
        instructionTa: 'खड़ी रेखा (Standing Line) कैसी दिखती है? 📏',
        options: [
          { text: '| (Standing)', emoji: '📏', correct: true },
          { text: '— (Sleeping)', emoji: '📏', correct: false },
          { text: '/ (Slanting)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Standing Line stroke',
        instructionTa: 'खड़ी रेखा (Standing Line) को बोर्ड पर लिखें! ✏️',
        letter: '।',
        options: []
      },
      {
        type: 'choice',
        instruction: 'What does a Sleeping Line look like?',
        instructionTa: 'लेटी रेखा (Sleeping Line) कैसी दिखती है? 📏',
        options: [
          { text: '— (Sleeping)', emoji: '📏', correct: true },
          { text: '| (Standing)', emoji: '📏', correct: false },
          { text: '/ (Slanting)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Sleeping Line stroke',
        instructionTa: 'लेटी रेखा (Sleeping Line) को बोर्ड पर लिखें! ✏️',
        letter: '—',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'Complete the pattern:',
        instructionTa: 'पैटर्न को पूरा करें! 🧩',
        sequence: ['।', '—', '।', '_'],
        options: [
          { text: '—', correct: true },
          { text: '।', correct: false },
          { text: '/', correct: false }
        ]
      }"""

    new_block = """      {
        type: 'choice',
        instruction: 'What does a Standing Line look like?',
        instructionTa: 'खड़ी रेखा (Standing Line) कैसी दिखती है? ✏️',
        options: [
          { text: 'Standing Line', emoji: '┃', correct: true },
          { text: 'Sleeping Line', emoji: '━', correct: false },
          { text: 'Slanting Line', emoji: '╱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Standing Line stroke',
        instructionTa: 'खड़ी रेखा (Standing Line) को बोर्ड पर लिखें! ✏️',
        letter: '┃',
        options: []
      },
      {
        type: 'choice',
        instruction: 'What does a Sleeping Line look like?',
        instructionTa: 'लेटी रेखा (Sleeping Line) कैसी दिखती है? ✏️',
        options: [
          { text: 'Sleeping Line', emoji: '━', correct: true },
          { text: 'Standing Line', emoji: '┃', correct: false },
          { text: 'Slanting Line', emoji: '╱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Sleeping Line stroke',
        instructionTa: 'लेटी रेखा (Sleeping Line) को बोर्ड पर लिखें! ✏️',
        letter: '━',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'Complete the pattern:',
        instructionTa: 'पैटर्न को पूरा करें! 🧩',
        sequence: ['┃', '━', '┃', '_'],
        options: [
          { text: '━ (Sleeping)', correct: true },
          { text: '┃ (Standing)', correct: false },
          { text: '╱ (Slanting)', correct: false }
        ]
      }"""

    if old_block in content:
        content = content.replace(old_block, new_block)
        print("Pre-writing stroke emojis replaced with professional line drawings!")
    else:
        # Try split match or backup search
        print("Target block for stroke questions not found exactly.")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    main()
