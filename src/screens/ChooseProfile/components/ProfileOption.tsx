import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileOptionProps } from '../types';

/**
 * Componente para exibir uma opção de perfil (Doar ou Receber) com estilo aprimorado
 * e animação de clique
 */
const ProfileOption: React.FC<ProfileOptionProps> = ({
  title,
  description,
  icon,
  optionOpacity,
  optionScale,
  onPress,
}) => {
  // Determinar cores com base no título (Doar ou Receber)
  const isDonate = title.includes('Doar');
  const primaryColor = isDonate ? '#FF9800' : '#12B05B';
  const secondaryColor = isDonate ? '#ffb74d' : '#4caf50';
  const backgroundColor = isDonate ? 'rgba(255, 152, 0, 0.08)' : 'rgba(18, 176, 91, 0.08)';
  const shadowColor = isDonate ? 'rgba(255, 152, 0, 0.8)' : 'rgba(18, 176, 91, 0.8)';
  
  // Valor de animação para o efeito de clique
  const clickAnimation = useRef(new Animated.Value(1)).current;
  
  // Função para animar o clique
  const animateClick = () => {
    // Sequência de animação: diminui e depois volta ao tamanho original com um pequeno bounce
    Animated.sequence([
      // Primeiro diminui o tamanho (efeito de pressionar)
      Animated.timing(clickAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      // Depois aumenta um pouco além do tamanho normal (efeito de soltar)
      Animated.timing(clickAnimation, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      // Finalmente volta ao tamanho normal
      Animated.timing(clickAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Executa o callback de onPress quando a animação terminar
      onPress();
    });
  };
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: optionOpacity,
          transform: [{ scale: optionScale }],
        }
      ]}
    >
      <Animated.View 
        style={[
          styles.cardContainer,
          { 
            transform: [{ scale: clickAnimation }],
            shadowColor: shadowColor
          }
        ]}
      >
        <TouchableOpacity
          onPress={animateClick}
          activeOpacity={0.9}
          style={[
            styles.touchable,
            { 
              backgroundColor: backgroundColor,
              borderColor: primaryColor,
            }
          ]}
        >
          <View style={styles.content}>
            <View style={[
              styles.circleContainer,
              { 
                borderColor: primaryColor,
                shadowColor: primaryColor,
              }
            ]}>
              <Ionicons 
                name={icon} 
                size={38}
                color={primaryColor} 
              />
            </View>
            
            <Text style={[styles.title, { color: primaryColor }]}>
              {title}
            </Text>
            
            <Text style={[styles.description, { color: isDonate ? '#f5f5f5' : '#f5f5f5' }]}>
              {description}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cardContainer: {
    width: '100%',
    // Sombra forte e colorida
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
  },
  touchable: {
    borderRadius: 25,
    width: '100%',
    borderWidth: 2,
    height: 200,
    // Propriedades adicionais para destacar o card
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  circleContainer: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'rgba(32, 32, 32, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
});

export default ProfileOption; 