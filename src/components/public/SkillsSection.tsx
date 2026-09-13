import React, { useState } from 'react';
import {
  Share2,
  Search,
  Target,
  Mail,
  TrendingUp,
  Users,
  Briefcase,
  Zap,
  BookOpen,
  MapPin,
  Smartphone,
  FileText,
  Image as ImageIcon,
  Award,
  Video,
  Layout,
  Sparkles,
  Palette,
  BarChart2,
  Layers,
  Globe,
  Inbox,
  PenTool,
  Code,
  PieChart,
  ShoppingBag,
  Activity,
  Cpu,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const getSkillIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Share2': return Share2;
    case 'Search': return Search;
    case 'Target': return Target;
    case 'Mail': return Mail;
    case 'TrendingUp': return TrendingUp;
    case 'Users': return Users;
    case 'Briefcase': return Briefcase;
    case 'Zap': return Zap;
    case 'BookOpen': return BookOpen;
    case 'MapPin': return MapPin;
    case 'Smartphone': return Smartphone;
    case 'FileText': return FileText;
    case 'Image': return ImageIcon;
    case 'Award': return Award;
    case 'Video': return Video;
    case 'Layout': return Layout;
    case 'Sparkles': return Sparkles;
    case 'Palette': return Palette;
    case 'BarChart2': return BarChart2;
    case 'Layers': return Layers;
    case 'Globe': return Globe;
    case 'Inbox': return Inbox;
    case 'PenTool': return PenTool;
    case 'Code': return Code;
    case 'PieChart': return PieChart;
    case 'ShoppingBag': return ShoppingBag;
    case 'Activity': return Activity;
    case 'Cpu': return Cpu;
    case 'Eye': return Eye;
    default: return CheckCircle2;
  }
};

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const publishedSkills = skills.filter((s) => s.published);

  // Derive unique categories with standard ones listed first
  const standardCategories = ['ALL', 'Digital Marketing', 'Creative', 'Tools'];
  const customCategories = Array.from(
    new Set(
      publishedSkills
        .map((s) => s.category)
        .filter((c) => Boolean(c) && !standardCategories.includes(c))
    )
  );
  const categories = [...standardCategories, ...customCategories];

  const filteredSkills =
    activeCategory === 'ALL'
      ? publishedSkills
      : publishedSkills.filter((s) => s.category === activeCategory);

  const getCategoryCount = (cat: string) => {
    if (cat === 'ALL') return publishedSkills.length;
    return publishedSkills.filter((s) => s.category === cat).length;
  };

  return (
    <section id="skills" className="py-28 bg-[#080808] relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141416]/90 border border-zinc-800/80 shadow-md backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
            <span className="text-[#f59e0b] text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
              Mastery &amp; Tooling ({publishedSkills.length} Skills)
            </span>
          </div>
          <h2
            id="skills-heading"
            className="font-impact uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl text-white leading-[1.02]"
          >
            TECHNICAL &amp; CREATIVE SKILLS
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
            A balanced synthesis of analytical media attribution, conversion psychology, creative storytelling, and enterprise martech fluency.
          </p>
        </div>

        {/* Category Filters */}
        <div id="skills-category-filters" className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    activeCategory === cat
                      ? 'bg-black/20 text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const IconComp = getSkillIcon(skill.icon);
            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-orange-500/40 transition-all duration-200 space-y-3.5 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-heading font-bold text-white text-base leading-snug truncate">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-orange-400 shrink-0 pt-1">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-0.5">
                  <span className="text-zinc-400">{skill.category}</span>
                  <span className="text-zinc-500">Proficiency Level</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
