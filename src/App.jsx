import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Plus, Smile, X, Edit2, Trash2, Reply, Settings, Mic, Sticker, Heart, Menu, MessageCircle } from 'lucide-react';

const EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '😊', '☺️', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '❤️', '💕', '💖', '👍', '👏', '🎉', '🎊', '🔥', '✨', '⚡', '👑', '🚀', '💎'];

const STICKERS = ['🎉', '🎊', '🎈', '🎁', '🏆', '👑', '💎', '🌈', '🚀', '✈️', '🎸', '🎮', '🍕', '🍔', '🍜', '🍰', '☕', '🌺', '🌻'];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Александр',
      avatar: '👨‍💼',
      type: 'personal',
      status: 'online',
      lastMessage: '👍',
      timestamp: '14:32',
      unread: 2,
      messages: [
        { id: 1, sender: 'Александр', text: 'Привет! Как дела?', time: '14:32', own: false, reactions: [] },
        { id: 2, sender: 'You', text: 'Отлично! 😊', time: '14:33', own: true, reactions: ['❤️'] },
        { id: 3, sender: 'Александр', text: 'Видимся завтра?', time: '14:35', own: false, reactions: [] }
      ]
    },
    {
      id: 2,
      name: 'Команда',
      avatar: '👥',
      type: 'group',
      lastMessage: 'Встреча завтра в 10:00!',
      timestamp: 'Вчера',
      unread: 0,
      messages: [{ id: 1, sender: 'Мария', text: 'Привет всем!', time: 'Вчера', own: false, reactions: ['👋'] }]
    },
    {
      id: 3,
      name: 'Мария',
      avatar: '👩‍💼',
      type: 'personal',
      status: 'away',
      lastMessage: 'Спасибо! ❤️',
      timestamp: '11:20',
      unread: 0,
      messages: []
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [recordingVoice, setRecordingVoice] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  const selectedChat = chats.find(c => c.id === selectedChatId);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMsg = {
        id: Math.random(),
        sender: 'You',
        text: messageText,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        own: true,
        reactions: []
      };

      setChats(chats.map(c =>
        c.id === selectedChatId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: messageText, timestamp: newMsg.time }
          : c
      ));
      setMessageText('');
      setReplyingTo(null);
    }
  };

  const handleAddReaction = (messageId, emoji) => {
    setChats(chats.map(c =>
      c.id === selectedChatId
        ? {
            ...c,
            messages: c.messages.map(m =>
              m.id === messageId
                ? { ...m, reactions: m.reactions.includes(emoji) ? m.reactions.filter(e => e !== emoji) : [...m.reactions, emoji] }
                : m
            )
          }
        : c
    ));
  };

  const handleDeleteMessage = (messageId) => {
    setChats(chats.map(c =>
      c.id === selectedChatId ? { ...c, messages: c.messages.filter(m => m.id !== messageId) } : c
    ));
  };

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()));
  const bg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const text = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const secondary = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';

  return (
    <div className={flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}}>

      {/* Боковая панель */}
      <div className={${sidebarOpen ? 'w-96' : 'w-0'} ${bg} shadow-2xl transition-all overflow-hidden flex flex-col border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}}>
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">💬 Мессенджер</h1>
            <button onClick={() => setShowSettings(!showSettings)} className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition">
              <Settings size={20} />
            </button>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-blue-200" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-white bg-opacity-20 text-white placeholder-blue-200 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:bg-opacity-30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={p-4 cursor-pointer hover:${secondary} transition border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} ${selectedChatId === chat.id ? (theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50') : ''}}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="text-3xl">{chat.avatar}</div>
                  {chat.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className={font-semibold ${text}}>{chat.name}</h3>
                    <span className={text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}}>{chat.timestamp}</span>
                  </div>
                  <p className={text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} truncate}>{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Главная область чата */}
      <div className={flex-1 flex flex-col ${bg}}>
        {selectedChat ? (
          <>
            {/* Заголовок чата */}
            <div className={${bg} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 flex justify-between items-center shadow-md}>
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className={md:hidden p-2 hover:${secondary} rounded-lg}>
                  <Menu size={20} className={text} />
                </button>
                <div className="relative text-4xl">{selectedChat.avatar}</div>
                <div>
                  <h2 className={font-bold text-lg ${text}}>{selectedChat.name}</h2>
                  <p className={text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}}>
                    {selectedChat.type === 'group' ? '👥 Группа' : selectedChat.status === 'online' ? '🟢 online' : '⚫ offline'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={p-2 hover:${secondary} rounded-lg}><Phone size={20} className="text-green-500" /></button>
                <button className={p-2 hover:${secondary} rounded-lg}><Video size={20} className="text-blue-500" /></button>
                <button className={p-2 hover:${secondary} rounded-lg}><MoreVertical size={20} className={text} /></button>
              </div>
            </div>

            {/* Область сообщений */}
            <div className={flex-1 overflow-y-auto p-6 space-y-4 ${secondary}}>
              {selectedChat.messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Начните разговор!</p>
                  </div>
                </div>
              ) : (
                selectedChat.messages.map(msg => (
                  <div key={msg.id} className={flex ${msg.own ? 'justify-end' : 'justify-start'} group}>
                    <div
                      className={max-w-md rounded-2xl px-5 py-3 ${msg.own ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none shadow-lg' : theme === 'dark' ? 'bg-gray-800 text-white rounded-bl-none' : 'bg-white text-gray-900 rounded-bl-none shadow-md border border-gray-200'}}
                      onMouseEnter={() => setSelectedMessage(msg.id)}
                      onMouseLeave={() => setSelectedMessage(null)}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                      <div className={text-xs mt-2 ${msg.own ? 'text-blue-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}}>{msg.time}</div>
                      {msg.reactions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {msg.reactions.map((e, i) => (
                            <button key={i} onClick={() => handleAddReaction(msg.id, e)} className={text-lg px-2 py-1 rounded-full ${msg.own ? 'bg-blue-400 hover:bg-blue-300' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}}>
                              {e}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {selectedMessage === msg.id && (
                      <div className="flex items-center gap-1 ml-2">
                        <button onClick={() => handleAddReaction(msg.id, '❤️')} className={p-2 rounded-lg hover:${secondary}}>
                          <Heart size={16} className="text-red-500" />
                        </button>
                        <button onClick={() => setReplyingTo(msg)} className={p-2 rounded-lg hover:${secondary}}>
                          <Reply size={16} className="text-blue-500" />
                        </button>
                        {msg.own && (
                          <>
                            <button className={p-2 rounded-lg hover:${secondary}}>
                              <Edit2 size={16} className="text-orange-500" />
                            </button>
                            <button onClick={() => handleDeleteMessage(msg.id)} className={p-2 rounded-lg hover:${secondary}}>
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Ответ на сообщение */}
            {replyingTo && (
              <div className={px-6 py-3 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex items-center justify-between}>
                <div>
                  <p className="font-semibold text-blue-500">↩️ Ответ на {replyingTo.sender}</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{replyingTo.text.substring(0, 50)}</p>
                </div>
                <button onClick={() => setReplyingTo(null)} className={p-2 hover:${secondary} rounded-lg}>
                  <X size={20} className={text} />
                </button>
              </div>
            )}

            {/* Поле ввода */}
            <div className={${bg} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 shadow-lg}>
              <div className="flex gap-2 items-end">
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={p-2 hover:${secondary} rounded-lg}>
                  <Smile size={20} className="text-yellow-500" />
                </button>
                <input
                  type="text"
                  placeholder="Сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className={flex-1 ${secondary} ${text} placeholder-gray-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500}
                />
                <button onClick={() => setRecordingVoice(!recordingVoice)} className={p-2 rounded-lg ${recordingVoice ? 'bg-red-500 text-white' : hover:${secondary}}}>
                  <Mic size={20} className={recordingVoice ? 'text-white' : 'text-blue-500'} />
                </button>
                <button onClick={handleSendMessage} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg">
                  <Send size={20} />
                </button>
              </div>

              {/* Пикер эмодзи */}
              {showEmojiPicker && (
                <div className={absolute bottom-24 right-4 ${bg} rounded-2xl p-4 shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} z-50 w-80}>
                  <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                    {EMOJIS.map((e, i) => (
                      <button key={i} onClick={() => { setMessageText(messageText + e); setShowEmojiPicker(false); }} className={text-2xl p-2 hover:${secondary} rounded-lg}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-7xl mb-4">💬</div>
              <p className={text}>Выберите чат</p>
            </div>
          </div>
        )}
      </div>

      {/* Панель настроек */}
      {showSettings && (
        <div className={w-80 ${bg} border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-2xl flex flex-col}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">⚙️ Настройки</h3>
            <button onClick={() => setShowSettings(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className={${secondary} rounded-xl p-4 text-center}>
              <div className="text-5xl mb-2">👤</div>
              <h4 className={font-bold ${text}}>Мой профиль</h4>
              <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold mt-3">Редактировать</button>
            </div>

            <div className={${secondary} rounded-xl p-4 flex items-center justify-between}>
              <span className={font-semibold ${text}}>🌙 Тёмная тема</span>
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={w-12 h-6 rounded-full transition ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}}>
                <div className={w-5 h-5 bg-white rounded-full transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}}></div>
              </button>
            </div>

            <div className={${secondary} rounded-xl p-4}>
              <h4 className={font-semibold ${text} mb-3}>🔔 Уведомления</h4>
              <button className={w-full py-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} ${text} rounded-lg text-sm font-semibold}>Звук: Вкл</button>
            </div>

            <div className={${secondary} rounded-xl p-4}>
              <h4 className={font-semibold ${text} mb-3}>📱 Приватность</h4>
              <button className={w-full py-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} ${text} rounded-lg text-sm font-semibold}>Видеть онлайн</button>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-4 text-white text-center">
              <h4 className="text-2xl font-bold mb-2">✨ Premium</h4>
              <p className="text-sm mb-3">Разблокируйте все функции!</p>
              <button className="w-full bg-white text-yellow-600 font-bold py-2 rounded-lg">Подписаться</button>
            </div>

            <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition">🚪 Выход</button>
          </div>
        </div>
      )}
    </div>
  );
}
