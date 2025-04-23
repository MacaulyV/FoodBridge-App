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
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: isSmallScreen ? 120 : 140,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  mainContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 30,
  },
  formGradient: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 8,
    fontWeight: '500',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
    textShadowColor: 'rgba(255, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
  selectContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  selectText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pickerModal: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    overflow: 'hidden',
  },
  pickerItem: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  registerButton: {
    backgroundColor: '#32CD32', // Verde mais vibrante
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles; 