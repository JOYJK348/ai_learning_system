import os

base = 'D:/FreeLance/AI-LearningPortal/frontend/public/assets/img/'

svgs = {
    'line_standing.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
    <filter id="sh"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
  </defs>
  <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#g)" filter="url(#sh)"/>
  <!-- dashed line -->
  <line x1="50" y1="20" x2="50" y2="80" stroke="white" stroke-width="8" stroke-dasharray="10,10" stroke-linecap="round"/>
  <polygon points="50,85 45,75 55,75" fill="#fde047"/>
</svg>''',

    'line_sleeping.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient>
    <filter id="sh"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
  </defs>
  <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#g)" filter="url(#sh)"/>
  <!-- dashed line -->
  <line x1="20" y1="50" x2="80" y2="50" stroke="white" stroke-width="8" stroke-dasharray="10,10" stroke-linecap="round"/>
  <polygon points="85,50 75,45 75,55" fill="#fde047"/>
</svg>''',

    'line_slanting.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
    <filter id="sh"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
  </defs>
  <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#g)" filter="url(#sh)"/>
  <!-- dashed line -->
  <line x1="25" y1="75" x2="75" y2="25" stroke="white" stroke-width="8" stroke-dasharray="10,10" stroke-linecap="round"/>
  <polygon points="80,20 70,20 75,30" fill="#fde047"/>
</svg>''',

    'line_curve.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#d946ef"/></linearGradient>
    <filter id="sh"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
  </defs>
  <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#g)" filter="url(#sh)"/>
  <!-- dashed curve -->
  <path d="M 20 60 Q 50 10 80 60" stroke="white" stroke-width="8" stroke-dasharray="10,10" fill="none" stroke-linecap="round"/>
  <polygon points="85,65 75,65 80,55" fill="#fde047"/>
</svg>''',

    'line_zigzag.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#f97316"/></linearGradient>
    <filter id="sh"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
  </defs>
  <rect x="5" y="5" width="90" height="90" rx="15" fill="url(#g)" filter="url(#sh)"/>
  <!-- dashed zigzag -->
  <polyline points="20,60 40,30 60,70 80,40" stroke="white" stroke-width="8" stroke-dasharray="10,10" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <polygon points="85,35 75,35 80,45" fill="#1e1b4b"/>
</svg>'''
}

for name, content in svgs.items():
    with open(base + name, 'w', encoding='utf-8') as f:
        f.write(content)

print("Created 5 SVG line files.")
