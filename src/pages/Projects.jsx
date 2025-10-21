import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import AnimatedBackground from '../components/AnimatedBackground'

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('Todos')

  const projects = [
    {
      id: 1,
      title: 'E-commerce React',
      description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
      image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=E-commerce',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demo: 'https://exemplo.com',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 2,
      title: 'App Mobile React Native',
      description: 'Aplicativo mobile para delivery com geolocalização e pagamentos integrados.',
      image: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Mobile+App',
      tags: ['React Native', 'Firebase', 'Maps API'],
      demo: 'https://exemplo.com',
      github: 'https://github.com/exemplo',
      category: 'Mobile'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos e relatórios em tempo real.',
      image: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Dashboard',
      tags: ['React', 'D3.js', 'Python', 'AWS'],
      demo: 'https://exemplo.com',
      github: 'https://github.com/exemplo',
      category: 'Web'
    }
  ]

  const filters = ['Todos', 'Web', 'Mobile']

  const filteredProjects = selectedFilter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter)

  return (
    <AnimatedBackground className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meus Projetos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e projetos pessoais
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Nenhum projeto encontrado para esta categoria.
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedBackground>
  )
}

export default Projects