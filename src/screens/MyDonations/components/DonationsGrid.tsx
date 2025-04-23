import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  Animated,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DonationCard from './DonationCard';
import { Donation } from '../types';

// Dimensões da tela
const { width } = Dimensions.get('window');

interface DonationsGridProps {
  donations: Donation[];
  isLoading: boolean;
  onViewDetails: (donation: Donation) => void;
  gridOpacity: Animated.Value;
  gridTranslateY: Animated.Value;
  cardOpacity: Animated.Value;
  cardScale: Animated.Value;
}

/**
 * Componente que renderiza a grade de doações em duas colunas
 */
const DonationsGrid: React.FC<DonationsGridProps> = ({
  donations,
  isLoading,
  onViewDetails,
  gridOpacity,
  gridTranslateY,
  cardOpacity,
  cardScale
}) => {
  // Renderizar mensagem quando não houver doações
  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#4783C0" />
          <Text style={styles.emptyText}>Carregando suas doações...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FFFFFF" />
        <Text style={styles.emptyText}>
          Você ainda não cadastrou nenhuma doação.
        </Text>
        <Text style={styles.emptySubtext}>
          Comece a doar alimentos para ajudar quem precisa!
        </Text>
      </View>
    );
  };
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity: gridOpacity,
          transform: [{ translateY: gridTranslateY }] 
        }
      ]}
    >
      <FlatList
        data={donations}
        keyExtractor={(item) => item.ID}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={donations.length === 0 ? { flex: 1 } : styles.gridContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <DonationCard
            donation={item}
            onViewDetails={onViewDetails}
            cardOpacity={cardOpacity}
            cardScale={cardScale}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {}}
            tintColor="#4783C0"
            colors={['#4783C0']}
            progressBackgroundColor="rgba(0, 0, 0, 0.2)"
          />
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gridContent: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginTop: 16,
    paddingLeft: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default DonationsGrid; 