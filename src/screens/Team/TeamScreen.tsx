import React, { useEffect } from 'react';
import { Animated, StatusBar, View } from 'react-native';
import { NavigationProps, TeamMember } from './types';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import TeamHeader from './components/TeamHeader';
import TeamMembersList from './components/TeamMembersList';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import GlobalFooter from '../../components/Footer';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

// Importando avatar placeholder
// Nota: O ideal seria ter fotos reais da equipe, mas usaremos um placeholder genérico
// const avatarPlaceholder = require('../../../assets/icons/Logo-Vazio.png'); // Remova ou comente esta linha se não for mais necessária

/**
 * Dados dos membros da equipe
 */
const teamMembers: TeamMember[] = [
 {
   id: '3',
   name: 'Daniel Bezerra',
   role: 'Back-end Dev',
   description: 'Responsável pela estrutura do back-end, desenvolvimento da API, organização do banco de dados e integração com o app.',
   imageSource: require('../../../assets/images/team/daniel-avatar2.png'), // Caminho da imagem de Daniel
   github: 'https://github.com/Daniel151296',
   linkedin: 'https://www.linkedin.com/in/daniel357/',
 },
 {
   id: '2',
   name: 'José Alexandre',
   role: 'Pesquisa & Apresentação',
   description: 'Responsável pela pesquisa, documentação e apresentação do projeto, atuando no mapeamento de requisitos e comunicação.',
   imageSource: require('../../../assets/images/team/jose-avatar.png'), // Caminho da imagem de José
   github: 'https://github.com/ycastiel',
   linkedin: 'https://www.linkedin.com/in/alexandre-de-farias-61a90a308/',
 },
 {
   id: '1',
   name: 'Macauly Vivaldo',
   role: 'Front-end & UX/UI',
   description: 'Responsável pela interface visual, criação e prototipagem das telas para uma experiência agradável ao usuário.',
   imageSource: require('../../../assets/images/team/macauly-avatar.png'), // Caminho da imagem de Macauly
   github: 'https://github.com/MacaulyV',
   linkedin: 'https://www.linkedin.com/in/macauly-vivaldo-da-silva-1a1514277/',
 },
];


/**
 * Tela de apresentação da equipe com animações e detalhes visuais
 */
const TeamScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // Inicializar todos os valores de animação
  const animValues = useAnimationValues();
  
  // Hooks para gerenciar partículas
  const { 
    backgroundParticles, 
    middleParticles, 
    foregroundParticles, 
    animateParticle, 
    animateParallaxLayers 
  } = useParticleAnimation();
  
  // Hooks para gerenciar animações de conteúdo
  const { 
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateContainer,
    initializeAndAnimateTeamCards,
    animateFooter,
    animateNavBar,
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { handleBack } = useNavigation(animValues, navigation);
  
  // Iniciar todas as animações quando o componente for montado
  useEffect(() => {
    // Inicializar e animar a tela em ordem
    const initAnimations = async () => {
      try {
        // Primeiro inicializar os valores dos cards
        initializeAndAnimateTeamCards(teamMembers);
        
        // Aguardar um pequeno momento para garantir que os valores foram inicializados
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Continuar com o restante das animações
        animateScreenEntry();
        animateBackground();
        
        // Animar efeito parallax
        animateParallaxLayers(
          animValues.backgroundParallax,
          animValues.middleLayerParallax,
          animValues.foregroundParallax
        );
        
        // Animar conteúdo
        animateTitle();
        animateContainer();
        animateFooter();
        
        // Animar navbar
        animateNavBar();
        
        // Animar cada partícula
        [...backgroundParticles, ...middleParticles, ...foregroundParticles]
          .forEach(animateParticle);
      } catch (error) {
        console.error("Erro ao animar tela:", error);
      }
    };
    
    initAnimations();
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <Animated.View 
        style={[
          styles.container,
          { 
            opacity: animValues.screenOpacity,
            transform: [{ translateX: animValues.screenSlide }] 
          }
        ]}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        
        {/* Fundo com gradiente */}
        <GradientBackground 
          gradientOpacity={animValues.gradientOpacity} 
          blurIntensity={animValues.blurIntensity} 
        />
        
        {/* Sistema de partículas */}
        <ParticleSystem
          backgroundParticles={backgroundParticles}
          middleParticles={middleParticles}
          foregroundParticles={foregroundParticles}
        />
        
        {/* Container principal */}
        <View style={styles.contentContainer}>
          {/* Título da seção */}
          <View style={styles.header}>
            <TeamHeader
              titleOpacity={animValues.titleOpacity}
              titleTranslateY={animValues.titleTranslateY}
            />
          </View>
          
          {/* Lista de membros da equipe */}
          <View style={styles.mainContent}>
            <TeamMembersList
              containerOpacity={animValues.containerOpacity}
              containerTranslateY={animValues.containerTranslateY}
              teamMembers={teamMembers}
              teamMemberCards={animValues.teamMemberCards}
            />
          </View>
          
          {/* Rodapé da página (não o footer de navegação) */}
          <View style={styles.footer}>
            <Footer
              footerOpacity={animValues.footerOpacity}
              footerTranslateY={animValues.footerTranslateY}
            />
          </View>
        </View>
        
        {/* Barra de navegação inferior global */}
        <GlobalFooter
          activeScreen="team"
          navigation={navigation}
          opacity={animValues.navBarOpacity}
        />
      </Animated.View>
      
      {/* Navbar no topo da tela */}
      <NavBar/>
    </View>
  );
};

export default TeamScreen; 