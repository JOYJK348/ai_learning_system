import sys

file_path = 'src/app/[locale]/student/Learn/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """  // Pre-writing lines
  if (lower.includes('standing') || lower.includes('நேர்')) {
    return { emoji: '📏', mascot: 'LINE_STANDING_IMG', color: 'from-blue-400 to-indigo-500', sound: 'Standing line! Up and down!' };
  }
  if (lower.includes('sleeping') || lower.includes('படுக்கை')) {
    return { emoji: '🛏️', mascot: 'LINE_SLEEPING_IMG', color: 'from-emerald-400 to-teal-500', sound: 'Sleeping line! Left to right!' };
  }
  if (lower.includes('slanting') || lower.includes('சாய்வு')) {
    return { emoji: '📐', mascot: 'LINE_SLANTING_IMG', color: 'from-orange-400 to-amber-500', sound: 'Slanting line!' };
  }
  if (lower.includes('curved') || lower.includes('curve') || lower.includes('வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-purple-400 to-pink-500', sound: 'Curved line! Like a rainbow!' };
  }
  if (lower.includes('zig') || lower.includes('zag') || lower.includes('நெளிவு')) {
    return { emoji: '⚡', mascot: 'LINE_ZIGZAG_IMG', color: 'from-yellow-400 to-orange-500', sound: 'Zig zag line! Like lightning!' };
  }"""

replacement = """  // Pre-writing lines
  if (lower.includes('standing') || lower.includes('நேர்')) {
    return { emoji: '📏', mascot: 'LINE_STANDING_IMG', color: 'from-blue-400 to-indigo-500', sound: 'Standing line! Up and down!', shapePath: 'standing' };
  }
  if (lower.includes('sleeping') || lower.includes('படுக்கை')) {
    return { emoji: '🛏️', mascot: 'LINE_SLEEPING_IMG', color: 'from-emerald-400 to-teal-500', sound: 'Sleeping line! Left to right!', shapePath: 'sleeping' };
  }
  if (lower.includes('left slanting') || lower.includes('இடது சாய்வு')) {
    return { emoji: '📐', mascot: 'LINE_SLANTING_IMG', color: 'from-orange-400 to-amber-500', sound: 'Left slanting line!', shapePath: 'left-slanting' };
  }
  if (lower.includes('right slanting') || lower.includes('வலது சாய்வு')) {
    return { emoji: '📐', mascot: 'LINE_SLANTING_IMG', color: 'from-amber-400 to-orange-500', sound: 'Right slanting line!', shapePath: 'right-slanting' };
  }
  if (lower.includes('slanting') || lower.includes('சாய்வு')) {
    return { emoji: '📐', mascot: 'LINE_SLANTING_IMG', color: 'from-orange-400 to-amber-500', sound: 'Slanting line!', shapePath: 'left-slanting' };
  }
  if (lower.includes('left curve') || lower.includes('இடது வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-purple-400 to-pink-500', sound: 'Left curved line!', shapePath: 'left-curve' };
  }
  if (lower.includes('right curve') || lower.includes('வலது வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-pink-400 to-purple-500', sound: 'Right curved line!', shapePath: 'right-curve' };
  }
  if (lower.includes('up curve') || lower.includes('மேல் வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-cyan-400 to-blue-500', sound: 'Up curved line!', shapePath: 'up-curve' };
  }
  if (lower.includes('down curve') || lower.includes('கீழ் வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-teal-400 to-emerald-500', sound: 'Down curved line!', shapePath: 'down-curve' };
  }
  if (lower.includes('curved') || lower.includes('curve') || lower.includes('வளைவு')) {
    return { emoji: '🌈', mascot: 'LINE_CURVE_IMG', color: 'from-purple-400 to-pink-500', sound: 'Curved line! Like a rainbow!' };
  }
  if (lower.includes('zig') || lower.includes('zag') || lower.includes('நெளிவு')) {
    return { emoji: '⚡', mascot: 'LINE_ZIGZAG_IMG', color: 'from-yellow-400 to-orange-500', sound: 'Zig zag line! Like lightning!', shapePath: 'zigzag' };
  }"""

if target in content:
    content = content.replace(target, replacement)
    
    # Now replace the card render
    target2 = """                                {lesson.thumbnail_url ? (
                                  <img src={lesson.thumbnail_url} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
                                ) : (
                                  visuals.emoji
                                )}"""
                                
    replacement2 = """                                {lesson.thumbnail_url ? (
                                  <img src={lesson.thumbnail_url} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
                                ) : visuals.shapePath ? (
                                  <div className="w-full h-full flex items-center justify-center p-2">
                                    <ShapeVisualizer path={visuals.shapePath as any} />
                                  </div>
                                ) : (
                                  visuals.emoji
                                )}"""
                                
    content = content.replace(target2, replacement2)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Replaced both successfully')
else:
    print('Target not found')
