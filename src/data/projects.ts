import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'train-ticket',
    title: 'Train Ticket Sales Management',
    category: 'Desktop System',
    tags: 'Java • SQL Server • JDBC',
    image: '/images/project_train_ticket.jpg',
    githubUrl: 'https://github.com/quocbaong/qlbanvetau',
    description: 'Enterprise ticket booking & seat reservation system with ACID transactional guarantees and revenue reporting.',
  },
  {
    id: 'socialpilot-pro',
    title: 'SocialPilot Pro',
    category: 'Desktop Automation',
    tags: 'Electron • TypeScript • Node.js • Express',
    image: '/images/project2.jpg',
    githubUrl: 'https://github.com/quocbaong/SocialPilot',
    description: 'All-in-one social media automation platform for downloading watermark-free videos, batch scanning, and publishing.',
  },
  {
    id: 'food-delivery',
    title: 'Food Delivery Website (Food Del)',
    category: 'Web Platform',
    tags: 'React.js • Tailwind CSS • REST API',
    image: '/images/project_food_del_clean.jpg',
    githubUrl: 'https://github.com/quocbaong/Food_Delivery_Website',
    liveUrl: 'https://fooddeliverywebsite-two.vercel.app/',
    description: 'Online food ordering platform with reactive cart management, real-time checkout simulation, and admin menu dashboard.',
  },
  {
    id: 'traveling-app',
    title: 'Traveling Tour Explorer App',
    category: 'Mobile App',
    tags: 'React Native • Expo • MongoDB • REST API',
    image: '/images/project_traveling.jpg',
    githubUrl: 'https://github.com/quocbaong/Travelling-App',
    description: 'Mobile travel guide helping users search for tourist destinations, plan customized itineraries, and book tours.',
  },
];
