import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Wrench,
  Award,
  GraduationCap,
  MessageSquare,
  Settings,
  Sparkles,
  LogOut,
  ExternalLink,
  Menu,
  X,
  FileText,
  Star,
  Layers,
  Database,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export type AdminTab =
  | 'overview'
  | 'projects'
  | 'services'
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'testimonials'
  | 'messages'
  | 'settings'
  | 'media';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onBackToSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onBackToSite,
  children,
}) => {
  const { currentUser, logout, messages, seedDatabase } = usePortfolio();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Case Studies', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'hero', label: 'Hero Section', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'about', label: 'About & Stats', icon: <FileText className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Tools', icon: <Wrench className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience & Edu', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star className="w-4 h-4" /> },
    {
      id: 'messages',
      label: 'Inquiries / Inbox',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: unreadMessagesCount,
    },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings & SEO', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleSeed = async () => {
    if (confirm('Re-seed initial showcase content into Firestore? (Existing documents will be synchronized/updated)')) {
      try {
        setSeeding(true);
        await seedDatabase();
        setSeedSuccess(true);
        setTimeout(() => setSeedSuccess(false), 4000);
      } catch (e) {
        console.error(e);
        alert('Seed failed. Check console.');
      } finally {
        setSeeding(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0a0a0a] border-r border-zinc-900 flex-col justify-between shrink-0 p-4 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black font-extrabold text-sm">
                CMS
              </div>
              <div>
                <span className="font-heading font-extrabold text-sm text-white tracking-tight block">
                  PORTFOLIO CMS
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Admin Control Panel
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`admin-nav-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500 text-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-zinc-900 space-y-2">
          {/* Seed button */}
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono transition-colors"
            title="Seed default sample projects and settings into Firestore"
          >
            <Database className="w-3.5 h-3.5 text-orange-400" />
            <span>{seeding ? 'Syncing...' : 'Sync Data to Cloud'}</span>
          </button>

          {seedSuccess && (
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 justify-center">
              <CheckCircle2 className="w-3 h-3" />
              <span>Database synced!</span>
            </div>
          )}

          {/* Return to website */}
          <button
            id="admin-return-site-btn"
            onClick={onBackToSite}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* User info & Logout */}
          <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
            <span className="truncate max-w-[130px] font-mono text-[11px]">
              {currentUser?.email || 'admin'}
            </span>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0a0a0a] border-b border-zinc-900 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-black font-extrabold text-xs">
            CMS
          </div>
          <span className="font-heading font-extrabold text-sm text-white">
            PORTFOLIO ADMIN
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToSite}
            className="px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
          >
            View Site
          </button>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg bg-zinc-900 text-zinc-300"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#0c0c0c] border-b border-zinc-800 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileNavOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                currentTab === item.id ? 'bg-orange-500 text-black' : 'text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-red-400 pt-3"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">{children}</div>
      </main>
    </div>
  );
};
