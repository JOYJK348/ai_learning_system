import { Link } from '@/i18n/routing';
import { PlayCircle, Award, Star, List } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Hello, Student! 👋</h1>
          <p className="text-gray-400 mt-2">Ready for your next animated adventure?</p>
        </div>
        <Link href="/" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
          Home
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Current Level</p>
            <p className="text-xl font-bold">Level 5 Explorer</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Points</p>
            <p className="text-xl font-bold">1,250 XP</p>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center space-x-4 md:col-span-2">
           <div className="w-full">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Weekly Goal</span>
              <span className="text-indigo-400 font-bold">75%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
           </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((lesson) => (
          <div key={lesson} className="glass-card overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition">
            <div className="h-48 bg-slate-800 relative flex items-center justify-center">
              {/* This would be an animated thumbnail later */}
              <PlayCircle size={48} className="text-white/50 group-hover:text-indigo-400 transition transform group-hover:scale-110" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Science &bull; Chapter {lesson}</span>
              <h3 className="text-lg font-bold mt-1 mb-2">The Solar System Part {lesson}</h3>
              <p className="text-sm text-gray-400 mb-4">Learn about the amazing planets in our galaxy!</p>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center text-gray-300"><List size={16} className="mr-1"/> 4 Activities</span>
                <span className="text-purple-400">10 mins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
