import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import RequestCard from './RequestCard';
import { DonationRequest } from '../types';

interface RequestsGridProps {
  requests: DonationRequest[];
  isLoading: boolean;
  onViewDetails: (request: DonationRequest) => void;
  gridOpacity: Animated.Value;
  gridTranslateY: Animated.Value;
  cardOpacity: Animated.Value;
  cardScale: Animated.Value;
}

/**
 * Componente de grade que exibe a lista de solicitações
 */
const RequestsGrid: React.FC<RequestsGridProps> = ({
  requests,
  isLoading,
  onViewDetails,
  gridOpacity,
  gridTranslateY,
  cardOpacity,
  cardScale
}) => {
  // Renderizar conteúdo com base no estado de carregamento e disponibilidade de solicitações
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#12B05B" />
          <Text style={styles.loadingText}>Carregando suas solicitações...</Text>
        </View>
      );
    }
    
    if (!requests || requests.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={60} color="rgba(255, 255, 255, 0.3)" style={styles.emptyIcon} />
          <Text style={styles.emptyText}>
            Você ainda não solicitou nenhuma doação. Quando fizer, elas aparecerão aqui.
          </Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={requests}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <RequestCard
            request={item}
            onViewDetails={onViewDetails}
            cardOpacity={cardOpacity}
            cardScale={cardScale}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
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
      {renderContent()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyIcon: {
    marginBottom: 20,
  },
});

export default RequestsGrid; 