import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import whatsappIcon from '@/assets/whatsapp-icon.svg';
import logo from '@/assets/logo.png';
import chatWallpaper from '@/assets/chat-wallpaper.svg';

type Sender = 'agent' | 'user';

interface ChatMessage {
  id: number;
  sender: Sender;
  text: string;
}

const ChatWidget = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'agent',
      text:
        language === 'nl'
          ? '24/7 bereikbaar. Stel hier je vraag, we helpen je graag.'
          : 'Available 24/7. Ask your question here and we will help you quickly.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const whatsappNumber = '31645457394';

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'agent',
        text:
          language === 'nl'
            ? '24/7 bereikbaar. Stel hier je vraag, we helpen je graag.'
            : 'Available 24/7. Ask your question here and we will help you quickly.',
      },
    ]);
    setMessage('');
  }, [language]);

  useEffect(() => {
    if (!isOpen) {
      setIsComposerOpen(false);
      return;
    }
    setIsComposerOpen(!isMobile);
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  const lastUserMessage = useMemo(() => {
    return [...messages].reverse().find((item) => item.sender === 'user')?.text ?? '';
  }, [messages]);

  const openWhatsApp = (text?: string) => {
    const presetText =
      text?.trim() ||
      lastUserMessage ||
      (language === 'nl'
        ? 'Hallo, ik heb een vraag over jullie diensten.'
        : 'Hi, I have a question about your services.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(presetText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    openWhatsApp(trimmed);
    setMessage('');
  };

  const handleOpenComposer = () => {
    setIsComposerOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 60);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:bg-[#20c55a] transition-colors"
            aria-label={language === 'nl' ? 'Open chat' : 'Open chat'}
          >
            <img src={whatsappIcon} alt="" aria-hidden="true" className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-2 left-2 right-2 sm:left-auto sm:right-4 md:right-6 md:bottom-6 z-50 h-[78vh] max-h-[720px] sm:w-[360px] md:w-[390px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-white px-3.5 py-3 md:px-4 md:py-3.5 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Web-Maat"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm md:text-base">Web-Maat Support</h3>
                  <p className="text-[11px] md:text-xs text-slate-500">
                    {language === 'nl' ? 'Meestal binnen 5 min online' : 'Usually online within 5 minutes'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-slate-900 transition-colors"
                aria-label={language === 'nl' ? 'Sluit chat' : 'Close chat'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2.5"
              style={{
                backgroundColor: '#ECE6DD',
                backgroundImage: `linear-gradient(rgba(236, 230, 221, 0.72), rgba(236, 230, 221, 0.72)), url(${chatWallpaper})`,
                backgroundSize: '280px auto',
              }}
            >
              {messages.map((item) => (
                <div key={item.id} className={item.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      item.sender === 'user'
                        ? 'max-w-[84%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2.5 shadow-sm'
                        : 'max-w-[84%] rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm'
                    }
                  >
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border/70 bg-background/95 px-3 py-3 md:px-4 md:py-3.5 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                {isComposerOpen ? (
                  <>
                    <Input
                      ref={inputRef}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={language === 'nl' ? 'Typ je bericht...' : 'Type your message...'}
                      className="h-11 text-sm bg-white border-border/80 rounded-full"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-11 w-11 rounded-full bg-[#25D366] hover:bg-[#20c55a] text-white shrink-0"
                      disabled={!message.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={handleOpenComposer}
                    className="w-full h-11 rounded-full bg-white text-slate-700 border border-border/80 hover:bg-slate-50"
                  >
                    {language === 'nl' ? 'Typ bericht' : 'Type message'}
                  </Button>
                )}
              </form>

              <div className="mt-2.5 flex items-center justify-between gap-2">
                <p className="text-[11px] text-muted-foreground">
                  {language === 'nl'
                    ? 'Na verzenden opent WhatsApp met uw bericht.'
                    : 'After sending, WhatsApp opens with your message.'}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => openWhatsApp(message)}
                  className="h-8 px-3 text-xs md:text-sm text-[#128C7E] hover:text-[#0f766e] hover:bg-[#128C7E]/10"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  Open WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
