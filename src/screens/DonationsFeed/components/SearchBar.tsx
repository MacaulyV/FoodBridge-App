import React from 'react';
import { Animated, TextInput, StyleSheet } from 'react-native';
import { SearchBarProps } from '../types';

/**
 * Componente que renderiza a barra de busca
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Buscar doações...',
  barOpacity
}) => {
  return (
    <Animated.View style={[styles.container, { opacity: barOpacity }]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        selectionColor="rgb(46, 182, 125)"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(30, 40, 60, 0.5)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default SearchBar; 