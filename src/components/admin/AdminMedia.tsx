import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, ExternalLink } from 'lucide-react';
import { uploadMediaFile } from '../../lib/mediaUpload';

interface MediaItem {
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
}

export const AdminMedia: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      name: 'alex_rivera_portrait.jpg',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      size: 420000,
      uploadedAt: '2025-01-15',
    },
    {
      name: 'dtc_skincare_campaign.jpg',
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      size: 680000,
      uploadedAt: '2025-01-20',
    },
    {
      name: 'analytics_dashboard_metrics.jpg',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      size: 512000,
      uploadedAt: '2025-02-01',
    },
    {
      name: 'growth_strategy_whiteboard.jpg',
      url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      size: 890000,
      uploadedAt: '2025-02-10',
    },
  ]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await uploadMediaFile(file, 'library');
        setMediaList((prev) => [
          {
            url: res.url,
            name: res.name,
            size: res.size,
            uploadedAt: new Date().toISOString().split('T')[0],
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Media &amp; Asset Library
          </h1>
          <p className="text-xs text-zinc-400">
            Upload images, banners, and screenshots to use across case studies, services, and profile sections.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Processing File...' : 'Upload Media Assets'}</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Grid of media items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-zinc-950/80 border border-zinc-800 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="p-2 rounded-lg bg-black/80 text-white hover:text-orange-400 text-xs flex items-center gap-1"
                  title="Copy URL"
                >
                  {copiedUrl === item.url ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-black/80 text-white hover:text-orange-400"
                  title="View full"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-3 space-y-1">
              <p className="text-xs font-semibold text-white truncate" title={item.name}>
                {item.name}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>{(item.size / 1024).toFixed(0)} KB</span>
                <span>{item.uploadedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
