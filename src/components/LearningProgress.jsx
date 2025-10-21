import { motion } from 'framer-motion';
import { useState } from 'react';

const LearningProgress = () => {
  const [selectedPath, setSelectedPath] = useState('frontend');

  const learningPaths = {
    frontend: {
      name: 'Frontend Developer',
      icon: '🎨',
      totalSteps: 10,
      completed: 6,
      steps: [
        { name: 'HTML Básico', completed: true, level: 'Concluído' },
        { name: 'CSS & Flexbox', completed: true, level: 'Concluído' },
        { name: 'JavaScript ES6+', completed: true, level: 'Concluído' },
        { name: 'React Fundamentos', completed: true, level: 'Concluído' },
        { name: 'React Hooks', completed: true, level: 'Concluído' },
        { name: 'Vite & Build Tools', completed: true, level: 'Concluído' },
        { name: 'TypeScript', completed: false, level: 'Estudando' },
        { name: 'Next.js', completed: false, level: 'Próximo' },
        { name: 'Testing', completed: false, level: 'Planejado' },
        { name: 'Performance', completed: false, level: 'Planejado' }
      ]
    },
    backend: {
      name: 'Backend Developer',
      icon: '⚙️',
      totalSteps: 8,
      completed: 3,
      steps: [
        { name: 'SQL Básico', completed: true, level: 'Concluído' },
        { name: 'PostgreSQL', completed: true, level: 'Concluído' },
        { name: 'SQL Server', completed: true, level: 'Concluído' },
        { name: 'Node.js', completed: false, level: 'Estudando' },
        { name: 'Express.js', completed: false, level: 'Próximo' },
        { name: 'APIs REST', completed: false, level: 'Próximo' },
        { name: 'Authentication', completed: false, level: 'Planejado' },
        { name: 'Deploy & DevOps', completed: false, level: 'Planejado' }
      ]
    }
  };

  const currentPath = learningPaths[selectedPath];
  const progressPercentage = (currentPath.completed / currentPath.totalSteps) * 100;

  const getStepColor = (step) => {
    if (step.completed) return 'bg-green-500 text-white';
    if (step.level === 'Estudando') return 'bg-blue-500 text-white';
    if (step.level === 'Próximo') return 'bg-yellow-500 text-white';
    return 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        📚 Progresso de Aprendizado
      </h3>

      {/* Path Selector */}
      <div className="flex space-x-4 mb-6">
        {Object.entries(learningPaths).map(([key, path]) => (
          <button
            key={key}
            onClick={() => setSelectedPath(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedPath === key
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span>{path.icon}</span>
            <span className="text-sm font-medium">{path.name}</span>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progresso Geral
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentPath.completed}/{currentPath.totalSteps} ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Learning Steps */}
      <div className="space-y-3">
        {currentPath.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getStepColor(step)}`}>
                {step.completed ? '✓' : index + 1}
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {step.name}
              </span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStepColor(step)}`}>
              {step.level}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningProgress;