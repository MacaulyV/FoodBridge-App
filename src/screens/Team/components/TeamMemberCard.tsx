import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Image, 
  TouchableOpacity, 
  Linking, 
  Platform,
  Pressable 
} from 'react-native';
import { TeamMemberCardProps } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Componente de card para cada membro da equipe com interações e animações avançadas
 */
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  description,
  imageSource,
  github,
  linkedin,
  cardOpacity,
  cardScale,
  cardTranslateY,
  delay,
}) => {
  // Estados para controlar interações e animações
  const [isPressed, setIsPressed] = useState(false);
  
  // Valores para as animações de interação
  const githubScale = React.useRef(new Animated.Value(1)).current;
  const linkedinScale = React.useRef(new Animated.Value(1)).current;
  const avatarScale = React.useRef(new Animated.Value(1)).current;
  const cardElevation = React.useRef(new Animated.Value(1)).current;
  const cardBorderGlow = React.useRef(new Animated.Value(0)).current;
  const contentTranslateY = React.useRef(new Animated.Value(0)).current;
  const avatarRotate = React.useRef(new Animated.Value(0)).current;
  
  // Garantir que os valores de animação são válidos
  const safeCardOpacity = cardOpacity || new Animated.Value(1);
  const safeCardScale = cardScale || new Animated.Value(1);
  const safeCardTranslateY = cardTranslateY || new Animated.Value(0);
  const safeDelay = delay || 0;
  
  // Animações contínuas para o avatar e efeitos sutis
  useEffect(() => {
    // Animação sutil de respiração para o avatar
    Animated.loop(
      Animated.sequence([
        Animated.delay(safeDelay + 800 + Math.random() * 500),
        Animated.timing(avatarScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Rotação muito sutil do avatar para dar sensação de vida
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarRotate, {
          toValue: 0.02, // Apenas 2% de rotação
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(avatarRotate, {
          toValue: -0.02, // -2% de rotação
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(avatarRotate, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  // Manipuladores de interação para efeitos de hover/press
  const handlePressIn = () => {
    setIsPressed(true);
    
    // Animar elevação e brilho ao pressionar
    Animated.parallel([
      Animated.spring(cardElevation, {
        toValue: 1.08,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(cardBorderGlow, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(contentTranslateY, {
        toValue: -5,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  const handlePressOut = () => {
    setIsPressed(false);
    
    // Retornar à aparência normal quando soltar
    Animated.parallel([
      Animated.spring(cardElevation, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(cardBorderGlow, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(contentTranslateY, {
        toValue: 0,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Função para animação ao pressionar o ícone do GitHub com efeito de pop
  const animateGithubPress = () => {
    Animated.sequence([
      Animated.spring(githubScale, {
        toValue: 1.4,
        friction: 3, // Menos fricção para efeito mais elástico
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(githubScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Abrir o link do GitHub
      Linking.openURL(github);
    });
  };
  
  // Função para animação ao pressionar o ícone do LinkedIn com efeito de pop
  const animateLinkedinPress = () => {
    Animated.sequence([
      Animated.spring(linkedinScale, {
        toValue: 1.4,
        friction: 3, // Menos fricção para efeito mais elástico
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(linkedinScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Abrir o link do LinkedIn
      Linking.openURL(linkedin);
    });
  };
  
  // Converter o valor de animação de rotação para graus (em string)
  const avatarRotateInterpolate = avatarRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });
  
  // Interpolação para o brilho da borda
  const borderColorInterpolate = cardBorderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.1)', 'rgba(18, 176, 91, 0.5)']
  });
  
  // Interpolação para o brilho do box-shadow
  const shadowOpacityInterpolate = cardBorderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6]
  });
  
  // Interpolação para a cor de fundo do cartão
  const backgroundColorInterpolate = cardBorderGlow.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.12)']
  });

  // Estilos dinâmicos para o fundo do cartão  
  const cardBackgroundStyle = {
    ...styles.cardBackground,
    borderColor: borderColorInterpolate
  };
  
  return (
    <Pressable 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      <Animated.View
        style={[
          styles.card,
          {
            opacity: safeCardOpacity,
            transform: [
              { translateY: safeCardTranslateY },
              { scale: Animated.multiply(safeCardScale, cardElevation) }
            ],
          },
        ]}
      >
        <Animated.View style={cardBackgroundStyle}>
          <LinearGradient
            colors={['#070F1B', '#0D1723', '#182B3A']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.contentContainer,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          {/* Avatar animado com efeito de pulsação sutil */}
          <Animated.View 
            style={[
              styles.avatarContainer,
              { 
                transform: [
                  { scale: avatarScale },
                  { rotate: avatarRotateInterpolate }
                ] 
              }
            ]}
          >
            <Image
              source={imageSource}
              style={styles.avatar}
              resizeMode="cover"
            />
          </Animated.View>
          
          {/* Nome e cargo */}
          <View style={styles.headerContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
          
          {/* Links sociais com efeitos interativos */}
          <View style={styles.socialLinks}>
            {/* GitHub */}
            <TouchableOpacity 
              onPress={animateGithubPress}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Animated.View 
                style={[
                  styles.socialIconContainer, 
                  { transform: [{ scale: githubScale }] }
                ]}
              >
                <Ionicons name="logo-github" size={26} color="#FFFFFF" />
              </Animated.View>
            </TouchableOpacity>
            
            {/* LinkedIn */}
            <TouchableOpacity 
              onPress={animateLinkedinPress}
              style={styles.socialButton}
              activeOpacity={0.7}
            >
              <Animated.View 
                style={[
                  styles.socialIconContainer, 
                  { transform: [{ scale: linkedinScale }] }
                ]}
              >
                <Ionicons name="logo-linkedin" size={26} color="#0077B5" />
              </Animated.View>
            </TouchableOpacity>
          </View>
          
          {/* Descrição */}
          <Text style={styles.description}>{description}</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#12B05B',
    ...Platform.select({
      ios: {
        shadowColor: '#12B05B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialButton: {
    marginHorizontal: 5,
    padding: 5,
  },
  socialIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default TeamMemberCard; 