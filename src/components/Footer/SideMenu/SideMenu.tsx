import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Props para o componente SideMenu
export interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

/**
 * Componente de Menu Lateral (Drawer) para o FoodBridge
 */
const SideMenu: React.FC<SideMenuProps> = ({
  isVisible,
  onClose,
  onNavigate,
  onLogout
}) => {
  // Dimensões da tela
  const { width } = Dimensions.get('window');
  
  // Animação para o menu
  const menuPosition = useRef(new Animated.Value(-width)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  
  // Animações para itens do menu (entrada escalonada)
  const menuItemsAnimation = useRef(Array(7).fill(0).map(() => new Animated.Value(0))).current;
  
  // Animação para o botão fechar
  const closeButtonScale = useRef(new Animated.Value(1)).current;
  const closeButtonRotation = useRef(new Animated.Value(0)).current;
  
  // Logo do FoodBridge
  const logoSource = require('../../../../assets/icons/Logo-Vazio.png');
  
  // Função para animar o botão fechar
  const animateCloseButton = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(closeButtonScale, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(closeButtonRotation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]),
      Animated.timing(closeButtonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
    
    // Fechar o menu com animação
    Animated.parallel([
      Animated.timing(menuPosition, {
        toValue: -width,
        duration: 350,
        useNativeDriver: true
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true
      }),
      // Animação escalonada para saída dos itens do menu (reversa)
      ...menuItemsAnimation.map((anim, index) => 
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          delay: 50 + ((menuItemsAnimation.length - 1 - index) * 30),
          useNativeDriver: true
        })
      )
    ]).start(() => {
      // Chamar o callback de fechamento após a animação terminar
      onClose();
    });
  };
  
  // Função para tratar o fechamento com animação
  const handleClose = () => {
    animateCloseButton();
  };
  
  // Efeito para animar abertura e fechamento do menu
  useEffect(() => {
    if (isVisible) {
      // Animar abertura
      Animated.parallel([
        Animated.timing(menuPosition, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true
        }),
        // Animar entrada dos itens do menu em sequência
        ...menuItemsAnimation.map((anim, index) => 
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            delay: 100 + (index * 40),
            useNativeDriver: true
          })
        )
      ]).start();
      
      // Resetar rotação do botão fechar
      closeButtonRotation.setValue(0);
    } else {
      // Reiniciar posição do menu sem animação
      menuPosition.setValue(-width);
      overlayOpacity.setValue(0);
      menuItemsAnimation.forEach(anim => anim.setValue(0));
    }
  }, [isVisible]);
  
  // Lista de itens do menu
  const menuItems = [
    { id: 'donations', name: 'Doações', icon: 'gift-outline', screen: 'DonationsFeed' },
    { id: 'profile', name: 'Perfil', icon: 'person-outline', screen: 'Profile' },
    { id: 'team', name: 'Time', icon: 'people-outline', screen: 'Team' },
    { id: 'myDonations', name: 'Minhas Doações', icon: 'cube-outline', screen: 'MyDonations' },
    { id: 'realizarDoacao', name: 'Realizar Doação', icon: 'gift', screen: 'DonateFood' }, // Alterado
    { id: 'myRequests', name: 'Minhas Solicitações', icon: 'list-outline', screen: 'MyRequests' },
  ];
  
  // Renderiza um item do menu
  const renderMenuItem = (item: typeof menuItems[0], index: number) => {
    const animatedStyles = {
      opacity: menuItemsAnimation[index],
      transform: [
        { 
          translateX: menuItemsAnimation[index].interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0]
          })
        }
      ]
    };
    
    return (
      <Animated.View key={item.id} style={[styles.menuItemContainer, animatedStyles]}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            animateCloseButton();
            setTimeout(() => {
              onNavigate(item.screen);
            }, 400);
          }}
          activeOpacity={0.7}
        >
          <Ionicons name={item.icon as any} size={24} color="#fff" style={styles.menuItemIcon} />
          <Text style={styles.menuItemText}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  
  // Botão de sair (sempre renderizado por último e fixo na parte inferior)
  const renderLogoutButton = () => {
    const animatedStyles = {
      opacity: menuItemsAnimation[6],
      transform: [
        { 
          translateX: menuItemsAnimation[6].interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0]
          })
        }
      ]
    };
    
    // Interpolação para rotação do botão fechar
    const spin = closeButtonRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });
    
    return (
      <Animated.View style={[styles.logoutContainer, animatedStyles]}>
        <View style={styles.bottomButtonsRow}>
          {/* Botão Sair */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              animateCloseButton();
              setTimeout(() => {
                onLogout();
              }, 400);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="exit-outline" size={24} color="#ff4a4a" style={styles.menuItemIcon} />
            <Text style={[styles.menuItemText, { color: '#ff4a4a' }]}>Sair</Text>
          </TouchableOpacity>
          
          {/* Botão Fechar */}
          <Animated.View 
            style={[
              styles.closeButton, 
              { 
                transform: [
                  { scale: closeButtonScale },
                  { rotate: spin }
                ] 
              }
            ]}
          >
            <TouchableOpacity
              onPress={handleClose}
              activeOpacity={0.6}
              style={styles.closeButtonTouchable}
            >
              <Ionicons name="arrow-back-circle" size={26} color="#fff" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Fechar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };
  
  return (
    isVisible ? (
      <View style={styles.container}>
        {/* Overlay que escurece o resto da tela quando o menu está aberto */}
        <Animated.View 
          style={[styles.overlay, { opacity: overlayOpacity }]}
          onTouchEnd={handleClose}
        />
        
        {/* Menu drawer */}
        <Animated.View 
          style={[
            styles.menu, 
            { transform: [{ translateX: menuPosition }] }
          ]}
        >
          {/* Fundo do menu com gradiente */}
          <LinearGradient
            colors={['#070F1B', '#0D1723', '#182B3A']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {Platform.OS === 'ios' && (
              <BlurView intensity={15} style={StyleSheet.absoluteFill} tint="dark" />
            )}
            
            {/* Overlay escuro adicional para dar consistência */}
            <View style={styles.darkOverlay} />
            
            {/* Cabeçalho do menu com logo e nome do app */}
            <View style={styles.header}>
              <Image 
                source={logoSource} 
                style={styles.logo} 
                resizeMode="contain"
              />
              
              {/* Nome do aplicativo com cores */}
              <Text style={styles.appName}>
                <Text style={styles.appNameFood}>Food</Text>
                <Text style={styles.appNameBridge}>Bridge</Text>
              </Text>
            </View>
            
            {/* Separador */}
            <View style={styles.separator} />
            
            {/* Lista de opções do menu */}
            <View style={styles.menuItems}>
              {menuItems.slice(0, 3).map(renderMenuItem)}
              
              {/* Separador para categorias */}
              <View style={styles.categorySeparator} />
              
              {menuItems.slice(3).map((item, index) => renderMenuItem(item, index + 3))}
            </View>
            
            {/* Botões de sair e fechar (fixos na parte inferior) */}
            {renderLogoutButton()}
          </LinearGradient>
        </Animated.View>
      </View>
    ) : null
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    maxWidth: 320,
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 80,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  appNameFood: {
    color: '#FF8A00', // Cor laranja para "Food"
  },
  appNameBridge: {
    color: '#12B05B', // Cor verde para "Bridge"
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  categorySeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  menuItems: {
    flex: 1,
    paddingTop: 15,
  },
  menuItemContainer: {
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#fff',
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 20,
    marginBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SideMenu; 