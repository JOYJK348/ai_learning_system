import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/_components/StudentBottomNav.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# Add useLocale
content = content.replace("import { Link, usePathname } from '@/i18n/routing';", "import { Link, usePathname } from '@/i18n/routing';\nimport { useLocale } from 'next-intl';")

content = content.replace("export default function StudentBottomNav() {\n  const pathname = usePathname();", "export default function StudentBottomNav() {\n  const pathname = usePathname();\n  const locale = useLocale();")
content = content.replace("export default function StudentBottomNav() {\r\n  const pathname = usePathname();", "export default function StudentBottomNav() {\r\n  const pathname = usePathname();\r\n  const locale = useLocale();")

# Translate names based on locale
translate_logic = """
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: isActive ? 1 : 0, width: isActive ? 'auto' : 0 }}
                      className={`text-[12px] font-black uppercase tracking-widest text-white whitespace-nowrap overflow-hidden ${isActive ? 'ml-1' : ''}`}
                    >
                      {locale === 'ta' && item.name === 'Home' ? 'முகப்பு' : locale === 'ta' && item.name === 'Learn' ? 'கற்க' : locale === 'ta' && item.name === 'Games' ? 'விளையாட்டு' : locale === 'ta' && item.name === 'Profile' ? 'சுயவிவரம்' : item.name}
                    </motion.span>
"""

old_logic = """
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: isActive ? 1 : 0, width: isActive ? 'auto' : 0 }}
                      className={`text-[12px] font-black uppercase tracking-widest text-white whitespace-nowrap overflow-hidden ${isActive ? 'ml-1' : ''}`}
                    >
                      {item.name}
                    </motion.span>
"""

content = content.replace(old_logic.strip(), translate_logic.strip())

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Translated StudentBottomNav!")
