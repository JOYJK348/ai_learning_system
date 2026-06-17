import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/_components/activities/PreWritingVideo.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add isTamil prop
content = content.replace(
    "type Props = {\r\n  config?: { path?: string; color?: string };\r\n  onComplete:",
    "type Props = {\r\n  isTamil?: boolean;\r\n  config?: { path?: string; color?: string };\r\n  onComplete:"
)
content = content.replace(
    "type Props = {\n  config?: { path?: string; color?: string };\n  onComplete:",
    "type Props = {\n  isTamil?: boolean;\n  config?: { path?: string; color?: string };\n  onComplete:"
)

content = content.replace("export default function PreWritingVideo({ config, onComplete }: Props) {", "export default function PreWritingVideo({ isTamil, config, onComplete }: Props) {")

# 2. Translate PATH_VISUALS or just map them dynamically
# The visual.label is used in two places. Let's just create a dynamic getter inside the component.
get_visual_old = """const PATH_VISUALS: Record<string, PathVisual> = {
  standing:       { label: 'Standing Line',   emoji: '⬆️', color: '#6366F1', duration: 4000 },
  sleeping:       { label: 'Sleeping Line',   emoji: '➡️', color: '#22C55E', duration: 4000 },
  'left-slanting':{ label: 'Left Slant',      emoji: '↗️', color: '#F59E0B', duration: 4000 },
  'right-slanting':{ label: 'Right Slant',    emoji: '↖️', color: '#F97316', duration: 4000 },
  'up-curve':     { label: 'Up Curve',        emoji: '🙂', color: '#06B6D4', duration: 4000 },
  'down-curve':   { label: 'Down Curve',      emoji: '🙃', color: '#10B981', duration: 4000 },
  'left-curve':   { label: 'Left Curve',      emoji: '🌀', color: '#8B5CF6', duration: 4000 },
  'right-curve':  { label: 'Right Curve',     emoji: '🌀', color: '#EC4899', duration: 4000 },
  zigzag:         { label: 'Zig Zag',         emoji: '⚡', color: '#EF4444', duration: 4500 },
  's-curve':      { label: 'Wavy Path',       emoji: '〰️', color: '#22c55e', duration: 5000 },
  circle:         { label: 'Circle',          emoji: '⭕', color: '#818cf8', duration: 5500 },
};

function getVisual(path: string): PathVisual {
  return PATH_VISUALS[path] || { label: path, emoji: '✏️', color: '#8B5CF6', duration: 4000 };
}"""

get_visual_new = """const PATH_VISUALS: Record<string, PathVisual> = {
  standing:       { label: 'Standing Line',   emoji: '⬆️', color: '#6366F1', duration: 4000 },
  sleeping:       { label: 'Sleeping Line',   emoji: '➡️', color: '#22C55E', duration: 4000 },
  'left-slanting':{ label: 'Left Slant',      emoji: '↗️', color: '#F59E0B', duration: 4000 },
  'right-slanting':{ label: 'Right Slant',    emoji: '↖️', color: '#F97316', duration: 4000 },
  'up-curve':     { label: 'Up Curve',        emoji: '🙂', color: '#06B6D4', duration: 4000 },
  'down-curve':   { label: 'Down Curve',      emoji: '🙃', color: '#10B981', duration: 4000 },
  'left-curve':   { label: 'Left Curve',      emoji: '🌀', color: '#8B5CF6', duration: 4000 },
  'right-curve':  { label: 'Right Curve',     emoji: '🌀', color: '#EC4899', duration: 4000 },
  zigzag:         { label: 'Zig Zag',         emoji: '⚡', color: '#EF4444', duration: 4500 },
  's-curve':      { label: 'Wavy Path',       emoji: '〰️', color: '#22c55e', duration: 5000 },
  circle:         { label: 'Circle',          emoji: '⭕', color: '#818cf8', duration: 5500 },
};

const PATH_VISUALS_TAMIL: Record<string, string> = {
  standing: 'நேர்கோடு',
  sleeping: 'படுக்கைகோடு',
  'left-slanting': 'இடது சாய்வுகோடு',
  'right-slanting': 'வலது சாய்வுகோடு',
  'up-curve': 'மேல் வளைவு',
  'down-curve': 'கீழ் வளைவு',
  'left-curve': 'இடது வளைவு',
  'right-curve': 'வலது வளைவு',
  zigzag: 'நெளிவுகோடு',
  's-curve': 'எஸ் வளைவு',
  circle: 'வட்டம்',
};

function getVisual(path: string, isTamil?: boolean): PathVisual {
  const base = PATH_VISUALS[path] || { label: path, emoji: '✏️', color: '#8B5CF6', duration: 4000 };
  if (isTamil && PATH_VISUALS_TAMIL[path]) {
    return { ...base, label: PATH_VISUALS_TAMIL[path] };
  }
  return base;
}"""

content = content.replace(get_visual_old, get_visual_new)
content = content.replace("const visual = getVisual(pathType);", "const visual = getVisual(pathType, isTamil);")

# 3. Translate hardcoded strings
content = content.replace(
    ">Guide<",
    ">{isTamil ? 'வழிகாட்டி' : 'Guide'}<"
).replace(
    ">Guide\r\n        </span>",
    ">{isTamil ? 'வழிகாட்டி' : 'Guide'}\r\n        </span>"
).replace(
    ">Guide\n        </span>",
    ">{isTamil ? 'வழிகாட்டி' : 'Guide'}\n        </span>"
)

content = content.replace(
    "Tap to Watch",
    "{isTamil ? 'பார்க்க தட்டவும்' : 'Tap to Watch'}"
)

content = content.replace(
    "DEMO COMPLETE",
    "{isTamil ? 'டெமோ முடிந்தது' : 'DEMO COMPLETE'}"
)

content = content.replace(
    ">Replay</",
    ">{isTamil ? 'மீண்டும்' : 'Replay'}</"
)

content = content.replace(
    ">Continue</",
    ">{isTamil ? 'தொடர்க' : 'Continue'}</"
)

old_status = """        {phase === 'idle'
          ? 'Tap to see how it\\'s done'
          : phase === 'playing'
          ? 'Watch the guide...'
          : 'Got it! Ready to trace'}"""
new_status = """        {phase === 'idle'
          ? (isTamil ? 'எப்படி என்று பார்க்க தட்டவும்' : 'Tap to see how it\\'s done')
          : phase === 'playing'
          ? (isTamil ? 'வழிகாட்டியைப் பார்க்கவும்...' : 'Watch the guide...')
          : (isTamil ? 'புரிந்தது! வரைவதற்கு தயார்' : 'Got it! Ready to trace')}"""
content = content.replace(old_status, new_status)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("PreWritingVideo updated")
