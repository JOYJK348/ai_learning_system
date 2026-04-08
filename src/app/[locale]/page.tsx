import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-extrabold text-gradient mb-6">
        {t('title')}
      </h1>
      <p className="text-xl text-indigo-200/80 mb-12 max-w-2xl">
        {t('description')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link href="/student" className="glass-card p-8 hover:border-indigo-500 transition-colors group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-indigo-400">{t('studentPortal')}</h2>
          <p className="text-sm text-gray-400">Jump into your animated lessons</p>
        </Link>

        <Link href="/parent" className="glass-card p-8 hover:border-purple-500 transition-colors group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400">{t('parentPortal')}</h2>
          <p className="text-sm text-gray-400">Track your child's progress</p>
        </Link>

        <Link href="/admin" className="glass-card p-8 hover:border-pink-500 transition-colors group">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-pink-400">{t('adminPortal')}</h2>
          <p className="text-sm text-gray-400">Manage content and users</p>
        </Link>
      </div>

      <div className="mt-16">
        <button className="btn-premium">
          Explore Demo Lessons
        </button>
      </div>
    </main>
  );
}
