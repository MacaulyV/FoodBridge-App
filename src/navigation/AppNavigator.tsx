import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, View } from 'react-native';
import ChooseProfileScreen from '../screens/ChooseProfile/ChooseProfileScreen';
import WelcomeScreen from '../screens/Welcome';
import HowItWorksScreen from '../screens/HowItWorks';
import TeamScreen from '../screens/Team';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import DonateFoodScreen from '../screens/DonateFood';
import ProfileScreen from '../screens/Profile';
import MyDonationsScreen from '../screens/MyDonations';
import DonationsFeedScreen from '../screens/DonationsFeed';
import MyRequestsScreen from '../screens/MyRequests';
import { getUserData, hasCompletedOnboarding, markOnboardingComplete } from '../services/userService';

// Placeholders para as telas que ainda não foram implementadas
import { View as PlaceholderView, Text as PlaceholderText } from 'react-native';

const DonationsScreen = () => (
  <PlaceholderView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
    <PlaceholderText style={{ color: '#fff', fontSize: 20 }}>Tela de Doações em construção</PlaceholderText>
  </PlaceholderView>
);

const AboutScreen = () => (
  <PlaceholderView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
    <PlaceholderText style={{ color: '#fff', fontSize: 20 }}>Tela Sobre o Projeto em construção</PlaceholderText>
  </PlaceholderView>
);

// Importando o tipo RootStackParamList
import { RootStackParamList } from '../@types/navigation';

// Criando o Stack Navigator com o tipo correto
const Stack = createStackNavigator<RootStackParamList>();

// Ícone do logo para a barra de navegação
const LogoIcon = () => {
  return (
    <Image
      source={require('../../assets/icons/Logo-Vazio.png')}
      style={{ width: 200, height: 45, marginRight: 5 }}
      resizeMode="contain"
    />
  );
};

// Título personalizado com as cores do FoodBridge
const LogoTitle = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
        <Text style={{ color: '#FF7F50' }}>Food</Text>
        <Text style={{ color: '#4CAF50' }}>Bridge</Text>
      </Text>
    </View>
  );
};  

const AppNavigator = () => {
  // Estado para armazenar a tela inicial
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList>("Welcome");
  // Estado para controlar se o app está carregando
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Função para verificar o perfil do usuário e definir a tela inicial
    const checkUserProfile = async () => {
      try {
        console.log('🔄 [APP] Verificando perfil do usuário...');
        
        // Verificar se é a primeira vez que o usuário abre o app (verificação de onboarding)
        const onboardingCompleted = await hasCompletedOnboarding();
        
        // Obter dados do usuário do AsyncStorage
        const userData = await getUserData();
        
        if (userData && userData.tipo) {
          console.log(`✅ [APP] Usuário encontrado: ${userData.nome} (${userData.tipo})`);
          
          // Redirecionar com base no tipo de perfil
          switch (userData.tipo) {
            case 'ONG':
              console.log('🔀 [APP] Redirecionando para DonationsFeed (ONG)');
              setInitialRouteName('DonationsFeed');
              break;
            case 'Pessoa Física':
            case 'Pessoa Jurídica':
              console.log('🔀 [APP] Redirecionando para MyDonations (Pessoa Física/Jurídica)');
              setInitialRouteName('MyDonations');
              break;
            default:
              console.log('⚠️ [APP] Tipo não reconhecido, verificando status de onboarding');
              // Se o usuário já viu as telas de introdução, ir para o Login
              if (onboardingCompleted) {
                setInitialRouteName('Login');
              } else {
                setInitialRouteName('Welcome');
              }
          }
        } else {
          console.log('ℹ️ [APP] Nenhum perfil encontrado, verificando status de onboarding');
          // Se o usuário já viu as telas de introdução, ir para o Login
          if (onboardingCompleted) {
            console.log('✅ [APP] Onboarding já completo, redirecionando para Login');
            setInitialRouteName('Login');
          } else {
            console.log('ℹ️ [APP] Primeira inicialização, mostrando telas de boas-vindas');
            setInitialRouteName('Welcome');
          }
        }
      } catch (error) {
        console.error('❌ [APP] Erro ao verificar perfil:', error);
        setInitialRouteName('Welcome');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Executar verificação quando o componente for montado
    checkUserProfile();
  }, []);
  
  // Exibir tela vazia enquanto carrega
  if (isLoading) {
    return null;
  }
  
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF', 
          elevation: 0, // Remove sombra no Android
          shadowOpacity: 0, // Remove sombra no iOS
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerTitleContainerStyle: {
          paddingLeft: 0,
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false, // Oculta a barra de navegação na tela de boas-vindas
        }}
      />
      <Stack.Screen
        name="HowItWorks"
        component={HowItWorksScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="ChooseProfile"
        component={ChooseProfileScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="Team"
        component={TeamScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="DonateFood"
        component={DonateFoodScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="Donations"
        component={DonationsScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="DonationsFeed"
        component={DonationsFeedScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="MyDonations"
        component={MyDonationsScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name="MyRequests"
        component={MyRequestsScreen}
        options={{
          headerShown: false, 
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
