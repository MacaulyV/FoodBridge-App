import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface BottomSheetProps {
  translateY: Animated.Value;
  shrinkContent: Animated.Value;
  expanded: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  translateY,
  shrinkContent,
  expanded,
  onClose,
  children
}) => {
  // Calcula a altura do bottom sheet com base no estado de expansão
  const bottomSheetHeight = useMemo(() => {
    return expanded ? height * 0.7 : height * 0.4;
  }, [expanded]);

  // Renderiza o conteúdo do bottom sheet
  const renderContent = useCallback(() => {
    return (
      <Animated.View
        style={[
          styles.content,
          {
            height: bottomSheetHeight,
            transform: [
              { translateY },
              { scale: shrinkContent }
            ]
          }
        ]}
      >
        <BlurView intensity={70} tint="dark" style={styles.blurContainer}>
          <View style={styles.header}>
            <View style={styles.headerHandle} />
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Feather name="x" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        </BlurView>
      </Animated.View>
    );
  }, [translateY, shrinkContent, bottomSheetHeight, children, onClose]);

  return renderContent();
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    elevation: 5,
  },
  blurContainer: {
    flex: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: 1,
  },
  headerHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    top: 12,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
});

export default BottomSheet; 