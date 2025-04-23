import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  Image
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

interface DeleteConfirmationModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * Modal de confirmação para excluir uma doação
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isVisible,
  onCancel,
  onConfirm
}) => {
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  useEffect(() => {
    if (isVisible) {
      // Animar entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Resetar animações quando o modal fecha
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [isVisible, fadeAnim, scaleAnim]);

  return (
    <Modal
      visible={isVisible}
      animationType="none" // Usamos nossas próprias animações
      transparent={true}
      onRequestClose={onCancel}
    >
      <Animated.View 
        style={[
          styles.centeredView, 
          { opacity: fadeAnim }
        ]}
      >
        <BlurView intensity={30} tint="dark" style={styles.blur}>
          <Animated.View 
            style={[
              styles.modalView,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <LinearGradient
              colors={['rgba(25, 118, 210, 0.4)', 'rgba(30, 40, 60, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBackground}
            >
              {/* Ícone animado */}
              <View style={styles.iconContainer}>
                <View style={styles.warningCircle}>
                  <FontAwesome name="trash" size={40} color="#FFFFFF" />
                </View>
              </View>
              
              {/* Título com estilo melhorado */}
              <Text style={styles.title}>Excluir Doação</Text>
              
              {/* Linha separadora com gradiente */}
              <LinearGradient
                colors={['transparent', '#1976D2', 'transparent']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.divider}
              />
              
              {/* Mensagem com texto mais amigável */}
              <Text style={styles.message}>
                Você está prestes a remover esta doação do sistema.{'\n'}
                Esta ação não poderá ser desfeita.
              </Text>
              
              {/* Botões com layout melhorado */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Ionicons name="close-circle-outline" size={20} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton]} 
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" style={styles.buttonIcon} />
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  blur: {
    width: width * 0.85,
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalView: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientBackground: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 24,
  },
  iconContainer: {
    marginBottom: 20,
  },
  warningCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(25, 118, 210, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 8,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  divider: {
    height: 1,
    width: '80%',
    marginVertical: 16,
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: 'rgba(90, 90, 90, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  confirmButton: {
    backgroundColor: 'rgba(25, 118, 210, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteConfirmationModal; 