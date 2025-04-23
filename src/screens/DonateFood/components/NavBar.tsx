import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface NavBarProps {
  opacity: Animated.AnimatedInterpolation<string | number>;
}

/**
 * Componente de barra de navegação superior para a tela de Doação de Alimentos
 * Usando o mesmo gradiente padronizado em todas as telas
 */
const NavBar: React.FC<NavBarProps> = ({ opacity }) => {
  const navigation = useNavigation();
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleHelpModal = () => {
    if (helpModalVisible) {
      // Animar saída
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setHelpModalVisible(false);
      });
    } else {
      setHelpModalVisible(true);
      // Animar entrada
      Animated.timing(modalAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const modalScale = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const modalOpacity = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <>
      <Animated.View style={[styles.container, { opacity }]}>
        {/* Fundo sólido preto sob a navbar */}
        <View style={styles.solidBackground} />
        
        {/* Gradiente da navbar - usando o mesmo gradiente padronizado */}
        <LinearGradient
          colors={['#070F1B', '#0D1723', '#182B3A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.navContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Image 
                source={require('../../../../assets/icons/Logo-Vazio.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
              <Text style={styles.title}>Doar Alimentos</Text>
            </View>
            
            <TouchableOpacity
              style={styles.helpButton}
              onPress={toggleHelpModal}
              activeOpacity={0.7}
            >
              <Ionicons name="help-circle-outline" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      <Modal
        transparent={true}
        visible={helpModalVisible}
        animationType="none"
        onRequestClose={toggleHelpModal}
      >
        <TouchableWithoutFeedback onPress={toggleHelpModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <Animated.View 
                style={[
                  styles.helpContainer,
                  {
                    opacity: modalOpacity,
                    transform: [{ scale: modalScale }]
                  }
                ]}
              >
                <View style={styles.helpHeader}>
                  <Text style={styles.helpTitle}>Como fazer uma doação</Text>
                  <TouchableOpacity onPress={toggleHelpModal}>
                    <Ionicons name="close-outline" size={24} color="#555" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.helpContent}>
                  <View style={styles.helpItem}>
                    <Ionicons name="restaurant-outline" size={20} color="#5DB075" />
                    <Text style={styles.helpText}>Informe o nome do alimento a ser doado</Text>
                  </View>
                  
                  <View style={styles.helpItem}>
                    <Ionicons name="calendar-outline" size={20} color="#5DB075" />
                    <Text style={styles.helpText}>Selecione a data de validade do alimento</Text>
                  </View>
                  
                  <View style={styles.helpItem}>
                    <Ionicons name="location-outline" size={20} color="#5DB075" />
                    <Text style={styles.helpText}>Indique o bairro onde o alimento pode ser retirado</Text>
                  </View>
                  
                  <View style={styles.helpItem}>
                    <Ionicons name="images-outline" size={20} color="#5DB075" />
                    <Text style={styles.helpText}>Adicione fotos do alimento (opcional, mas recomendado)</Text>
                  </View>
                  
                  <View style={styles.helpItem}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#5DB075" />
                    <Text style={styles.helpText}>Confirme que o alimento está em boas condições</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  solidBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 120 : 100,
    backgroundColor: '#000000',
  },
  gradientBackground: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 44 : 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  helpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingBottom: 12,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  helpContent: {
    marginTop: 8,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
});

export default NavBar; 