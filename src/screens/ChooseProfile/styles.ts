import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: isSmallScreen ? 120 : 140, // Aumentado o espaço para mover o conteúdo para baixo
    overflow: 'hidden', // Para garantir que a animação da imagem não extrapole o container
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40, // Reduzido para aproximar as opções do título
    marginTop: 40, // Aumentado para mover o título mais para baixo
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start', // Alterado para flex-start para mover para cima
    paddingTop: 0, // Removido padding para aproximar do título
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, // Reduzido para aproximar do título
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Aumentado para dar mais espaço para a animação
    marginTop: 'auto', // Mantém o footer no final
    height: 220, // Altura fixa para acomodar a animação da imagem vindo de baixo
    justifyContent: 'flex-end', // Garante que a imagem fique alinhada na parte inferior
    paddingBottom: 10, // Espaço adicional na parte inferior
  },
});

export default styles; 