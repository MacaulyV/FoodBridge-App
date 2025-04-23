import { registerRootComponent } from 'expo';  // Importa a função para registrar o componente raiz do aplicativo
import { LogBox } from 'react-native';  // Importa LogBox para gerenciar logs

// Desabilita todos os logs de erro na interface do usuário
// Erros ainda serão exibidos no console do desenvolvedor
LogBox.ignoreAllLogs();

import App from './App';  // Importa o componente App, que é o principal do seu aplicativo

registerRootComponent(App);  // Registra o componente App como o componente raiz