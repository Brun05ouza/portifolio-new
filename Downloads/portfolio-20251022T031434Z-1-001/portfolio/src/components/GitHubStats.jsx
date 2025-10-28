import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = ({ username = 'Brun05ouza' }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Buscar dados do usuário
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Buscar repositórios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
        const reposData = await reposResponse.json();
        
        setStats({
          followers: userData.followers,
          following: userData.following,
          publicRepos: userData.public_repos,
          totalStars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
          totalCommits: 'N/A' // GitHub API não fornece commits totais facilmente
        });
        
        setRepos(reposData.map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language || 'N/A',
          description: repo.description || 'Sem descrição',
          url: repo.html_url
        })));
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
        // Fallback para dados simulados
        setStats({
          followers: 0,
          following: 0,
          publicRepos: 0,
          totalStars: 0,
          totalCommits: 'N/A'
        });
        setRepos([]);
      }
    };
    
    fetchGitHubData();
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
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => repo.url && window.open(repo.url, '_blank')}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{repo.name}</h4>
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