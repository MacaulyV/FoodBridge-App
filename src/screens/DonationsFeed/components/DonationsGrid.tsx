import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Animated,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PublicDonation } from '../types';
import DonationCard from './DonationCard';

interface DonationsGridProps {
  donations: PublicDonation[];
  isLoading: boolean;
  onViewDetails: (donation: PublicDonation) => void;
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
          <Text style={styles.emptyText}>Carregando doações disponíveis...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FFFFFF" />
        <Text style={styles.emptyText}>Nenhuma doação disponível no momento</Text>
        <Text style={styles.emptySubtext}>
          As doações aparecerão aqui assim que estiverem disponíveis.
        </Text>
      </View>
    );
  };
  
  // Renderizar um item da lista (card de doação)
  const renderItem = ({ item }: { item: PublicDonation }) => (
    <DonationCard
      donation={item}
      onViewDetails={onViewDetails}
      cardOpacity={cardOpacity}
      cardScale={cardScale}
    />
  );
  
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
        renderItem={renderItem}
        keyExtractor={(item) => item.ID}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={donations.length === 0 ? { flex: 1 } : styles.listContent}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
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
  listContent: {
    paddingBottom: 20,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
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