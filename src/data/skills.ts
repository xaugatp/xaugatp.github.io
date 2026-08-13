import type { SkillGroup } from '@/types'

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-engineering',
    title: 'Applied AI & LLM Systems',
    icon: 'Brain',
    skills: [
      'LangChain', 'LlamaIndex', 'RAG Architectures', 'FAISS',
      'ChromaDB', 'Vector Databases', 'OpenAI GPT-4', 'Mistral 7B',
      'Hugging Face', 'Prompt Engineering', 'Ollama Offline LLMs',
    ],
  },
  {
    id: 'ml-research',
    title: 'ML Research & Computer Vision',
    icon: 'Cpu',
    skills: [
      'PyTorch', 'TensorFlow', 'YOLOv8', 'OpenCV',
      'Grad-CAM Explainable AI', 'EfficientNet & Transfer Learning',
      'FinBERT NLP', 'SMOTE Imbalanced Learning', 'Scikit-Learn',
    ],
  },
  {
    id: 'fullstack',
    title: 'Fullstack Web Engineering',
    icon: 'Monitor',
    skills: [
      'Vue 3 (Composition API)', 'TypeScript', 'JavaScript',
      'C# / .NET 10', 'Python', 'FastAPI', 'Flask',
      'RESTful APIs', 'CQRS Pattern', 'Tailwind CSS v4',
    ],
  },
  {
    id: 'data-engineering',
    title: 'Databases & Data Engineering',
    icon: 'Database',
    skills: [
      'SQL Server', 'PostgreSQL', 'LinqToDB', 'FluentMigrator',
      'OCR Parsing (Google Vision API)', 'Pandas & NumPy',
      'Power BI Dashboards', 'Data Validation Pipelines',
    ],
  },
  {
    id: 'mlops-cloud',
    title: 'MLOps, Cloud & Infrastructure',
    icon: 'Cloud',
    skills: [
      'Docker Containerization', 'AWS & Azure Cloud', 'DJI Manifold3 Edge Hardware',
      'Linux Server Admin', 'Git / GitHub Workflows', 'CI/CD Pipelines',
      'Agile / Scrum Methodology',
    ],
  },
]
