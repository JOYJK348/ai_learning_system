import { Link } from '@/i18n/routing';
import { LineChart, Clock, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

export default function ParentDashboard() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Parent Dashboard</h1>
          <p className="text-gray-400 mt-2">Monitor your child's learning progress and activity.</p>
        </div>
        <Link href="/" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
          Home
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400">Total Learning Time</p>
            <Clock size={18} className="text-purple-400"/>
          </div>
          <p className="text-3xl font-bold">14h 30m</p>
          <p className="text-xs text-green-400 mt-2">+2h from last week</p>
        </div>
        
        <div className="glass-card p-6 border-l-4 border-l-indigo-500">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400">Lessons Completed</p>
            <CheckCircle size={18} className="text-indigo-400"/>
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-xs text-gray-400 mt-2">Across 3 subjects</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-pink-500">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400">Average Score</p>
            <LineChart size={18} className="text-pink-400"/>
          </div>
          <p className="text-3xl font-bold">88%</p>
          <p className="text-xs text-green-400 mt-2">Excellent performance</p>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-orange-500">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-400">Areas to Improve</p>
            <AlertCircle size={18} className="text-orange-400"/>
          </div>
          <p className="text-xl font-bold mt-1">Fractions (Math)</p>
          <p className="text-xs text-gray-400 mt-2">Recommended 2 extra activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
           <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
           <div className="space-y-6">
              {[
                { activity: "Completed 'Solar System Part 2'", time: "2 hours ago", score: "92%" },
                { activity: "Started 'Introduction to Fractions'", time: "Yesterday", score: "In Progress" },
                { activity: "Completed Weekly Quiz", time: "2 days ago", score: "85%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4">
                      <PlayCircle size={18} className="text-indigo-400"/>
                    </div>
                    <div>
                      <p className="font-semibold">{item.activity}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.score === 'In Progress' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Subject Progress</h2>
          <div className="space-y-6">
             <div className="w-full">
               <div className="flex justify-between text-sm mb-2">
                 <span>Science</span>
                 <span className="text-indigo-400">90%</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '90%' }}></div>
               </div>
             </div>
             
             <div className="w-full">
               <div className="flex justify-between text-sm mb-2">
                 <span>Mathematics</span>
                 <span className="text-pink-400">65%</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-pink-500 h-2 rounded-full" style={{ width: '65%' }}></div>
               </div>
             </div>

             <div className="w-full">
               <div className="flex justify-between text-sm mb-2">
                 <span>Languages</span>
                 <span className="text-purple-400">80%</span>
               </div>
               <div className="w-full bg-gray-800 rounded-full h-2">
                 <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
