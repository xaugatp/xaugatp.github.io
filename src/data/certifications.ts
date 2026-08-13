import type { Certification } from '@/types'

export const certifications: Certification[] = [
  {
    id: 'azure-ai-102',
    title: 'Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    logo: 'https://learn.microsoft.com/en-us/credentials/certifications/media/certification-badges/certification-badge-microsoft-certified-azure-ai-engineer-associate.svg',
    logoFallback: '☁️',
    status: 'in-progress',
  },
  {
    id: 'govhack',
    title: 'GovHack NT Challenge — Honorable Mention',
    issuer: 'GovHack',
    logo: '/assets/images/logos/govhack-logo.png',
    logoFallback: '🏆',
    highlight: true,
  },
  {
    id: 'deeplearning-ml',
    title: 'Machine Learning Certification',
    issuer: 'DeepLearning.AI',
    logo: '/assets/images/logos/deeplearning-ai-logo.png',
    credentialUrl: '/assets/documents/certificates/ml-specialization-certificate.pdf',
  },
  {
    id: 'pwskills',
    title: 'Data Science Bootcamp',
    issuer: 'PwSkills',
    logo: '/assets/images/logos/pwskills-logo.png',
    credentialUrl: '/assets/documents/certificates/pwskills-certificate.pdf',
  },
  {
    id: 'british-airways',
    title: 'British Airways Job Simulation',
    issuer: 'British Airways',
    logo: '/assets/images/logos/british-airways-logo.png',
    logoFallback: 'BA',
    credentialUrl: '/assets/documents/certificates/british-airways-certificate.pdf',
  },
  {
    id: 'commonwealth-bank',
    title: 'Commonwealth Bank Job Simulation',
    issuer: 'Commonwealth Bank',
    logo: '/assets/images/logos/commonwealth-bank-logo.png',
    logoFallback: 'CBA',
    credentialUrl: '/assets/documents/certificates/commonwealth-bank-certificate.pdf',
  },
]
