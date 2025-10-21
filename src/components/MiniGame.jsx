import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MiniGame = () => {
  const [gameType, setGameType] = useState('quiz');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quizQuestions = [
    {
      question: "Qual tag HTML é usada para criar um link?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: 1
    },
    {
      question: "Como declarar uma variável em JavaScript?",
      options: ["var x", "let x", "const x", "Todas as anteriores"],
      correct: 3
    },
    {
      question: "Qual propriedade CSS controla o espaçamento interno?",
      options: ["margin", "padding", "border", "spacing"],
      correct: 1
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }
      
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Quiz Concluído!
        </h3>
        <div className="text-4xl font-bold text-primary-500 mb-2">
          {score}/{quizQuestions.length}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {score === quizQuestions.length ? 'Perfeito! 🏆' : 
           score >= quizQuestions.length / 2 ? 'Bom trabalho! 👏' : 'Continue estudando! 📚'}
        </p>
        <button
          onClick={resetGame}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Jogar Novamente
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          🎮 Quiz de Programação
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {currentQuestion + 1}/{quizQuestions.length}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            {quizQuestions[currentQuestion].question}
          </h4>

          <div className="space-y-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === null
                    ? 'border-gray-200 dark:border-gray-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    : selectedAnswer === index
                    ? index === quizQuestions[currentQuestion].correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : index === quizQuestions[currentQuestion].correct
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-600 opacity-50'
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Pontuação: {score}/{quizQuestions.length}
        </span>
      </div>
    </div>
  );
};

export default MiniGame;