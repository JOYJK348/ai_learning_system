const fs = require('fs');
const path = require('path');

const pageFilePath = path.join(__dirname, '../src/app/[locale]/student/Quiz/page.tsx');
const dataFilePath = path.join(__dirname, '../src/app/[locale]/student/Quiz/quizData.ts');

if (!fs.existsSync(pageFilePath)) {
  console.error("page.tsx not found at: ", pageFilePath);
  process.exit(1);
}

const content = fs.readFileSync(pageFilePath, 'utf8');

// Find the start: type Option = {
const startIndex = content.indexOf('type Option = {');
if (startIndex === -1) {
  console.error("Could not find start index 'type Option = {'");
  process.exit(1);
}

// Find the end: // ─── HELPERS ───
const endIndex = content.indexOf('// ─── HELPERS ───');
if (endIndex === -1) {
  console.error("Could not find end index '// ─── HELPERS ───'");
  process.exit(1);
}

// Slice the data block
const dataBlock = content.slice(startIndex, endIndex);

// Format the data file content
// We need to add "export" before Option, Question, Level types and the levels arrays:
// TAMIL_LEVELS, ENGLISH_LEVELS, EVS_LEVELS, MATH_LEVELS, GK_LEVELS, HINDI_LEVELS.
let dataContent = dataBlock
  .replace('type Option =', 'export type Option =')
  .replace('type Question =', 'export type Question =')
  .replace('type Level =', 'export type Level =')
  .replace('const TAMIL_LEVELS: Level[] =', 'export const TAMIL_LEVELS: Level[] =')
  .replace('const ENGLISH_LEVELS: Level[] =', 'export const ENGLISH_LEVELS: Level[] =')
  .replace('const EVS_LEVELS: Level[] =', 'export const EVS_LEVELS: Level[] =')
  .replace('const MATH_LEVELS: Level[] =', 'export const MATH_LEVELS: Level[] =')
  .replace('const GK_LEVELS: Level[] =', 'export const GK_LEVELS: Level[] =')
  .replace('const HINDI_LEVELS: Level[] =', 'export const HINDI_LEVELS: Level[] =');

// Write the new quizData.ts
fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log("Successfully created quizData.ts at: ", dataFilePath);

// Now, construct the new page.tsx content
// We will replace the block from startIndex to endIndex with the import statement
const importStatement = `import {\n  Option,\n  Question,\n  Level,\n  TAMIL_LEVELS,\n  ENGLISH_LEVELS,\n  EVS_LEVELS,\n  MATH_LEVELS,\n  GK_LEVELS,\n  HINDI_LEVELS\n} from './quizData';\n\n`;

const newPageContent = content.slice(0, startIndex) + importStatement + content.slice(endIndex);

fs.writeFileSync(pageFilePath, newPageContent, 'utf8');
console.log("Successfully refactored page.tsx at: ", pageFilePath);
