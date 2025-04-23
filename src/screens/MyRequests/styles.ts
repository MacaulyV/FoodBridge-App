import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
    lineHeight: 24,
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.7,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
  },
  statusTagContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  waitingTag: {
    backgroundColor: 'rgba(255, 193, 7, 0.8)',
  },
  waitingText: {
    color: '#000',
  },
  acceptedTag: {
    backgroundColor: 'rgba(40, 167, 69, 0.8)',
  },
  acceptedText: {
    color: '#fff',
  },
  rejectedTag: {
    backgroundColor: 'rgba(220, 53, 69, 0.8)',
  },
  rejectedText: {
    color: '#fff',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 5,
  },
}); 