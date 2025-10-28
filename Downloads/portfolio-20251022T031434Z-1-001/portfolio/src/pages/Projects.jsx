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
      image: '/assets/ecommerce.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demo: 'https://e-commerce-react-sand.vercel.app/',
      github: 'https://github.com/Brun05ouza/E-commerce-React-',
      category: 'Web'
    },
    {
      id: 2,
      title: 'Culture Hub',
      description: 'Plataforma para descoberta e divulgação de eventos culturais com sistema de reservas.',
      image: '/assets/culture-hub.png',
      tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      demo: 'Em breve no Vercel',
      github: 'https://github.com/Brun05ouza/culture-hub',
      category: 'Web'
    },
    {
      id: 3,
      title: 'App Mobile React Native',
      description: 'Aplicativo mobile para delivery com geolocalização e pagamentos integrados.',
      image: '/assets/appmobile.png',
      tags: ['React Native', 'Firebase', 'Maps API'],
      demo: '/project/3',
      github: 'https://github.com/exemplo',
      category: 'Mobile'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos e relatórios em tempo real.',
      image: '/assets/dashboard.png',
      tags: ['React', 'D3.js', 'Python', 'AWS'],
      demo: 'https://dashboard-analytics-peach.vercel.app',
      github: 'https://github.com/Brun05ouza/DashboardAnalytics',
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