import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StatusBar, 
  Animated, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { NavigationProps, UserProfile } from './types';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';

// Componentes
import GradientBackground from './components/GradientBackground';
import ParticleSystem from './components/ParticleSystem';
import ProfileInfo from './components/ProfileInfo';
import ProfileActions from './components/ProfileActions';
import EditProfileModal from './components/EditProfileModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Avatar from './components/Avatar';
import NavBar from './components/NavBar';
import AvatarPicker from './components/AvatarPicker';

// Componente de Footer Global
import GlobalFooter from '../../components/Footer/Footer';

// Serviços
import { ProfileImageService } from '../../services/ProfileImageService';
import { getUserData, getUserComplete } from '../../services/userService';

// Hooks
import { useAnimationValues } from './hooks/useAnimationValues';
import { useParticleAnimation } from './hooks/useParticleAnimation';
import { useContentAnimation } from './hooks/useContentAnimation';
import { useNavigation } from './hooks/useNavigation';

// Estilos
import styles from './styles';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

/**
 * Tela de perfil do usuário com design imersivo e animações refinadas
 */
const ProfileScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // Dados do perfil do usuário (inicialmente vazios, serão carregados do storage)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    city: '',
    neighborhood: '',
    profileType: 'pessoa_fisica',
    avatar: '',
  });
  
  // Estatísticas do usuário
  const [totalDoacoes, setTotalDoacoes] = useState<number>(0);
  const [totalBeneficiados, setTotalBeneficiados] = useState<number>(45); // Mantendo fixo por enquanto
  
  // Indica se os dados estão sendo carregados
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para controle dos modais
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAvatarPickerVisible, setIsAvatarPickerVisible] = useState(false);
  
  // Referências para animação do scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Inicializar todos os valores de animação
  const animValues = useAnimationValues();
  
  // Hooks para gerenciar partículas
  const { 
    backgroundParticles, 
    middleParticles, 
    foregroundParticles, 
    animateParticle, 
    animateParallaxLayers,
    backgroundParallax,
    middleLayerParallax,
    foregroundParallax 
  } = useParticleAnimation();
  
  // Hooks para gerenciar animações de conteúdo
  const { 
    animateScreenEntry,
    animateBackground,
    animateTitle,
    animateProfileContainer,
    animateAvatar,
    animateActions,
    animateFooter,
    animateNavBar,
    animateButtonPress
  } = useContentAnimation(animValues);
  
  // Hook para gerenciar navegação
  const { 
    handleBack,
    handleEditProfile,
    handleDeleteAccount,
    handleConfirmDelete
  } = useNavigation(animValues, navigation);
  
  // Animações baseadas no scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 150],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });
  
  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp'
  });
  
  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.85],
    extrapolate: 'clamp'
  });
  
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -5],
    extrapolate: 'clamp'
  });
  
  const logoOpacity = scrollY.interpolate({
    inputRange: [0, 60, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  });
  
  // Referência para o botão voltar
  const backButtonScale = useRef(new Animated.Value(1)).current;

  // Carregar a imagem de perfil salva
  const loadProfileImage = async () => {
    try {
      console.log('📷 [PROFILE] Carregando imagem de perfil salva localmente...');
      const savedImageUri = await ProfileImageService.getProfileImage();
      
      if (savedImageUri) {
        console.log('✅ [PROFILE] Imagem de perfil encontrada:', savedImageUri);
        setUserProfile(prevProfile => ({
          ...prevProfile,
          avatar: savedImageUri
        }));
      } else {
        console.log('ℹ️ [PROFILE] Nenhuma imagem de perfil salva localmente');
        // Não alteramos o avatar aqui para preservar o que veio da API
      }
    } catch (error) {
      console.error('❌ [PROFILE] Erro ao carregar imagem de perfil:', error);
    }
  };

  // Carregar os dados do usuário do storage
  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Primeiro buscar os dados básicos do usuário
      const userData = await getUserData();
      
      if (userData) {
        // Converter do formato da API para o formato usado pela tela
        setUserProfile({
          name: userData.nome,
          email: userData.email,
          city: userData.cidade,
          neighborhood: userData.bairro_ou_distrito,
          profileType: mapProfileType(userData.tipo),
          avatar: userData.avatar || '',
        });
        console.log('✅ [PROFILE] Dados do usuário carregados com sucesso');
        
        // Após carregar dados básicos, carregar avatar salvo localmente
        // que tem prioridade sobre o que veio da API
        await loadProfileImage();
        
        // Então buscar dados completos incluindo doações
        const userComplete = await getUserComplete();
        
        // Atualizar contagem de doações se disponível
        if (userComplete && userComplete.doacoes) {
          setTotalDoacoes(userComplete.doacoes.length);
          console.log(`✅ [PROFILE] Total de doações do usuário: ${userComplete.doacoes.length}`);
        } else {
          console.log('⚠️ [PROFILE] Dados de doações não disponíveis, mantendo contagem zerada');
          setTotalDoacoes(0);
        }
      } else {
        console.log('⚠️ [PROFILE] Sem dados de usuário, usando valores padrão');
        // Se não tiver dados, deixar valores padrão para exibição
        setUserProfile({
          name: 'Usuário FoodBridge',
          email: 'usuario@exemplo.com',
          city: 'Sua cidade',
          neighborhood: 'Seu bairro',
          profileType: 'pessoa_fisica',
          avatar: '',
        });
        
        // Mesmo sem dados do usuário, tentar carregar o avatar salvo
        await loadProfileImage();
      }
    } catch (error) {
      console.error('❌ [PROFILE] Erro ao carregar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar seus dados. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mapear o tipo de perfil da API para o formato usado pelo app
  const mapProfileType = (tipo: string): 'pessoa_fisica' | 'pessoa_juridica' | 'ong' => {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower.includes('juridica') || tipoLower.includes('jurídica') || tipoLower.includes('empresa')) {
      return 'pessoa_juridica';
    } else if (tipoLower.includes('ong') || tipoLower.includes('organização')) {
      return 'ong';
    }
    return 'pessoa_fisica'; // Valor padrão
  };

  // Função para lidar com o fechamento do modal de edição
  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    // Recarregar dados do usuário após fechar o modal de edição
    loadUserData();
  };
  
  // Função para atualizar o perfil do usuário após edição bem-sucedida
  const handleProfileUpdated = (updatedProfile: UserProfile) => {
    // Atualizar o estado diretamente com os novos dados
    setUserProfile(updatedProfile);
    // Não é necessário chamar loadUserData aqui, pois os dados já estão atualizados
    console.log('✅ [PROFILE] Dados do usuário atualizados na tela:', updatedProfile);
  };
  
  // Atualizar dados quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      console.log('🔄 [PROFILE] Tela de perfil recebeu foco, atualizando dados...');
      // Agora loadUserData já chama loadProfileImage internamente na ordem correta
      loadUserData();
      
      return () => {
        // Cleanup opcional ao perder foco
      };
    }, [])
  );
  
  // Carregar dados inicialmente e configurar animações
  useEffect(() => {
    // Inicializar e animar a tela em ordem
    const initAnimations = async () => {
      try {
        // Aguardar um pequeno momento para garantir que os valores foram inicializados
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Continuar com o restante das animações
        animateScreenEntry();
        animateBackground();
        
        // Animar efeito parallax
        animateParallaxLayers(
          backgroundParallax,
          middleLayerParallax,
          foregroundParallax
        );
        
        // Animar conteúdo
        animateTitle();
        animateProfileContainer();
        animateAvatar();
        animateActions();
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
    // Agora loadUserData já chama loadProfileImage internamente na ordem correta
    loadUserData();
  }, []);
  
  // Função para abrir o seletor de avatar
  const handleAvatarPress = () => {
    console.log("Avatar pressionado, abrindo seletor de imagem");
    setIsAvatarPickerVisible(true);
  };
  
  // Função para processar a imagem selecionada
  const handleImageSelected = async (imageUri: string) => {
    try {
      console.log("📷 [PROFILE] Nova imagem selecionada:", imageUri);
      
      // Salvar a imagem permanentemente
      const success = await ProfileImageService.saveProfileImage(imageUri);
      
      if (success) {
        console.log("✅ [PROFILE] Nova imagem salva com sucesso");
        
        // Obter a URI da imagem salva (pode ser diferente da original)
        const savedImageUri = await ProfileImageService.getProfileImage();
        
        // Atualizar o perfil com a nova imagem salva
        if (savedImageUri) {
          setUserProfile(prevProfile => ({
            ...prevProfile,
            avatar: savedImageUri
          }));
          console.log("✅ [PROFILE] Avatar atualizado no perfil");
        }
      } else {
        console.error("❌ [PROFILE] Falha ao salvar imagem");
        Alert.alert("Erro", "Não foi possível salvar a imagem de perfil");
      }
      
      // Fechar o modal de seleção
      setIsAvatarPickerVisible(false);
    } catch (error) {
      console.error('❌ [PROFILE] Erro ao atualizar avatar:', error);
      Alert.alert("Erro", "Não foi possível atualizar a imagem de perfil");
    }
  };
  
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
          backgroundParallax={backgroundParallax}
          middleLayerParallax={middleLayerParallax}
          foregroundParallax={foregroundParallax}
        />
        
        {/* NavBar estilo Team */}
        <NavBar />
        
        {/* Conteúdo principal com scroll */}
        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Cabeçalho com avatar e nome */}
          <View style={styles.profileHeader}>
            <Animated.View
              style={[
                styles.avatarContainer,
                {
                  opacity: animValues.avatarOpacity,
                  transform: [{ scale: animValues.avatarScale }]
                }
              ]}
            >
              {/* Wrapper TouchableOpacity para garantir que o avatar seja clicável */}
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={handleAvatarPress}
                style={styles.avatarTouchable}
              >
                <Avatar 
                  source={userProfile.avatar} 
                  size={120} 
                  opacity={animValues.avatarOpacity}
                  scale={animValues.avatarScale}
                  onPress={handleAvatarPress}
                  editable={true}
                />
              </TouchableOpacity>
              
              <LinearGradient
                colors={['rgba(100, 100, 100, 0.3)', 'rgba(50, 50, 50, 0.1)']}
                style={styles.avatarGlow}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
            
            <Animated.View
              style={[
                styles.nameContainer,
                {
                  opacity: animValues.containerOpacity,
                  transform: [{ translateY: animValues.containerTranslateY }]
                }
              ]}
            >
              <Text style={styles.nameText}>{userProfile.name}</Text>
              <View style={styles.profileTypeBadge}>
                <MaterialCommunityIcons 
                  name={userProfile.profileType === 'pessoa_fisica' ? 'account' : 
                      userProfile.profileType === 'pessoa_juridica' ? 'domain' : 'home-heart'} 
                  size={16} 
                  color="#FFFFFF" 
                  style={styles.profileTypeIcon}
                />
                <Text style={styles.profileTypeText}>
                  {userProfile.profileType === 'pessoa_fisica' ? 'Pessoa Física' : 
                   userProfile.profileType === 'pessoa_juridica' ? 'Pessoa Jurídica' : 'ONG'}
                </Text>
              </View>
            </Animated.View>
          </View>
          
          {/* Cartão de informações de contato */}
          <Animated.View
            style={[
              styles.infoCard,
              {
                opacity: animValues.containerOpacity,
                transform: [{ translateY: animValues.containerTranslateY }]
              }
            ]}
          >
            <LinearGradient
              colors={['#070F1B', '#0D1723', '#182B3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Informações de Contato</Text>
                <View style={styles.cardDivider} />
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="mail-outline" size={20} color="#12B05B" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userProfile.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="location-outline" size={20} color="#12B05B" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Localização</Text>
                  <Text style={styles.infoValue}>{userProfile.city}, {userProfile.neighborhood}</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
          
          {/* Cartão de estatísticas */}
          <Animated.View
            style={[
              styles.statsCard,
              {
                opacity: animValues.actionsOpacity,
                transform: [{ translateY: animValues.actionsTranslateY }]
              }
            ]}
          >
            <LinearGradient
              colors={['#070F1B', '#0D1723', '#182B3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Suas Estatísticas</Text>
                <View style={styles.cardDivider} />
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <FontAwesome5 name="hand-holding-heart" size={18} color="#12B05B" />
                  </View>
                  <Text style={styles.statValue}>{totalDoacoes}</Text>
                  <Text style={styles.statLabel}>Doações</Text>
                </View>
                
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <FontAwesome5 name="user-friends" size={16} color="#12B05B" />
                  </View>
                  <Text style={styles.statValue}>{totalBeneficiados}</Text>
                  <Text style={styles.statLabel}>Beneficiados</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
          
          {/* Botões de ações do perfil */}
          <Animated.View
            style={[
              styles.actionsContainer,
              {
                opacity: animValues.actionsOpacity,
                transform: [{ translateY: animValues.actionsTranslateY }]
              }
            ]}
          >
            <ProfileActions
              actionsOpacity={animValues.actionsOpacity}
              actionsTranslateY={animValues.actionsTranslateY}
              onEdit={() => handleEditProfile(setIsEditModalVisible)}
              onDelete={() => handleDeleteAccount(setIsDeleteModalVisible)}
            />
          </Animated.View>
          
          {/* Rodapé com informações da versão e botão de reset */}
          <Animated.View
            style={[
              styles.footer,
              {
                opacity: animValues.footerOpacity,
                transform: [{ translateY: animValues.footerTranslateY }]
              }
            ]}
          >
            <Text style={styles.footerText}>FoodBridge © 2025</Text>
            <Text style={styles.versionText}>Versão 1.0</Text>
          </Animated.View>
        </Animated.ScrollView>
        
        {/* Barra de navegação inferior global */}
        <GlobalFooter
          activeScreen="profile"
          navigation={navigation}
          opacity={animValues.navBarOpacity}
        />
        
        {/* Modal de edição de perfil */}
        <EditProfileModal
          isVisible={isEditModalVisible}
          onClose={handleEditModalClose}
          userProfile={userProfile}
          onProfileUpdated={handleProfileUpdated}
        />
        
        {/* Modal de confirmação de exclusão */}
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirmDelete={handleConfirmDelete}
        />
        
        {/* Modal de seleção de avatar */}
        <AvatarPicker
          visible={isAvatarPickerVisible}
          onClose={() => setIsAvatarPickerVisible(false)}
          onImageSelected={handleImageSelected}
        />
      </Animated.View>
    </View>
  );
};

export default ProfileScreen; 