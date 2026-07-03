import React, { useState } from 'react';
import { Send, MessageSquare, Search, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUniversityStore } from '../../store/universityStore';

interface Message {
  id: string;
  from: string;
  fromName: string;
  content: string;
  timestamp: number;
  read: boolean;
}

interface Thread {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastTimestamp: number;
  unread: number;
  messages: Message[];
}

const DEMO_THREADS: Thread[] = [
  {
    id: '1',
    participantId: 'admin1',
    participantName: "Administration",
    participantRole: "admin_universite",
    lastMessage: "Bonjour, votre dossier d'inscription a bien été reçu.",
    lastTimestamp: Date.now() - 3600000,
    unread: 2,
    messages: [
      { id: 'm1', from: 'admin1', fromName: 'Administration', content: "Bonjour, votre dossier d'inscription a bien été reçu.", timestamp: Date.now() - 7200000, read: true },
      { id: 'm2', from: 'admin1', fromName: 'Administration', content: "Il vous manque une pièce justificative. Pourriez-vous nous la faire parvenir ?", timestamp: Date.now() - 3600000, read: false },
    ],
  },
  {
    id: '2',
    participantId: 'teacher1',
    participantName: "Prof. Bernard",
    participantRole: "teacher",
    lastMessage: "Le devoir est à rendre pour vendredi 23h59.",
    lastTimestamp: Date.now() - 86400000,
    unread: 0,
    messages: [
      { id: 'm3', from: 'teacher1', fromName: 'Prof. Bernard', content: "Le devoir est à rendre pour vendredi 23h59.", timestamp: Date.now() - 86400000, read: true },
    ],
  },
];

function formatTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export const MessagingView: React.FC = () => {
  const { user } = useAuthStore();
  const [threads, setThreads] = useState<Thread[]>(DEMO_THREADS);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');

  const filtered = threads.filter((t) =>
    t.participantName.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !activeThread) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      from: user?.id ?? 'me',
      fromName: `${user?.profile.firstName} ${user?.profile.lastName}`,
      content: newMessage.trim(),
      timestamp: Date.now(),
      read: true,
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? { ...t, messages: [...t.messages, msg], lastMessage: msg.content, lastTimestamp: msg.timestamp }
          : t
      )
    );
    setActiveThread((prev) => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
    setNewMessage('');
  };

  const openThread = (thread: Thread) => {
    setActiveThread(thread);
    setThreads((prev) =>
      prev.map((t) => t.id === thread.id ? { ...t, unread: 0 } : t)
    );
  };

  const myName = `${user?.profile.firstName} ${user?.profile.lastName}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Messagerie</h1>
        <p className="text-slate-500 text-sm">Communiquez avec les membres de votre établissement</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[600px] flex">
        {/* Thread list */}
        <div className="w-72 border-r border-slate-100 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">Aucune conversation</div>
            ) : filtered.map((thread) => (
              <button
                key={thread.id}
                onClick={() => openThread(thread)}
                className={`w-full text-left px-4 py-3.5 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                  activeThread?.id === thread.id ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {thread.participantName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-slate-800 truncate">{thread.participantName}</p>
                      <span className="text-xs text-slate-400 flex-shrink-0 ml-1">{formatTime(thread.lastTimestamp)}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
                  </div>
                  {thread.unread > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {thread.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {activeThread ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {activeThread.participantName[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{activeThread.participantName}</p>
                <p className="text-xs text-slate-400">En ligne</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {activeThread.messages.map((msg) => {
                const isMe = msg.from === (user?.id ?? 'me');
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-2xl px-4 py-2.5 ${
                      isMe ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {!isMe && <p className="text-xs font-bold mb-0.5 text-blue-600">{msg.fromName}</p>}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-slate-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Écrire un message..."
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors shadow shadow-blue-600/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm font-medium">Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
