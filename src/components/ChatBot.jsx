import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Olá! Sou o assistente do Bruno. Como posso ajudar?' }
  ]);
  const [input, setInput] = useState('');

  const responses = {
    'oi': 'Olá! Como posso ajudar você hoje?',
    'olá': 'Oi! Em que posso ser útil?',
    'skills': 'Bruno está estudando HTML, CSS, JavaScript, React e bancos de dados como PostgreSQL.',
    'projetos': 'Bruno tem projetos em React, landing pages e está sempre criando novos projetos de estudo.',
    'contato': 'Você pode entrar em contato através da página de contato ou pelas redes sociais.',
    'experiência': 'Bruno é estudante de desenvolvimento web, focado em aprender tecnologias modernas.',
    'estudos': 'Atualmente Bruno está estudando React, TypeScript e aprofundando JavaScript.',
    'default': 'Interessante! Você pode navegar pelo portfolio para saber mais sobre Bruno ou fazer outras perguntas.'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simula delay de resposta
    setTimeout(() => {
      const key = Object.keys(responses).find(k => 
        input.toLowerCase().includes(k)
      );
      const response = responses[key] || responses.default;
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">
                🤖 Assistente do Bruno
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Online agora
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;