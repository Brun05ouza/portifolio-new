import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PresentationMode = () => {
  const [isPresenting, setIsPresenting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Bruno Souza",
      subtitle: "Estudante de Desenvolvimento Web",
      content: "Apaixonado por tecnologia e sempre aprendendo",
      icon: "👋"
    },
    {
      title: "Minhas Skills",
      subtitle: "Tecnologias que domino",
      content: "HTML, CSS, JavaScript, React, PostgreSQL",
      icon: "💻"
    },
    {
      title: "Projetos",
      subtitle: "O que já criei",
      content: "Portfolio responsivo, Landing pages, Projetos de estudo",
      icon: "🚀"
    },
    {
      title: "Objetivos",
      subtitle: "Onde quero chegar",
      content: "Desenvolvedor Full Stack, Especialista em React",
      icon: "🎯"
    }
  ];

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPresenting) return;
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      } else if (e.key === 'Escape') {
        setIsPresenting(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPresenting, slides.length]);

  return (
    <>
      {/* Presentation Button */}
      <button
        onClick={() => setIsPresenting(true)}
        className="fixed top-20 right-4 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg shadow-lg z-40 text-sm font-medium"
      >
        🎯 Modo Apresentação
      </button>

      {/* Presentation Overlay */}
      <AnimatePresence>
        {isPresenting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="w-full h-full flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-center text-white max-w-4xl"
                >
                  <div className="text-8xl mb-8">{slides[currentSlide].icon}</div>
                  <h1 className="text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
                  <h2 className="text-3xl text-gray-300 mb-8">{slides[currentSlide].subtitle}</h2>
                  <p className="text-xl text-gray-400">{slides[currentSlide].content}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg"
              >
                ←
              </button>
              
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg"
              >
                →
              </button>
            </div>

            {/* Exit Button */}
            <button
              onClick={() => setIsPresenting(false)}
              className="absolute top-8 right-8 bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg"
            >
              ✕ ESC
            </button>

            {/* Instructions */}
            <div className="absolute bottom-8 right-8 text-white/60 text-sm">
              Use ← → ou espaço para navegar
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PresentationMode;