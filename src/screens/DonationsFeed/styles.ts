import { StyleSheet, Dimensions } from 'react-native';

// Dimensões da tela
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  animatedContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 120, // Para compensar o NavBar
    paddingBottom: 70, // Para compensar o Footer
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainContent: {
    width: '100%',
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  // Estilos para o footer igual ao da tela Profile
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  debugButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(80, 50, 50, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  resetButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginLeft: 5,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    marginBottom: 5,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
  },
  
  // Estilos para a busca
  searchInput: {
    width: '100%',
    backgroundColor: 'rgba(30, 40, 60, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 15,
  },
});

export default styles; 