import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Insert the shuffledOptions hook before unlockedLevels
    hook_target = "  // Dynamically compute unlocked quiz levels based on completed chapters in Database"
    hook_code = """  // Shuffle options for the current question to avoid predictable choices (e.g. Option 1 always being correct)
  const shuffledOptions = useMemo(() => {
    if (!activeLevel) return [];
    const question = activeLevel.questions[currentQuestionIndex];
    if (!question || !question.options) return [];
    // Perform a seed-stable or simple shuffle when question index changes
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [activeLevel, currentQuestionIndex]);

"""
    
    if hook_target in content and "const shuffledOptions" not in content:
        content = content.replace(hook_target, hook_code + hook_target)
        print("Hook injected successfully!")
    else:
        print("Hook target not found or already injected.")

    # 2. Replace question.options.map with shuffledOptions.map globally
    if "question.options.map" in content:
        content = content.replace("question.options.map", "shuffledOptions.map")
        print("Replaced question.options.map with shuffledOptions.map globally.")
    else:
        print("No occurrences of question.options.map found.")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print("File written successfully!")

if __name__ == "__main__":
    main()
