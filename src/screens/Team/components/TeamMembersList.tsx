import React, { useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Animated, 
  NativeScrollEvent, 
  NativeSyntheticEvent,
  Dimensions
} from 'react-native';
import { TeamMembersListProps, TeamMember } from '../types';
import TeamMemberCard from './TeamMemberCard';

/**
 * Lista de membros da equipe com animações e detecção de visualização
 */
const TeamMembersList: React.FC<TeamMembersListProps & { 
  teamMembers: TeamMember[],
  teamMemberCards: {
    cardOpacity: Animated.Value[];
    cardScale: Animated.Value[];
    cardTranslateY: Animated.Value[];
  }
}> = ({
  containerOpacity,
  containerTranslateY,
  teamMembers,
  teamMemberCards
}) => {
  // Referência para controlar o ScrollView
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Estado para rastrear cards visíveis
  const [visibleIndices, setVisibleIndices] = useState<{[key: string]: boolean}>({});
  
  // Valores de animação para parallax durante o scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Dimensões da tela
  const { height: screenHeight } = Dimensions.get('window');
  
  // Garantir que os valores de animação do container são válidos
  const safeContainerOpacity = containerOpacity || new Animated.Value(1);
  const safeContainerTranslateY = containerTranslateY || new Animated.Value(0);
  
  // Garantir que teamMemberCards e seus arrays existem
  const safeTeamMemberCards = teamMemberCards || {
    cardOpacity: [],
    cardScale: [],
    cardTranslateY: []
  };
  
  // Manipular evento de scroll para animar elementos - sem usar Animated.event que causa conflitos
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Atualizar manualmente o valor de scrollY
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
    
    // Chamar a função de detecção de visibilidade
    onScrollListener(event);
  };
  
  // Detector de visibilidade dos cards durante o scroll
  function onScrollListener(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    
    // Para cada card, verificar se está visível na tela
    teamMembers.forEach((member, index) => {
      // Estimativa da posição do card (simplificada)
      const cardHeight = 300; // Altura estimada de cada card
      const cardSpacing = 20; // Espaçamento uniforme entre cards
      const cardTop = index * (cardHeight + cardSpacing);
      const cardBottom = cardTop + cardHeight;
      
      // Verificar se o card está visível
      const isVisible = (
        cardBottom > contentOffset.y && 
        cardTop < contentOffset.y + layoutMeasurement.height
      );
      
      // Se a visibilidade mudou, atualizar o estado
      if (isVisible !== !!visibleIndices[member.id]) {
        setVisibleIndices(prev => ({
          ...prev,
          [member.id]: isVisible
        }));
        
        // Animar sutilmente o card quando ele se torna visível
        if (isVisible) {
          Animated.sequence([
            Animated.spring(safeTeamMemberCards.cardScale[index], {
              toValue: 1.03,
              friction: 8,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.spring(safeTeamMemberCards.cardScale[index], {
              toValue: 1,
              friction: 8,
              tension: 50,
              useNativeDriver: true,
            })
          ]).start();
        }
      }
    });
  }
  
  // Criar interpolações para movimentos parallax durante o scroll
  const createParallaxStyle = (index: number) => {
    // Fator de parallax diferente para cada card
    const factor = 0.1 + (index * 0.05);
    
    // Interpolação para movimento parallax vertical
    const translateY = scrollY.interpolate({
      inputRange: [-screenHeight, 0, screenHeight],
      outputRange: [screenHeight * factor, 0, -screenHeight * factor],
      extrapolate: 'clamp'
    });
    
    return {
      transform: [{ translateY }]
    };
  };
  
  // Determinar estilo do container do card com base no índice para adicionar espaçamento especial
  const getCardContainerStyle = (index: number) => {
    // Aplicar espaçamento maior entre o card 2 e o card 3
    // Nota: O espaçamento é aplicado no container do card 2, que é o índice 1 (já que começa em 0)
    if (index === 1) {
      return [styles.cardContainer, styles.extraSpaceBelow];
    }
    return styles.cardContainer;
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: safeContainerOpacity,
          transform: [{ translateY: safeContainerTranslateY }]
        }
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // 60fps
      >
        {/* Espaço adicional no topo para melhorar o layout */}
        <View style={styles.topPadding} />
        
        {/* Lista de cards de membros da equipe */}
        {teamMembers.map((member, index) => (
          <View key={member.id} style={getCardContainerStyle(index)}>
            <Animated.View style={createParallaxStyle(index)}>
              <TeamMemberCard
                name={member.name}
                role={member.role}
                description={member.description}
                imageSource={member.imageSource}
                github={member.github}
                linkedin={member.linkedin}
                cardOpacity={safeTeamMemberCards.cardOpacity[index]}
                cardScale={safeTeamMemberCards.cardScale[index]}
                cardTranslateY={safeTeamMemberCards.cardTranslateY[index]}
                delay={index * 150}
              />
            </Animated.View>
          </View>
        ))}
        
        {/* Espaço adicional no final para melhorar o scroll */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topPadding: {
    height: 25,
  },
  bottomPadding: {
    height: 60,
  },
  cardContainer: {
    marginBottom: 20,
    width: '100%',
  },
  extraSpaceBelow: {
    marginBottom: 40, // Espaçamento maior entre o card 2 e o card 3
  },
});

export default TeamMembersList; 