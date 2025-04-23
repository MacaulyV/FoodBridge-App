import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  type,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel
}) => {
  // Animação para entrada do alerta
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      // Animar entrada
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      // Animar saída
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visible]);
  
  // Definir ícone e cores com base no tipo de alerta
  let icon: string;
  let gradient: string[];
  
  switch (type) {
    case 'error':
      icon = 'alert-circle';
      gradient = ['#FF4A4A', '#D01117'];
      break;
    case 'warning':
      icon = 'warning';
      gradient = ['#FF9800', '#FF7F50'];
      break;
    case 'success':
      icon = 'checkmark-circle';
      gradient = ['#4CAF50', '#12B05B'];
      break;
    case 'info':
    default:
      icon = 'information-circle';
      gradient = ['#3498DB', '#1A5276'];
      break;
  }
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="none"
    >
      <BlurView intensity={30} style={styles.blurContainer} tint="dark">
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.alertContainer}>
            <LinearGradient
              colors={['rgba(18, 25, 35, 0.95)', 'rgba(10, 15, 20, 0.98)']}
              style={styles.alertBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            
            {/* Cabeçalho com ícone */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={gradient}
                style={styles.iconBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={icon as any} size={32} color="#FFFFFF" />
              </LinearGradient>
            </View>
            
            {/* Conteúdo */}
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
            
            {/* Botões */}
            <View style={cancelText ? styles.buttonContainerDouble : styles.buttonContainer}>
              {cancelText && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}
                  activeOpacity={0.8}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[
                  styles.button, 
                  styles.confirmButton,
                  { backgroundColor: gradient[0] }
                ]}
                onPress={onConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: width * 0.85,
    maxWidth: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    width: '100%',
    borderRadius: 35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  alertBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    padding: 16,
    paddingTop: 8,
  },
  buttonContainerDouble: {
    padding: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: '#12B05B',
  },
  cancelButton: {
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
});

export default CustomAlert; 