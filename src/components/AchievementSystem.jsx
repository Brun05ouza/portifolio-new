import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AchievementSystem = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showNotification, setShowNotification] = useState(null);

  const achievements = [
    { id: 'visitor', title: 'Primeiro Visitante', desc: 'Visitou o portfolio', icon: '👋', unlocked: true },
    { id: 'explorer', title: 'Explorador', desc: 'Visitou todas as páginas', icon: '🗺️', unlocked: false },
    { id: 'terminal', title: 'Hacker', desc: 'Usou o terminal', icon: '💻', unlocked: false },
    { id: 'theme', title: 'Designer', desc: 'Mudou o tema', icon: '🎨', unlocked: false },
    { id: 'mobile', title: 'Mobile First', desc: 'Acessou pelo celular', icon: '📱', unlocked: false },
    { id: 'curious', title: 'Curioso', desc: 'Passou 5min no site', icon: '🤔', unlocked: false }
  ];

  useEffect(() => {
    // Simula desbloqueio de conquistas
    const timer = setTimeout(() => {
      const newAchievement = achievements.find(a => !a.unlocked && Math.random() > 0.7);
      if (newAchievement) {
        setShowNotification(newAchievement);
        setTimeout(() => setShowNotification(null), 3000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        🏆 Conquistas
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg text-center transition-all ${
              achievement.unlocked 
                ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400' 
                : 'bg-gray-100 dark:bg-gray-700 opacity-50'
            }`}
          >
            <div className="text-2xl mb-2">{achievement.icon}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {achievement.title}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {achievement.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Achievement Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{showNotification.icon}</span>
            <div>
              <div className="font-bold">Conquista Desbloqueada!</div>
              <div className="text-sm">{showNotification.title}</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AchievementSystem;