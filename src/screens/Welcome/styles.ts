import { StyleSheet, Platform } from 'react-native';

/**
 * Estilos para a tela Welcome
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 65 : 55,
    paddingBottom: 30,
  },
});

export default styles; 