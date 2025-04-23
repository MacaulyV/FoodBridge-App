import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TeamHeaderProps } from '../types';

/**
 * Componente para o título da tela "Sobre Nós"
 */
const TeamHeader: React.FC<TeamHeaderProps> = ({
  titleOpacity,
  titleTranslateY,
}) => {
  // Criando uma constante para o translateY adicional
  const additionalTranslateY = 15; // Valor em pixels para mover mais para baixo

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.titleContainer,
        {
          opacity: titleOpacity,
          transform: [
            { 
              translateY: Animated.add(
                titleTranslateY, 
                new Animated.Value(additionalTranslateY)
              ) 
            }
          ]
        }
      ]}>
        <Text style={styles.title}>Sobre Nós</Text>
        <View style={styles.titleUnderline} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    marginTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 80,
    height: 3,
    backgroundColor: '#1E90FF',
    borderRadius: 2,
    marginTop: 5,
  },
});

export default TeamHeader; 