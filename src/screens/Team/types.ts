import { Animated } from 'react-native';

// Propriedades para navegação
export interface NavigationProps {
  navigation: any;
}

// Props para o componente GradientBackground (reutilizado de outras telas)
export interface GradientBackgroundProps {
  gradientOpacity: Animated.Value;
  blurIntensity: Animated.Value;
}

// Props para o componente ParticleSystem (reutilizado de outras telas)
export interface ParticleSystemProps {
  backgroundParticles: ParticleData[];
  middleParticles: ParticleData[];
  foregroundParticles: ParticleData[];
}

// Tipos para as partículas (expandido com novos tipos)
export interface ParticleData {
  opacity: Animated.Value;
  translateX: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.Value;
  rotate: Animated.Value;
  type: 'circle' | 'star' | 'dot' | 'pulse';
  speedFactor: number;
  opacityFactor: number;
  delay: number;
  duration: number;
}

// Props para o componente NavBar
export interface NavBarProps {
  onBack: () => void;
}

// Props para o componente TeamHeader
export interface TeamHeaderProps {
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
}

// Props para o componente TeamMemberCard (expandido com novas props de interação)
export interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  imageSource: any;
  github: string;
  linkedin: string;
  cardOpacity: Animated.Value;
  cardScale: Animated.Value;
  cardTranslateY: Animated.Value;
  delay: number;
}

// Props para o componente TeamMembersList
export interface TeamMembersListProps {
  containerOpacity: Animated.Value;
  containerTranslateY: Animated.Value;
  teamMembers?: TeamMember[];
  teamMemberCards?: {
    cardOpacity: Animated.Value[];
    cardScale: Animated.Value[];
    cardTranslateY: Animated.Value[];
  };
}

// Props para o componente Footer
export interface FooterProps {
  footerOpacity: Animated.Value;
  footerTranslateY: Animated.Value;
}

// Props para o componente BottomNavBar
export interface BottomNavBarProps {
  navBarOpacity: Animated.Value;
  navigation: any;
}

// Dados de um membro da equipe
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageSource: any;
  github: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
 {
   id: '3',
   name: 'Daniel Bezerra',
   role: 'Back-end Dev',
   description: 'Responsável pela estrutura do back-end, desenvolvimento da API, organização do banco de dados e integração com o app.',
   imageSource: require('../../../assets/imagens/daniel.png'),
   github: 'https://github.com/carolinasilva',
   linkedin: 'https://www.linkedin.com/in/daniel357/',
 },
 {
   id: '2',
   name: 'José Alexandre',
   role: 'Pesquisa & Apresentação',
   description: 'Responsável pela pesquisa, documentação e apresentação do projeto, atuando no mapeamento de requisitos e comunicação.',
   imageSource: require('../../../assets/imagens/jose.png'),
   github: 'https://github.com/brunooliveira',
   linkedin: 'https://linkedin.com/in/brunooliveira',
 },
 {
   id: '1',
   name: 'Macauly Vivaldo',
   role: 'Front-end & UX/UI',
   description: 'Responsável pela interface visual, criação e prototipagem das telas para uma experiência agradável ao usuário.',
   imageSource: require('../../../assets/imagens/macauly.png'),
   github: 'https://github.com/MacaulyV',
   linkedin: 'https://www.linkedin.com/in/macauly-vivaldo-da-silva-1a1514277/',
 },
];