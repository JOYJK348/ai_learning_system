import re

with open('D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    \"setTraceRounds([{ type: 'guide', path }, { type: 'trace', path }]);\",
    \"setTraceRounds([{ type: 'trace', path }]);\"
)

content = re.sub(
    r\"const shuffled = \[\.\.\.QUIZ_STROKES\]\.sort\(\(\) => Math\.random\(\) - 0\.5\)\.slice\(0, EXAM_COUNT\);\s*setTraceRounds\(shuffled\.map\(p => \(\{ type: 'trace' as const, path: p \}\)\)\);\",
    \"const shuffled = [...QUIZ_STROKES].sort(() => Math.random() - 0.5).slice(0, 1);\\n        setTraceRounds(shuffled.map(p => ({ type: 'trace' as const, path: p })));\",
    content
)

content = content.replace(\"image: '/assets/img/lkg_eng_cover.png',\", \"image: '/assets/img/lkg_eng_cover_1781619688939.png',\")
content = content.replace(\"image: '/assets/img/math_cover.png',\", \"image: '/assets/img/math_cover_1781620414313.png',\")
content = content.replace(\"image: '/assets/img/evs_cover.png',\", \"image: '/assets/img/evs_cover_1781620726092.png',\")
content = content.replace(\"image: '/assets/img/gk_cover.png',\", \"image: '/assets/img/gk_cover_1781620902631.png',\")
content = content.replace(\"image: '/assets/img/hindi_cover.png',\", \"image: '/assets/img/hindi_cover_1781621043556.png',\")
content = content.replace(\"image: '/assets/img/tamil_cover.png',\", \"image: '/assets/img/tamil_cover_1781621085346.png',\")

with open('D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done trace rounds fix')
