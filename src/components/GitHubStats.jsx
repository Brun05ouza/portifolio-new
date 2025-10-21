import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = ({ username = 'seu-usuario' }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Simula dados do GitHub (substitua por API real)
    setStats({
      followers: 156,
      following: 89,
      publicRepos: 42,
      totalStars: 234,
      totalCommits: 1247
    });

    setRepos([
      { name: 'portfolio-react', stars: 45, language: 'JavaScript', description: 'Portfolio moderno com React' },
      { name: 'api-nodejs', stars: 23, language: 'TypeScript', description: 'API RESTful com Node.js' },
      { name: 'mobile-app', stars: 18, language: 'React Native', description: 'App mobile multiplataforma' }
    ]);
  }, [username]);

  if (!stats) return <div className="animate-pulse">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Repositórios em Destaque</h3>
        {repos.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{repo.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{repo.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {repo.language}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    ⭐ {repo.stars}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GitHubStats;