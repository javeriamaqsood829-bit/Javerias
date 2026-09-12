import React, { useState } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Trash2,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ContactMessage } from '../../types/portfolio';

export const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
            Client Inquiries &amp; Leads
          </h1>
          <p className="text-xs text-zinc-400">
            Messages sent via your public contact form are securely captured here in real-time.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          {(['all', 'unread', 'read', 'replied'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                filter === status
                  ? 'bg-orange-500 text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="p-8 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-center text-xs text-zinc-400 font-mono">
              No inquiries found under this filter.
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') {
                      updateMessageStatus(msg.id, 'read');
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-zinc-900 border-orange-500/50'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-white truncate">
                      {msg.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        msg.status === 'unread'
                          ? 'bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40'
                          : msg.status === 'replied'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-400 line-clamp-1">{msg.message}</div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-1">
                    <span>{msg.service || 'General Inquiry'}</span>
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message Detail View */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6 shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-white">
                    {selectedMessage.name}
                  </h2>
                  <div className="text-xs text-orange-400 font-mono mt-0.5">
                    {selectedMessage.company || 'Private Inquiry'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry?')) {
                        deleteMessage(selectedMessage.id);
                        setSelectedMessage(null);
                      }
                    }}
                    className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs font-mono text-zinc-200 hover:text-orange-400 truncate"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                {selectedMessage.phone ? (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <Phone className="w-4 h-4 text-orange-400" />
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-xs font-mono text-zinc-200 hover:text-orange-400"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 text-xs font-mono">
                    <Phone className="w-4 h-4 text-zinc-400" />
                    <span>No phone provided</span>
                  </div>
                )}

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono text-zinc-200">
                    Service: {selectedMessage.service || 'Growth Strategy'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <DollarSign className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono text-zinc-200">
                    Budget: {selectedMessage.budget || 'Unspecified'}
                  </span>
                </div>
              </div>

              {/* Full Message Body */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block">
                  Inquiry Message:
                </span>
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Actions & Status Updates */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">Status:</span>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as ContactMessage['status'];
                      updateMessageStatus(selectedMessage.id, newStatus);
                      setSelectedMessage({ ...selectedMessage, status: newStatus });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs font-mono"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>

                <a
                  href={`mailto:${selectedMessage.email}?subject=Regarding Your Strategic Inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out...`}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email Client</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-3xl bg-zinc-950/40 border border-zinc-800/60 border-dashed flex items-center justify-center text-xs text-zinc-400 font-mono">
              Select an inquiry from the left to view complete parameters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
