// Arquivo de declaração para resolver problemas de importação do TypeScript

declare module '@react-navigation/native';
declare module '@react-navigation/stack';
declare module 'react-native-gesture-handler';
declare module './src/navigation/AppNavigator';

// Tipo para a opção de perfil do usuário
export type UserType = 'donor' | 'receiver';

// Parâmetros para cada rota da aplicação
export type RootStackParamList = {
  Welcome: { 
    navigation?: any;
    isReturning?: boolean;
    fromDirection?: 'left' | 'right';
    skipAnimation?: boolean;
  };
  HowItWorks: { navigation?: any };
  ChooseProfile: undefined;
  Register: { userType: UserType };
  Login: undefined;
  Team: undefined;
  DonateFood: undefined;
  Profile: undefined;
  Donations: undefined;
  DonationsFeed: undefined;
  MyDonations: undefined;
  About: undefined;
  MyRequests: undefined;
}; 