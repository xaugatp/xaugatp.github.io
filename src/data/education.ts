import type { Education } from '@/types'

export const education: Education[] = [
  {
    id: 'cdu',
    institution: 'Charles Darwin University',
    degree: 'Master of Information Technology (AI Major)',
    period: 'Jul 2025 – Jul 2027',
    logo: '/assets/images/logos/cdu-logo.png',
    logoFallback: 'CDU',
    skills: 'Artificial Intelligence, Machine Learning, Edge Computing, NLP',
    status: 'in-progress',
  },
  {
    id: 'torrens',
    institution: 'Torrens University Australia',
    degree: 'Bachelor of Software Engineering (AI)',
    period: 'May 2022 – May 2025',
    logo: '/assets/images/logos/torrens-logo.png',
    logoFallback: 'TU',
    skills: 'AI, Deep Learning, Software Engineering, Data Science',
    status: 'completed',
  },
]
