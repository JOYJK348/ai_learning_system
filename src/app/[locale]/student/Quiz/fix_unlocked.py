import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace 'const unlocked: number[] = [];' with 'const unlocked: number[] = [1];'
    content = content.replace("const unlocked: number[] = [];", "const unlocked: number[] = [1];")

    # Replace the unlocked.push(1) blocks with 'return Array.from(new Set(unlocked));'
    target_pattern = """      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;"""
      
    # Clean formatting variations
    content = content.replace(target_pattern, "      return Array.from(new Set(unlocked));")
    
    # Also check without indent or slight format differences
    target_pattern2 = """      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;""".replace("      ", "    ")
    content = content.replace(target_pattern2, "    return Array.from(new Set(unlocked));")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print("Unlocked levels calculation fixed for all subjects!")

if __name__ == "__main__":
    main()
