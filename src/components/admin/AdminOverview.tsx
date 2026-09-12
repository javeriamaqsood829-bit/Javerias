import React from 'react';
import {
  FolderGit2,
  Briefcase,
  Wrench,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminTab } from './AdminLayout';

interface AdminOverviewProps {
  onNavigateTab: (tab: AdminTab) => void;
  onBackToSite: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab, onBackToSite }) => {
  const {
    projects,
    services,
    skills,
    messages,
    siteSettings,
    dbConnected,
    testimonials,
  } = usePortfolio();

  const unreadMessages = messages.filter((m) => m.status === 'unread');
  const publishedProjects = projects.filter((p) => p.published);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Marketer Portfolio CMS</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            Welcome back, {siteSettings.ownerName || 'Alex'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            All edits saved here immediately reflect on your live website. Database is connected to Firestore cloud.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={onBackToSite}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cloud Status */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs">
        <div className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
        <span className="text-zinc-400 font-mono">Cloud Connection:</span>
        <span className="text-zinc-200 font-semibold font-mono">
          {dbConnected ? 'Firestore Active (Live Synchronization Enabled)' : 'Connecting / Local State Ready'}
        </span>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {publishedProjects.length} Live
            </span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white group-hover:text-orange-400 transition-colors">
            {projects.length}
          </div>
          <div className="text-xs text-zinc-400 font-mono mt-1 uppercase">
            Total Case Studies
          </div>
        </div>

        {/* Services */}
        <div
          onClick={() => onNavigateTab('services')}
          className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">Full Capabilities</span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white group-hover:text-orange-400 transition-colors">
            {services.length}
          </div>
          <div className="text-xs text-zinc-400 font-mono mt-1 uppercase">
            Active Services
          </div>
        </div>

        {/* Skills */}
        <div
          onClick={() => onNavigateTab('skills')}
          className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-zinc-400">Tech &amp; Strategy</span>
          </div>
          <div className="font-heading font-extrabold text-3xl text-white group-hover:text-orange-400 transition-colors">
            {skills.length}
          </div>
          <div className="text-xs text-zinc-400 font-mono mt-1 uppercase">
            Tracked Skills
          </div>
        </div>

        {/* Inquiries */}
        <div
          onClick={() => onNavigateTab('messages')}
          className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-orange-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            {unreadMessages.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500 text-black">
                {unreadMessages.length} Unread
              </span>
            )}
          </div>
          <div className="font-heading font-extrabold text-3xl text-white group-hover:text-orange-400 transition-colors">
            {messages.length}
          </div>
          <div className="text-xs text-zinc-400 font-mono mt-1 uppercase">
            Inquiries Received
          </div>
        </div>
      </div>

      {/* Quick Launch Shortcuts */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
          Quick Content Operations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigateTab('projects')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-white">Create New Case Study</div>
              <div className="text-xs text-zinc-400">Add client metrics, challenge &amp; images</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
          </button>

          <button
            onClick={() => onNavigateTab('hero')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-white">Edit Hero &amp; Brand Headline</div>
              <div className="text-xs text-zinc-400">Change titles, copy &amp; CTA buttons</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
          </button>

          <button
            onClick={() => onNavigateTab('messages')}
            className="p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-white">Review Client Leads</div>
              <div className="text-xs text-zinc-400">View inquiries, contact parameters &amp; budgets</div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>

      {/* Recent Inquiries Preview */}
      <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-white uppercase">
            Recent Client Inquiries
          </h2>
          <button
            onClick={() => onNavigateTab('messages')}
            className="text-xs text-orange-400 hover:underline font-mono"
          >
            View All ({messages.length}) &rarr;
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-8 text-xs text-zinc-400 font-mono">
            No inquiries received yet. Try sending a message via the public contact form to test!
          </div>
        ) : (
          <div className="divide-y divide-zinc-900">
            {messages.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                onClick={() => onNavigateTab('messages')}
                className="py-3 flex items-center justify-between text-xs cursor-pointer hover:bg-zinc-900/40 px-2 rounded-lg transition-colors"
              >
                <div>
                  <div className="font-bold text-zinc-200">
                    {msg.name}{' '}
                    {msg.company && (
                      <span className="text-zinc-400 font-normal">({msg.company})</span>
                    )}
                  </div>
                  <div className="text-zinc-400 line-clamp-1">{msg.message}</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      msg.status === 'unread'
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
