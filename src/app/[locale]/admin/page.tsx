import { Link } from '@/i18n/routing';
import { Users, BookOpen, Settings, BarChart2 } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex text-white">
      {/* Sidebar */}
      <aside className="w-64 glass-card m-4 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-gradient">AI Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 font-medium">
            <BarChart2 size={20} className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">
            <BookOpen size={20} className="mr-3" /> Content Manager
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">
            <Users size={20} className="mr-3" /> User Management
          </a>
          <a href="#" className="flex items-center px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition">
            <Settings size={20} className="mr-3" /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Platform Overview</h1>
            <p className="text-gray-400">System metrics and content status.</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            Exit Admin
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-indigo-400">1,248</p>
            <p className="text-green-400 text-sm mt-2">↑ 12% this month</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-gray-400 text-sm mb-2">Active Lessons</h3>
            <p className="text-4xl font-bold text-purple-400">342</p>
            <p className="text-gray-400 text-sm mt-2">15 pending approval</p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-gray-400 text-sm mb-2">Platform Revenue</h3>
            <p className="text-4xl font-bold text-pink-400">₹84,500</p>
            <p className="text-green-400 text-sm mt-2">↑ 8% this month</p>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-xl font-bold mb-6">Recent Content Updates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 px-4 font-medium">Title</th>
                  <th className="pb-3 px-4 font-medium">Category</th>
                  <th className="pb-3 px-4 font-medium">Author</th>
                  <th className="pb-3 px-4 font-medium">Status</th>
                  <th className="pb-3 px-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { title: "Introduction to AI", category: "Computer Science", author: "Dr. Smith", status: "Published", date: "Oct 24" },
                  { title: "The Water Cycle", category: "Science", author: "Jane Doe", status: "Reviewing", date: "Oct 23" },
                  { title: "Basic Fractions", category: "Math", author: "Allen Walker", status: "Draft", date: "Oct 21" }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-4 px-4">{row.title}</td>
                    <td className="py-4 px-4">{row.category}</td>
                    <td className="py-4 px-4 text-gray-400">{row.author}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'Published' ? 'bg-green-500/20 text-green-400' : 
                        row.status === 'Reviewing' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
