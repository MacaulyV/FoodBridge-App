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
  createButtonContainer: {
    position: 'absolute',
    bottom: 80, // Ajustado para ficar acima do footer
    right: 20,
    zIndex: 100,
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(46, 182, 125)', // Verde mais vibrante, igual do Profile
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 10,
  },
  createButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgb(46, 182, 125)', // Verde mais vibrante, igual do Profile
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
  
  // Estilos para o footer personalizado
  customFooter: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  appLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default styles; 