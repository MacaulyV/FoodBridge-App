import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 700;

/**
 * Estilos para a tela Team
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 110 : 100,
    paddingBottom: 80, // Espaço extra para o navbar no fundo
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scrollViewContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  teamMembersContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(25, 25, 25, 0.9)',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  navButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavButton: {
    opacity: 1,
  },
  inactiveNavButton: {
    opacity: 0.6,
  },
});

export default styles; 